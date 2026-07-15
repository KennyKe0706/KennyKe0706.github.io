---
title: "Chemistry Equation Balancer"
summary: "A dependency-free browser tool that parses neutral equations, builds an element-conservation matrix, solves one nullspace vector with exact rational row reduction, and scales it to whole-number coefficients."
order: 1
featured: true
kind: "tool"
technologies:
  - "JavaScript"
  - "HTML"
  - "CSS"
  - "BigInt"
concepts:
  - "Chemical-formula parsing"
  - "Element-conservation matrices"
  - "Gauss–Jordan elimination"
  - "Nullspace solving"
  - "Exact rational arithmetic"
repository: "https://github.com/KennyKe0706/Chemistry-Equation-Balancer"
cover: "/images/projects/chemistry-balancer.png"
coverAlt: "Chemistry Equation Balancer interface with an equation input, balance and clear controls, example buttons, and a note describing supported neutral equations"
year: 2025
---

## Overview

Chemistry Equation Balancer is a dependency-free browser tool for balancing neutral chemical equations by conservation of each element. It accepts a single reaction arrow, parses the formulae on both sides, and returns a set of whole-number coefficients.

The parser supports nested parentheses and hydrates written with either a middle dot (`·`) or a period (`.`).

## From formulae to a matrix

Each formula is scanned into an element-count map. A stack keeps track of nested parenthesized groups and applies the multiplier that follows each closing parenthesis. Hydrate segments are parsed separately, including a leading multiplier such as the `5` in `CuSO4·5H2O`, and their element counts are combined.

The tool collects every element present in the reaction and constructs a conservation matrix. Reactant counts are positive and product counts are negative, so a coefficient vector in the matrix's nullspace conserves every element across the arrow.

## Exact coefficient solving

The row-reduction code represents each fraction as a pair of `BigInt` values. Arithmetic normalizes these fractions with greatest common divisors, avoiding the rounding error that floating-point elimination could introduce.

After Gauss–Jordan row reduction, the implementation selects one free column and back-solves a nullspace vector. It clears the fractions with a least common multiple of their denominators, then divides the resulting integers by their common greatest divisor.

## Supported input

- Neutral equations with exactly one reaction arrow
- Multiple reactants and products separated by `+`
- Element symbols and numeric subscripts
- Nested parenthesized groups such as `K4Fe(CN)6`
- Hydrates such as `CuSO4·5H2O` or `CuSO4.5H2O`

## Scope and limitations

The tool balances atom counts by mass; it is not a general reaction or redox solver.

- It does not parse ions, charges, or electrons.
- It does not balance acidic or basic half-reactions and does not add `H+`, `OH-`, or `H2O` automatically.
- It does not accept state labels such as `(aq)`; they must be removed first.
- It accepts only one reaction arrow per input.
- Input is expected without pre-existing stoichiometric coefficients.
- The solver constructs one nullspace basis vector by setting the first free variable to one and any other free variables to zero. It does not search combinations of basis vectors for underdetermined equations with multiple degrees of freedom.
