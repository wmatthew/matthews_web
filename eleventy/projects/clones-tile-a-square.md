---
layout: layouts/base.liquid
title: Clones Tile A Rectangle
eleventyNavigation:
  key: Clones Tile A Rectangle
  parent: Investigations
permalink: polycube/clones/tile/a/rectangle/
tags:
  - investigation
---
# {{title}}

Tile a rectangular board with these:

{% include piece3d, key:"PLR", color:1, size:"small" %}

## Rules
* Each piece must touch the board.
* The board must be completely covered (no gaps, no spillover outside the boundaries)
* Pieces in the same orientation can't touch (at face, edge or corner)
* No overhangs: pieces may not extend over empty space or other pieces.

We can vary the number of pieces N and the board shape B. For what values of B and N is this a good puzzle?

## Orientations

Here are the three overhang-free faces:

{% include piece3d, transform:"N1", key:"PLR", color:1, size:"small", caption:caption %}
{% include pieceElevation, key:"P", color:1, size:"small" %}

{% include piece3d, transform:"A3", key:"PLR", color:1, size:"small", caption:caption %}
{% include pieceElevation, key:"L", color:1, size:"small" %}

{% include piece3d, transform:"W3", key:"PLR", color:1, size:"small", caption:caption %}
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

# Appendix: Formal Configuration

## Generated Puzzles

{% for conPair in constraints-library %}
 {% if conPair[1].parentKey == "Clones_Tile_A_Square" %}
  {% include constraints constraints:conPair[1] %}
 {% endif %}
{% endfor %}
