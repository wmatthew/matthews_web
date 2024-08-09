---
layout: layouts/base.liquid
title: Puzzle Rendering Widgets
eleventyNavigation:
  key: Puzzle Rendering Widgets
  parent: Tools
permalink: puzzle/rendering/widgets/
tags:
  - tool
---
# {{title}}

This is a gallery of puzzle rendering widgets, mostly for my own testing purposes. Headers with nothing rendered below are things I still need to implement.

To help these load quickly, I try to minimize client side JS wherever possible.

---
## 2D Pieces

### 2D Piece: fixed width

<div class="tabs-container">
    <input type="radio" id="tab-1A" name="my-tabs-A" checked>
    <label for="tab-1A" class="tab-label">T</label>
    <div class="tab-content">
    {% include pieceElevation, key:"T", color:1, size:"small" %}
    </div>
    <!-- -->
    <input type="radio" id="tab-2A" name="my-tabs-A">
    <label for="tab-2A" class="tab-label">O</label>
    <div class="tab-content">
    {% include pieceElevation, key:"O", color:1, size:"small" %}
    </div>
    <!-- -->
    <input type="radio" id="tab-3A" name="my-tabs-A">
    <label for="tab-3A" class="tab-label">I</label>
    <div class="tab-content">
    {% include pieceElevation, key:"I4", color:1, size:"small" %}
    </div>
    <!-- -->
    <input type="radio" id="tab-4A" name="my-tabs-A">
    <label for="tab-4A" class="tab-label">L</label>
    <div class="tab-content">
    {% include pieceElevation, key:"L", color:1, size:"small" %}
    </div>
    <!-- -->
    <input type="radio" id="tab-5A" name="my-tabs-A">
    <label for="tab-5A" class="tab-label">S</label>
    <div class="tab-content">
    {% include pieceElevation, key:"S", color:1, size:"small" %}
    </div>
</div>

### 2D Piece: fixed cell size

* TODO: implement fixed cell size

### 2D Piece, another orientation

Piece rotated by in-template filter.

{% include pieceElevation, key:"T", rotate:true, color:1, size:"small" %}

---

## 2D Boards

The objective of a tiling puzzle is to use pieces to cover the area of the board, without gaps or overlaps.

### Empty 2D Board
A checkerboard pattern makes it clear how many tiles there are.

{% include polyomino, boxCoords:p-pentominos.biggerCheckerboard, colorShift: 303, size:"small", caption:"180 tiles, checkerboard pattern" %}

A solid color is visually simpler, but it's hard to parse how many tiles are present. This dark blue shape could be 5 tiles or 180.

{% include polyomino, boxCoords:p-pentominos.simpleCoordsEmpty, colorShift: 0, size:"small", caption:"5 tiles, solid color" %}

### Partial 2D Board
Dark blue is used for the area where pieces have not yet been placed.

{% include polyomino, boxCoords:p-pentominos.fourCoordsPartial, size:"small", caption: "An orange and blue piece are placed at the top. The board has empty space at the bottom." %}

### Completed 2D Board
A solved Board with default colors.

{% include polyomino, boxCoords:p-pentominos.mirrorFourCoords, size:"small", caption: "With four pieces placed, the board is full." %}

### Color Shifting In Template
Same data as the Completed 2D Board above, with colors shifted by the template.

{% include polyomino, boxCoords:p-pentominos.mirrorFourCoords, size:"small", colorShift:4, caption: "Full board, recolored" %}

---

## 3D Pieces

See also: https://codepen.io/wmatthew/pen/ZEbNyVg

### 3D Piece

{% include piece3d, key:"PLR", color:1, size:"small", spin:false, caption:"PLR piece, stationary" %}

### 3D Piece, another orientation

Note that the coloring changes here. The side facing the user is still red, but it's a different side (3 red faces, instead of 5 above). This is because we rotated the underlying list of coordinates (before assigning colors to faces) instead of applying a CSS transform (after assigning colors to faces).

{% include piece3d, key:"PLR", color:1, size:"small", rotate:true, spin:false, caption:"PLR piece, stationary" %}

### 3D Piece, rotating
{% include piece3d, key:"PLR", color:1, size:"small", spin:true, caption:"PLR, rotating" %}

### 2D Representation of 3D Piece

This is an elevation map of the same piece as above.

{% include pieceElevation, key:"PLR", color:1, size:"small", caption:"PLR elevation map" %}

### 3D Piece, semi-transparent

* TODO: opacity as an arg?

---

## 3D Boards

With 3D polycube puzzle pieces, there are two types of tiling puzzles I'm interested in. These puzzles can be defined by their objective:
* Completely cover a floor, with every piece touching the floor.
* Fit all pieces into a volume of space (which may or may not fill the space)

The goal is to represent an empty, partial, or completed board in a way that makes sense for either of these puzzle types.

### Empty 3D Board

* TODO: how to show shape of the board in 3D? Dotted lines?

### Partial 3D Board

* TODO: show board with multiple pieces placed

### Completed 3D Board

* TODO: show a completed board.

---

## Other, More Abstract Things

### Data Grid with number values

Render a table from JSON data.

{% include dataGrid, key:"exampleDataGrid", size:"small" %}

### Annotated Solution Sequence

<div class="tabs-container">
    <input type="radio" id="tab-1C" name="my-tabs-C" checked>
    <label for="tab-1C" class="tab-label">Step 1</label>
    <div class="tab-content">
{% include polyomino, boxCoords:p-pentominos.simpleCoordsEmpty, colorShift: 0, size:"small", caption:"Start with an empty board." %}
    </div>
    <!-- -->
    <input type="radio" id="tab-2C" name="my-tabs-C">
    <label for="tab-2C" class="tab-label">Step 2</label>
    <div class="tab-content">
{% include polyomino, boxCoords:p-pentominos.fourCoordsPartial, size:"small", caption: "Add one P and one Q at the top." %}
    </div>
    <!-- -->
    <input type="radio" id="tab-3C" name="my-tabs-C">
    <label for="tab-3C" class="tab-label">Step 3</label>
    <div class="tab-content">
{% include polyomino, boxCoords:p-pentominos.fourCoords, size:"small", caption: "Complete by adding another P and Q." %}
    </div>
</div>

### Abstract Grid of Solved Puzzles - hover to view

* TODO: hovering not implemented yet

{% include polyomino, boxCoords:p-autosolutions.autoSolutionUpTo4 size:"large", caption:"results for boards of size 1-4", colorShift:90 %}

### List of puzzle constraints

{% include constraints constraints:constraints-templates.Clones_Tile_A_Square %}

### Hidden content

TODO: make it so you click the blacked-out content itself, not a button nearby?

<div class="tabs-container">
    <input type="radio" id="tab-B1" name="my-tabs-B">
    <label for="tab-B1" class="tab-label">Show</label>
    <div class="tab-content">
{% include polyomino, boxCoords:p-pentominos.fourCoords, size:"small", caption: "Content shown. Click 'Hide' to hide." %}
    </div>
    <!-- -->
    <input type="radio" id="tab-B2" name="my-tabs-B" checked>
    <label for="tab-B2" class="tab-label">Hide</label>
    <div class="tab-content">
{% include polyomino, boxCoords:p-pentominos.simpleCoordsEmpty, colorShift: 0, size:"small", caption:"Content hidden. Click 'Show' to show." %}
    </div>
</div>

### Raw JSON

{% include jsonTextArea, inputJSON:widget-gallery-examples["exampleDataGrid"] %}

### Piece Normalizer/Format Translator

TODO

* transform format before render
* shift coordinates (from non-positive coordinates)
* normalize orientation

Verifying normalization correctness should be done in unit tests. this is just about display logic.

### Library Browser / Gallery

* TODO

---

## Render Artifacts

TODO: Fix the occasional artifacts on desktop chrome: thin white lines on some row boundaries. The relevant CSS attribute seems to be grid-auto-rows.

### Fails WITH grid-auto-rows

{% include polyomino, boxCoords:p-pentominos.biggerCheckerboard, colorShift: 303, size:"small", caption:"180 tiles, checkerboard pattern" %}

{% include pieceElevation, key:"T", color:1, size:"small" %}


### Fails WITHOUT grid-auto-rows

{% include pieceElevation, key:"PLR", color:1, size:"small", caption:"PLR elevation map" %}

