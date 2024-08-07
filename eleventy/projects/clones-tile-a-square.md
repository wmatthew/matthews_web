---
layout: layouts/base.liquid
title: Clones Tile A Square
eleventyNavigation:
  key: Clones Tile A Square
  parent: Investigations
permalink: polycube/clones/tile/a/square/
tags:
  - investigation
---
# {{title}}

## Premise
Puzzle: you are given N identical polycubes and asked to tile a square board of size B.
* Each piece must touch the board.
* The board must be completely covered (no gaps, no spillover outside the boundaries)
* Pieces in the same orientation can't touch (at face, edge or corner)

For what pieces and values B, N is this a good puzzle?

## Configuration

{% include constraints constraints:constraints-templates.Clones_Tile_A_Square %}


...

{% include constraints constraints:constraints-library.Clones_Tile_A_Square_Simple_rect4x4_T %}

## Pieces

Here's the piece you start with. We'll examine 1-25 of these.

{% include piece3d, key:"PLR", color:1, size:"small" %}

Here are the three valid faces:

{% include pieceElevation, key:"P", color:1, size:"small" %}

{% include pieceElevation, key:"L", color:1, size:"small" %}

{% include pieceElevation, key:"R", color:1, size:"small" %}


## Possible Boards
For each N, which board sizes are possible?

* N=1: (3..5) --> board size: 2
* N=2: (6..10) --> 3
* N=3: (9..15) --> 3
* N=4: (12..20) --> 4
* N=5: (15..25) --> 4 or 5 (area 16 or 25)
* ...
* N=25 (75..125) --> 9, 10, or 11

TODO: make this a table. Only show allowed board sizes.

Color coding:
* Red = 0 solutions
* Yellow = 2+ unique solutions
* Green = 1 solution

Headers:
* Columns: no header
* Rows: number of pieces (N)

Cell Text (without highlight)
* Board Size (B) (or maybe exclude for cleaner view?)

When highlighting each cell we see:
* number of pieces (N)
* board size (B)
* preview of 1 solution (if applicable)

