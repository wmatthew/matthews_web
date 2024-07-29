---
layout: layouts/base.liquid
title: Constraints
eleventyNavigation:
  key: Constraints
  parent: Tools
tags:
  - tiling
  - investigation
permalink: tiling/constraints
---
# {{title}}

Constraints are sets of values that define a puzzle under investigation. They include a board, a set of pieces, and a list of true/false flags that define rules for the puzzle. Constraints are passed to a solver program that finds and records all solutions to a puzzle.

These are meant for tiling puzzles (use polycubes/polyominos to fill a footprint with no gaps or overlaps) and packing puzzles (pack a set of polycubes into a specified volume)

## Constraint Type
Types of constraints:
* Defaults: Fallback values for settings that are not specified.
* Custom: A concrete puzzle definition. Fixed values for settings, entered by hand.
* Template: An abstract puzzle definition. Values vary when generated (eg: same puzzle, different board sizes)
* Generated: A concrete puzzle definition. Fixed values for all settings, generated from template

## Board and Piece Supply

The board is a list of coordinates that define a 2D or 3D space that will be filled by pieces.

The piece supply is the set of pieces that fill the board.

## Constraint Flags

Constraint flags are true/false values defining rules for a puzzle. Here's a list of constraint flags and what they mean.

Each constraint has a default value. "⭐️" indicates constraint values that are overridden for some puzzles (so: they do not always take on the same value)

Gaps
* 🕳️ allowGaps: if true, pieces don't have to fully cover the board.

Overflow: Pieces extending beyond their board's footprint
* 🌊 allowGroundLevelOverflow: if true, pieces can extend beyond the footprint of their board, on the level closest to the board.
* 🌧️ allowSkyLevelOverflow: if true, pieces can extend beyond the footprint of their board, above the level closest to the board.
* ⭐️ 🚀 allowUpwardOverflow: if true, pieces can extend upward. This lets us reuse a simple 2D board for 3D puzzles of any height, as long as they don't need a ceiling.

Overhangs: where a piece (or part of a piece) is above a different piece or empty space.
* 🪑 allowUnsupportedOverhangs: if true, overhangs over empty space are allowed.
* ⭐️ 💺 allowSupportedOverhangs: if true, overhangs over other pieces are allowed.
* ⭐️ ✈️ allowSkyPieces: if true, pieces can be placed without any part touching the ground level.

Coloring: preventing similar pieces from being placed together.
* ⭐️ 🎨🧩 colorByPiece: if true, each piece is assigned its own color. If a piece is added to supply multiple times, each gets its own color.
* ⭐️ 🎨🎲 colorByOrientation: if true, each distinct piece orientation gives the piece its own color (up to 6 colors per piece. a cube would have 1 color). 

Coloring: how close is allowed?
(note that if all of these are true, coloring has no effect)
* ⭐️ 👉🏘️ allowColorVertexNeighbors: if true, same colors can meet at a vertex.
* 🔪🏘️ allowColorEdgeNeighbors": if true, same colors can meet at an edge.
* 😡🏘️ allowColorFaceNeighbors": if true, same colors can meet on a face.
* 🙈 allowHiddenNeighborsToBreakColorRules: if true, color rules are not applied to pieces where the relevant meeting is buried/hidden in the solved state.

Other Restrictions on how pieces meet:
* ⭐️ ⊞ allow4PieceEdgeIntersections: if true, four pieces are allowed to meet at an intersection. Used in flat 2D puzzles.

Turning Pieces
* ⭐️ ♻️ allowPieceRotation: if true, pieces can be rotated in place (ie, keeping the same face down)
* ⭐️ 🎲 allowPieceOrienting: if true, pieces can be flipped to a different face (like rolling dice).

Leftover Material
* ⭐️ 🗑️🧩 allowUnusedPieces: if true, the solution can omit pieces.
* 🗑️🎲 allowUnusedOrientations: if true, the solution can omit piece orientations. This allows for "2D" puzzles.

## Default Values

{% include constraints constraints:constraints-templates.Tiling_Default %}

## 2D Puzzles

{% include constraints constraints:constraints-templates.Tatami %}

{% include constraints constraints:constraints-templates.Tatami_3color %}

{% include constraints constraints:constraints-templates.P_Pentominos %}

{% include constraints constraints:constraints-templates.Locked_Triangles %}

## 3D Puzzles
{% include constraints constraints:constraints-templates.Clones_Tile_A_Square_Simple %}

{% include constraints constraints:constraints-templates.Clones_Tile_A_Square %}

{% include constraints constraints:constraints-templates.Overhang_City %}

{% include constraints constraints:constraints-templates.Angel_Cube %}

## Not currently supported

* Spike city: like block city but towers (any structure beyond ground level) can't touch eachother. This would require an additional flag. Maybe "allowGroundFloorToBreakColorRules"
