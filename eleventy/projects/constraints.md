---
layout: layouts/base.liquid
title: Constraints
eleventyNavigation:
  key: Constraints
  parent: Tools
tags:
  - tiling
  - investigation
permalink: tiling/constraints/
---
# {{title}}

Constraints are sets of values that define a puzzle under investigation. They include a board, a set of pieces, and a list of true/false flags that define rules for the puzzle. Constraints are passed to a solver program that finds and records all solutions to a puzzle.

These are meant for tiling puzzles (use polycubes/polyominos to fill a footprint with no gaps or overlaps) and packing puzzles (pack a set of polycubes into a specified volume)

## Constraint Type
Types of constraints:
* Template: An abstract puzzle definition. Defines a category of puzzles (eg: same constraints and pieces, but over many different board sizes/shapes).
* Generated: An instance of a template- a concrete puzzle definition. Fixed values for all settings.

## Board and Piece Supply

The board is a finite list of coordinates that define a 2D or 3D space that will be filled by pieces.

The piece supply is the set of pieces that can be used to fill the board. Each piece has a set quantity (finite or infinite).

## Constraint Flags

Constraint flags are true/false values defining rules for a puzzle. Here's a list of constraint flags and what they mean.

Gaps
* {% include constraint-summary key:"allowGaps" %}

Overflow: Pieces extending beyond their board's footprint.
* {% include constraint-summary key:"allowGroundLevelOverflow" %}
* {% include constraint-summary key:"allowSkyLevelOverflow" %}
* {% include constraint-summary key:"allowUpwardOverflow" %}

Overhangs: where a piece (or part of a piece) is above a different piece or empty space.
* {% include constraint-summary key:"allowUnsupportedOverhangs" %}
* {% include constraint-summary key:"allowSupportedOverhangs" %}
* {% include constraint-summary key:"allowSkyPieces" %}

Coloring: preventing similar pieces from being placed together. At most one of these can be true. If none of these are true and there are color restrictions enabled, all pieces get the same color.
* {% include constraint-summary key:"colorByPiece" %}
* {% include constraint-summary key:"colorByOrientation" %}
* {% include constraint-summary key:"colorByDistinctOrientation" %}

Color-Based Restrictions: how close is allowed? If all of these are true, coloring has no effect.
* {% include constraint-summary key:"allowColorVertexNeighbors" %}
* {% include constraint-summary key:"allowColorEdgeNeighbors" %}
* {% include constraint-summary key:"allowColorFaceNeighbors" %}
* {% include constraint-summary key:"allowHiddenNeighborsToBreakColorRules" %}
* {% include constraint-summary key:"allowGroundFloorToBreakColorRules" %}

Other Restrictions on how pieces meet:
* {% include constraint-summary key:"allow4PieceEdgeIntersections" %}

Turning Pieces
* {% include constraint-summary key:"allowPieceRotation" %}
* {% include constraint-summary key:"allowPieceOrienting" %}
* {% include constraint-summary key:"allowPieceMirroring" %}

Leftovers
* {% include constraint-summary key:"allowUnusedOrientations" %}
* {% include constraint-summary key:"allowUnusedPieces" %}

