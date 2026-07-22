---
title: "Go Game"
summary: "A local two-player 19×19 Go prototype with capture detection, suicide-move prevention, capture-count scoring, undo, and restart controls."
order: 2
featured: true
kind: "prototype"
technologies:
  - "JavaScript"
  - "HTML"
  - "CSS"
  - "SVG"
concepts:
  - "Board-state management"
  - "Breadth-first traversal"
  - "Group and liberty analysis"
  - "Rule validation"
  - "State snapshots"
repository: "https://github.com/KennyKe0706/GO-Game"
demo: "/demos/go-game/"
cover: "/images/projects/go-game.png"
coverAlt: "Go Game interface showing a wooden 19 by 19 board, black and white stones, capture counts, and Restart and Undo buttons"
year: 2025
---

## Overview

Go Game is a dependency-free browser prototype for two players sharing one device. It renders a 19×19 board and its stones with SVG, alternates between Black and White, and accepts moves on empty intersections.

The interface also provides undo and restart controls. The score display records the number of opposing stones captured by each player.

## Implemented behaviour

- Alternating local turns, with Black moving first
- Placement on empty intersections of a 19×19 board
- Detection and removal of surrounded groups
- Rejection of a move when the newly placed stone's group has no liberties after captures are resolved
- Capture-count score updates
- Undo using a snapshot of the board, active player, and both scores
- Restart that clears the board, history, turn, and scores

## Rule processing

The board is stored as a two-dimensional array whose cells represent empty, black, or white intersections. For each move, the program checks the four orthogonal neighbours of the new stone.

Connected same-colour stones are collected with a queue-based breadth-first traversal. The program then scans the group for an adjacent empty intersection. An opposing group with no liberties is removed; after those captures, the newly placed stone's own group is checked to prevent suicide.

Before applying a move, the program copies the board and records the current player and scores. Undo restores this most recent snapshot.

## Scope and limitations

This project is a prototype, not a complete implementation of the rules of Go.

- It does not implement ko or superko, so immediate or repeated board positions are not prohibited.
- It has no pass, resignation, or end-of-game flow.
- Its scores are capture counts only. It does not calculate territory or area, apply komi, or determine a final winner under a formal scoring ruleset.
- It supports local two-player play only; there is no computer opponent or network play.
- The board size is fixed at 19×19.
