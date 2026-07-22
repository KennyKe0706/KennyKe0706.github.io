const ONE = 1n;

function greatestCommonDivisor(a, b) {
  let left = a < 0n ? -a : a;
  let right = b < 0n ? -b : b;

  while (right) {
    [left, right] = [right, left % right];
  }

  return left || 1n;
}

function leastCommonMultiple(a, b) {
  return (a / greatestCommonDivisor(a, b)) * b;
}

function normalizeFraction([numerator, denominator]) {
  if (denominator === 0n) throw new Error("Division by zero");
  if (numerator === 0n) return [0n, 1n];

  let normalizedNumerator = numerator;
  let normalizedDenominator = denominator;
  if (normalizedDenominator < 0n) {
    normalizedNumerator = -normalizedNumerator;
    normalizedDenominator = -normalizedDenominator;
  }

  const divisor = greatestCommonDivisor(
    normalizedNumerator,
    normalizedDenominator,
  );
  return [normalizedNumerator / divisor, normalizedDenominator / divisor];
}

const addFractions = (left, right) =>
  normalizeFraction([
    left[0] * right[1] + right[0] * left[1],
    left[1] * right[1],
  ]);
const subtractFractions = (left, right) =>
  normalizeFraction([
    left[0] * right[1] - right[0] * left[1],
    left[1] * right[1],
  ]);
const multiplyFractions = (left, right) =>
  normalizeFraction([left[0] * right[0], left[1] * right[1]]);
const divideFractions = (left, right) =>
  normalizeFraction([left[0] * right[1], left[1] * right[0]]);
const integerFraction = (value) => [BigInt(value), ONE];

function countElements(formula) {
  const hydrateParts = formula.split(/[·.]/g);
  const total = {};

  for (const hydratePart of hydrateParts) {
    const elementCounts = parseFormulaPart(hydratePart.trim());
    for (const element in elementCounts) {
      total[element] = (total[element] || 0) + elementCounts[element];
    }
  }

  return total;
}

function parseFormulaPart(formula) {
  let position = 0;
  let leadingMultiplier = 0;

  while (position < formula.length && /\d/.test(formula[position])) {
    leadingMultiplier =
      leadingMultiplier * 10 + (formula.charCodeAt(position) - 48);
    position += 1;
  }
  if (leadingMultiplier === 0) leadingMultiplier = 1;

  const stack = [{}];
  const addElement = (map, element, count) => {
    map[element] = (map[element] || 0) + count;
  };

  while (position < formula.length) {
    const character = formula[position];

    if (character === "(") {
      stack.push({});
      position += 1;
    } else if (character === ")") {
      if (stack.length === 1) throw new Error("Unmatched closing parenthesis");
      position += 1;
      let multiplier = 0;
      while (position < formula.length && /\d/.test(formula[position])) {
        multiplier = multiplier * 10 + (formula.charCodeAt(position) - 48);
        position += 1;
      }
      if (multiplier === 0) multiplier = 1;

      const group = stack.pop();
      const parent = stack[stack.length - 1];
      for (const element in group) {
        addElement(parent, element, group[element] * multiplier);
      }
    } else if (/[A-Z]/.test(character)) {
      let element = character;
      position += 1;
      if (position < formula.length && /[a-z]/.test(formula[position])) {
        element += formula[position];
        position += 1;
      }

      let count = 0;
      while (position < formula.length && /\d/.test(formula[position])) {
        count = count * 10 + (formula.charCodeAt(position) - 48);
        position += 1;
      }
      if (count === 0) count = 1;
      addElement(stack[stack.length - 1], element, count);
    } else if (/\s/.test(character)) {
      position += 1;
    } else {
      throw new Error(`Unsupported character: ${character}`);
    }
  }

  if (stack.length !== 1) throw new Error("Unmatched opening parenthesis");
  const base = stack.pop();
  const result = {};
  for (const element in base) {
    result[element] = base[element] * leadingMultiplier;
  }
  return result;
}

function splitEquation(equation) {
  const sides = equation.split(/->|=>|→/);
  if (sides.length !== 2) throw new Error("Use exactly one reaction arrow");

  const reactants = sides[0]
    .split("+")
    .map((formula) => formula.trim())
    .filter(Boolean);
  const products = sides[1]
    .split("+")
    .map((formula) => formula.trim())
    .filter(Boolean);

  if (!reactants.length || !products.length) {
    throw new Error("Enter at least one formula on each side");
  }

  return { reactants, products };
}

function createMatrix(reactants, products) {
  const formulas = [...reactants, ...products];
  const parsedFormulas = formulas.map(countElements);
  const elements = Array.from(
    new Set(parsedFormulas.flatMap((formula) => Object.keys(formula))),
  ).sort();

  const matrix = elements.map(() => formulas.map(() => integerFraction(0)));
  elements.forEach((element, row) => {
    parsedFormulas.forEach((formula, column) => {
      const count = formula[element] || 0;
      const sign = column < reactants.length ? 1 : -1;
      matrix[row][column] = integerFraction(sign * count);
    });
  });

  return { matrix, formulas, reactantCount: reactants.length };
}

function findNullspaceVector(matrix) {
  const rowCount = matrix.length;
  const columnCount = matrix[0].length;
  const reduced = matrix.map((row) => row.map((fraction) => fraction));
  const pivotColumns = Array(rowCount).fill(-1);
  let pivotRow = 0;

  for (
    let column = 0;
    column < columnCount && pivotRow < rowCount;
    column += 1
  ) {
    let candidateRow = pivotRow;
    while (candidateRow < rowCount && reduced[candidateRow][column][0] === 0n) {
      candidateRow += 1;
    }
    if (candidateRow === rowCount) continue;

    if (candidateRow !== pivotRow) {
      [reduced[candidateRow], reduced[pivotRow]] = [
        reduced[pivotRow],
        reduced[candidateRow],
      ];
    }

    const inverse = divideFractions(
      integerFraction(1),
      reduced[pivotRow][column],
    );
    for (let index = column; index < columnCount; index += 1) {
      reduced[pivotRow][index] = multiplyFractions(
        reduced[pivotRow][index],
        inverse,
      );
    }

    for (let row = 0; row < rowCount; row += 1) {
      if (row === pivotRow || reduced[row][column][0] === 0n) continue;
      const factor = reduced[row][column];
      for (let index = column; index < columnCount; index += 1) {
        reduced[row][index] = subtractFractions(
          reduced[row][index],
          multiplyFractions(factor, reduced[pivotRow][index]),
        );
      }
    }

    pivotColumns[pivotRow] = column;
    pivotRow += 1;
  }

  const usedColumns = new Set(pivotColumns.filter((column) => column >= 0));
  const freeColumns = [];
  for (let column = 0; column < columnCount; column += 1) {
    if (!usedColumns.has(column)) freeColumns.push(column);
  }
  if (!freeColumns.length) throw new Error("No non-trivial solution found");

  const vector = Array(columnCount)
    .fill(null)
    .map(() => integerFraction(0));
  vector[freeColumns[0]] = integerFraction(1);

  for (let row = 0; row < rowCount; row += 1) {
    const pivotColumn = pivotColumns[row];
    if (pivotColumn < 0) continue;

    let sum = integerFraction(0);
    for (const freeColumn of freeColumns) {
      if (reduced[row][freeColumn][0] !== 0n) {
        sum = addFractions(
          sum,
          multiplyFractions(reduced[row][freeColumn], vector[freeColumn]),
        );
      }
    }
    vector[pivotColumn] = multiplyFractions(integerFraction(-1), sum);
  }

  let denominatorMultiple = 1n;
  for (const fraction of vector) {
    denominatorMultiple = leastCommonMultiple(denominatorMultiple, fraction[1]);
  }

  const integers = vector.map(
    (fraction) => fraction[0] * (denominatorMultiple / fraction[1]),
  );
  const shouldFlip = integers.some((value) => value < 0n);
  const positiveIntegers = integers.map((value) =>
    shouldFlip ? -value : value,
  );
  const commonDivisor =
    positiveIntegers.reduce(greatestCommonDivisor, 0n) || 1n;
  return positiveIntegers.map((value) => value / commonDivisor);
}

function formatEquation(formulas, reactantCount, coefficients) {
  const formatSide = (items) =>
    items
      .map(([coefficient, formula]) =>
        coefficient === 1n ? formula : `${coefficient}${formula}`,
      )
      .join(" + ");

  const reactants = formulas
    .slice(0, reactantCount)
    .map((formula, index) => [coefficients[index], formula]);
  const products = formulas
    .slice(reactantCount)
    .map((formula, index) => [coefficients[index + reactantCount], formula]);
  return `${formatSide(reactants)} → ${formatSide(products)}`;
}

const equationInput = document.querySelector("#eq");
const output = document.querySelector("#out");

function balanceEquation() {
  output.textContent = "";
  output.className = "out";

  try {
    const rawEquation = equationInput.value.trim().replace(/\s+/g, " ");
    if (!rawEquation) throw new Error("Enter an equation");

    const { reactants, products } = splitEquation(rawEquation);
    const { matrix, formulas, reactantCount } = createMatrix(
      reactants,
      products,
    );
    const coefficients = findNullspaceVector(matrix);

    if (coefficients.some((coefficient) => coefficient <= 0n)) {
      throw new Error("This equation needs a more general solver");
    }

    output.textContent = formatEquation(formulas, reactantCount, coefficients);
    output.classList.add("ok");
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
    output.classList.add("err");
  }
}

document.querySelector("#bal").addEventListener("click", balanceEquation);
document.querySelector("#clr").addEventListener("click", () => {
  equationInput.value = "";
  output.textContent = "";
  output.className = "out";
  equationInput.focus();
});
document.querySelector("#ex1").addEventListener("click", () => {
  equationInput.value = "Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O";
});
document.querySelector("#ex2").addEventListener("click", () => {
  equationInput.value =
    "K4Fe(CN)6 + H2SO4 + H2O -> K2SO4 + FeSO4 + (NH4)2SO4 + CO";
});
document.querySelector("#ex3").addEventListener("click", () => {
  equationInput.value = "C12H22O11 + KClO3 -> KCl + CO2 + H2O";
});
equationInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") balanceEquation();
});
