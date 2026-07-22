const boardSize = 19;
const margin = 20;
const svgSize = 800;
const gridSize = (svgSize - 2 * margin) / (boardSize - 1);

const svg = document.querySelector("#board");
const blackScoreElement = document.querySelector("#black-score");
const whiteScoreElement = document.querySelector("#white-score");
const turnStatus = document.querySelector("#turn-status");

let board = createEmptyBoard();
let currentPlayer = 1;
let history = [];
let blackScore = 0;
let whiteScore = 0;

function createEmptyBoard() {
  return Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(0));
}

function createSvgElement(name, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, String(value));
  }
  return element;
}

function drawGrid() {
  for (let index = 0; index < boardSize; index += 1) {
    const position = margin + index * gridSize;
    svg.append(
      createSvgElement("line", {
        x1: margin,
        y1: position,
        x2: svgSize - margin,
        y2: position,
        stroke: "#2e2418",
        "stroke-width": 1.5,
      }),
      createSvgElement("line", {
        x1: position,
        y1: margin,
        x2: position,
        y2: svgSize - margin,
        stroke: "#2e2418",
        "stroke-width": 1.5,
      }),
    );
  }
}

function renderBoard() {
  svg.replaceChildren();
  drawGrid();

  for (let column = 0; column < boardSize; column += 1) {
    for (let row = 0; row < boardSize; row += 1) {
      if (board[column][row] === 0) continue;

      const stone = createSvgElement("circle", {
        class: "stone",
        cx: margin + column * gridSize,
        cy: margin + row * gridSize,
        r: gridSize / 2 - 2,
        fill: board[column][row] === 1 ? "#111111" : "#f7f7f4",
        stroke: board[column][row] === 1 ? "#000000" : "#b4b4ad",
        "stroke-width": 1.5,
      });
      svg.append(stone);
    }
  }
}

function renderStatus() {
  blackScoreElement.textContent = `Black captures: ${blackScore}`;
  whiteScoreElement.textContent = `White captures: ${whiteScore}`;
  turnStatus.textContent = `${currentPlayer === 1 ? "Black" : "White"} to move`;
}

function getAdjacent(column, row) {
  const adjacent = [];
  if (column > 0) adjacent.push([column - 1, row]);
  if (column < boardSize - 1) adjacent.push([column + 1, row]);
  if (row > 0) adjacent.push([column, row - 1]);
  if (row < boardSize - 1) adjacent.push([column, row + 1]);
  return adjacent;
}

function findGroup(column, row, player) {
  const group = [];
  const queue = [[column, row]];
  const visited = new Set([`${column},${row}`]);

  while (queue.length > 0) {
    const [currentColumn, currentRow] = queue.shift();
    group.push([currentColumn, currentRow]);

    for (const [nextColumn, nextRow] of getAdjacent(
      currentColumn,
      currentRow,
    )) {
      const key = `${nextColumn},${nextRow}`;
      if (board[nextColumn][nextRow] === player && !visited.has(key)) {
        visited.add(key);
        queue.push([nextColumn, nextRow]);
      }
    }
  }

  return group;
}

function hasLiberties(group) {
  return group.some(([column, row]) =>
    getAdjacent(column, row).some(
      ([nextColumn, nextRow]) => board[nextColumn][nextRow] === 0,
    ),
  );
}

function removeGroup(group, capturingPlayer) {
  for (const [column, row] of group) {
    board[column][row] = 0;
  }

  if (capturingPlayer === 1) {
    blackScore += group.length;
  } else {
    whiteScore += group.length;
  }
}

function saveState() {
  history.push({
    board: board.map((column) => column.slice()),
    player: currentPlayer,
    blackScore,
    whiteScore,
  });
}

function restoreState(state) {
  board = state.board;
  currentPlayer = state.player;
  blackScore = state.blackScore;
  whiteScore = state.whiteScore;
}

function placeStone(column, row) {
  if (
    column < 0 ||
    column >= boardSize ||
    row < 0 ||
    row >= boardSize ||
    board[column][row] !== 0
  ) {
    return;
  }

  saveState();
  board[column][row] = currentPlayer;
  const opponent = 3 - currentPlayer;

  for (const [adjacentColumn, adjacentRow] of getAdjacent(column, row)) {
    if (board[adjacentColumn][adjacentRow] !== opponent) continue;
    const opposingGroup = findGroup(adjacentColumn, adjacentRow, opponent);
    if (!hasLiberties(opposingGroup)) {
      removeGroup(opposingGroup, currentPlayer);
    }
  }

  const placedGroup = findGroup(column, row, currentPlayer);
  if (!hasLiberties(placedGroup)) {
    restoreState(history.pop());
    turnStatus.textContent = "That move has no liberties";
    renderBoard();
    renderScores();
    return;
  }

  currentPlayer = opponent;
  renderBoard();
  renderStatus();
}

function renderScores() {
  blackScoreElement.textContent = `Black captures: ${blackScore}`;
  whiteScoreElement.textContent = `White captures: ${whiteScore}`;
}

svg.addEventListener("click", (event) => {
  const bounds = svg.getBoundingClientRect();
  const scaledX = ((event.clientX - bounds.left) / bounds.width) * svgSize;
  const scaledY = ((event.clientY - bounds.top) / bounds.height) * svgSize;
  const column = Math.round((scaledX - margin) / gridSize);
  const row = Math.round((scaledY - margin) / gridSize);
  placeStone(column, row);
});

document.querySelector("#restart").addEventListener("click", () => {
  board = createEmptyBoard();
  currentPlayer = 1;
  blackScore = 0;
  whiteScore = 0;
  history = [];
  renderBoard();
  renderStatus();
});

document.querySelector("#undo").addEventListener("click", () => {
  if (!history.length) return;
  restoreState(history.pop());
  renderBoard();
  renderStatus();
});

renderBoard();
renderStatus();
