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

This is a gallery of puzzle rendering widgets for testing purposes. Headers with nothing rendered below are things I still need to implement.

To help these load quickly, I try to minimize client side JS wherever possible.

---
## 2D Pieces

### CSS grid vs SVG

TODO: make these match exactly

TODO: add grid lines around outer edge only
 
{% include template-tag, templates:"pieceElevation,pieceSvg"%}

<div style="float:left; margin-right: 5px;">
    {% include pieceElevation, key:"T", caption:"CSS grid", color:1, size:"small" %}
</div>
    {% include pieceSvg, key:"T", caption:"SVG", color:1, size:"small" %}

### 2D Piece: fixed width

Keep the total width the same regardless of content.

{% include template-tag, templates:"pieceElevation"%}

<div class="tabs-container">
    <input type="radio" id="tab-1A" name="my-tabs-A" checked>
    <label for="tab-1A" class="tab-label">T</label>
    <div class="tab-content">
    {% include pieceElevation, key:"T", color:1, size:"small" -%}
    </div>
    <!-- -->
    <input type="radio" id="tab-2A" name="my-tabs-A">
    <label for="tab-2A" class="tab-label">O</label>
    <div class="tab-content">
    {% include pieceElevation, key:"O", color:1, size:"small" -%}
    </div>
    <!-- -->
    <input type="radio" id="tab-3A" name="my-tabs-A">
    <label for="tab-3A" class="tab-label">I</label>
    <div class="tab-content">
    {% include pieceElevation, key:"I4", color:1, size:"small" -%}
    </div>
    <!-- -->
    <input type="radio" id="tab-4A" name="my-tabs-A">
    <label for="tab-4A" class="tab-label">L</label>
    <div class="tab-content">
    {% include pieceElevation, key:"L", color:1, size:"small" -%}
    </div>
    <!-- -->
    <input type="radio" id="tab-5A" name="my-tabs-A">
    <label for="tab-5A" class="tab-label">S</label>
    <div class="tab-content">
    {% include pieceElevation, key:"S", color:1, size:"small" -%}
    </div>
</div>

### 2D Piece: fixed cell size

TODO: implement fixed cell size

### 2D Piece: orientations

Piece rotated by in-template filter.

TODO: fixed size, all one row?

{% include template-tag, templates:"pieceElevation"%}

<div style="float:left; margin-right: 5px;">
{% include pieceElevation, key:"T", transform:"A0", color:1, size:"small" %}
</div>
<div>
{% include pieceElevation, key:"T", transform:"A2", color:1, size:"small" %}
</div>
<div style="float:left; margin-right: 5px;">
{% include pieceElevation, key:"T", transform:"A1", color:1, size:"small" %}
</div>
<div>
{% include pieceElevation, key:"T", transform:"A3", color:1, size:"small" %}
</div>

---

## 2D Boards

The objective of a tiling puzzle is to use pieces to cover an area, without gaps or overlaps. We call that area the **board**.

### Empty 2D Boards
A solid color is simple, but hard to parse. The dark shape below could be made up of 5 squares or many more. The checkerboard pattern makes the area of the board clear.

TODO: dotted-outline view of an empty board

TODO: apply checkerboard pattern in template

{% include template-tag, templates:"polyomino"%}

<div style="float:left; margin-right: 5px;">
{% include polyomino, boxCoords:p-pentominos.simpleCoordsEmpty, colorShift: 0, size:"small", caption:"empty board of area 5. solid dark blue color." %}
</div>

{% include polyomino, boxCoords:p-pentominos.biggerCheckerboard, colorShift: 303, size:"small", caption:"empty board of area 180. checkerboard pattern." %}


### Partially Completed and Completed 2D Boards
A dark color is used for the area where pieces have not yet been placed.

TODO: add grid lines around piece division edges only

{% include template-tag, templates:"polyomino"%}

<div style="float:left; margin-right: 5px;">
{% include polyomino, boxCoords:p-pentominos.fourCoordsPartial, size:"small", caption: "An orange and blue piece partially cover this board. The bottom of the board is empty." %}
</div>

{% include polyomino, boxCoords:p-pentominos.mirrorFourCoords, size:"small", caption: "This board is full, with four pieces placed." %}

<br style="clear:left">

### Color Shifting In Template
These templates have the same input data, but with colors shifted by the template.

{% include template-tag, templates:"polyomino"%}

<div style="float:left; margin-right: 5px;">
{% include polyomino, boxCoords:p-pentominos.mirrorFourCoords, size:"small", caption: "Full board." %}
</div>

{% include polyomino, boxCoords:p-pentominos.mirrorFourCoords, size:"small", colorShift:4, caption: "Full board, recolored" %}

<br style="clear:left">

### Annotated 2D board

TODO: Override with custom face colors - for highlighting one face
TODO: symbols (emojis?) on a select group of faces

---

## 3D Pieces

See also: https://codepen.io/wmatthew/pen/ZEbNyVg

### 3D Piece

This shows a 3D piece in two orientations. Note the coloring change: the front side facing the user is still red, but it's a different side (3 red faces vs 5). This is because we modified the underlying list of coordinates passed to the template (before assigning colors to faces) instead of applying a CSS transform (after assigning colors to faces).

{% include template-tag, templates:"piece3d"%}

<div style="float:left; margin-right: 5px;">
{% include piece3d, key:"PLR", color:1, size:"small", spin:false, caption:"PLR piece", scene_classes:"show_cube_face_labels" %}
</div>
<div>
{% include piece3d, key:"PLR", color:1, size:"small", transform:"A1", spin:false, caption:"PLR piece, rotated 90º", scene_classes:"show_cube_face_labels" %}
</div>

### 3D Piece, rotating

{% include template-tag, templates:"piece3d"%}

<div style="float:left; margin-right: 5px;">
{% include piece3d, key:"PLR", color:1, size:"small", spin:true, caption:"Opaque", scene_classes:"opaque_cube_faces" %}
</div>
<div>
{% include piece3d, key:"PLR", color:1, size:"small", spin:true, caption:"Transparent" %}
</div>
<div>
{% include piece3d, key:"PLR", color:1, size:"small", spin:true, caption:"Wireframe", scene_classes:"transparent_cube_faces" %}
</div>

### 2D Representation of 3D Piece

This is an elevation map of the same piece as above. This map only labels elevations 2 and greater.

{% include template-tag, templates:"pieceElevation"%}

{% include pieceElevation, key:"PLR", color:1, size:"small", caption:"PLR elevation map" %}

---

## 3D Boards

Recall that the objective of a (2D) tiling puzzle is to use pieces to cover a (2D) area, without gaps or overlaps. We call that area the **board**. What is the 3D equivalent?

There are two types of 3D 'tiling' puzzles I'm interested in:
1. Fit all pieces into a 3D volume of space (pieces may or may not fill the space)
1. Completely cover a 2D area (floor), with every piece touching the floor.

The goal is to represent an empty, partial, or completed board in a way that makes sense for either of these puzzle types.

### Empty 3D Board

TODO: remove interior faces

TODO: remove unnecessary edges too.

{% include piece3d, key:"2x4x4", color:1, size:"small", spin:true, caption:"Wireframe", scene_classes:"transparent_cube_faces dotted_cube_edges" %}

### Partial 3D Board

TODO: show board with multiple pieces placed

### Completed 3D Board

TODO: show a completed board.

### Annotated 3D board

TODO: Override with custom face colors - for highlighting one face

TODO: symbols (emojis?) on a select group of faces

TODO: allow symbols to be aligned to edges of a face, to show matching rules

---

## More Abstract Things

Sometimes it's useful to render other data on the same square-grid layout that we use to render tiles and boards. These abstract grids have distinct styling so it's clear we're not depicting pieces.

TODO: make sure all abstract grids have a distinct background color

### Data Table

Render a table from JSON data. Tables have a light blue background.

{% include template-tag, templates:"dataGrid"%}

{% include dataGrid, key:"exampleDataGrid", caption:"times table", size:"small" %}

### Solution Sequence

Click the board to advance sequence. You can also click the top tabs to skip to any step in the sequence.

{% include template-tag, templates:"polyomino"%}

<div class="tabs-container">
    <input type="radio" id="tab-1C" name="my-tabs-C" checked>
    <label for="tab-1C" class="tab-label">1</label>
    <label for="tab-2C" class="tab-content">
    <div>
{% include polyomino, boxCoords:p-pentominos.simpleCoordsEmpty, colorShift: 0, size:"small", caption:"Empty board." -%}
    </div>
    </label>
    <!-- -->
    <input type="radio" id="tab-2C" name="my-tabs-C">
    <label for="tab-2C" class="tab-label">2</label>
    <label for="tab-3C" class="tab-content">
    <div>
{% include polyomino, boxCoords:p-pentominos.fourCoordsPartial, size:"small", caption: "Add two pieces." -%}
    </div>
    </label>
    <!-- -->
    <input type="radio" id="tab-3C" name="my-tabs-C">
    <label for="tab-3C" class="tab-label">3</label>
    <label for="tab-1C" class="tab-content">
    <div>
{% include polyomino, boxCoords:p-pentominos.fourCoords, size:"small", caption: "Complete!" -%}
    </div>
    </label>
</div>

### Abstract Grid of Solved Puzzles - hover to view

Display results for a series of questions (eg, "can x of this piece and y of this other piece tile a board of size z?") in a spatial layout. This is useful for higher-level reasoning about a large number of possible puzzle configurations (for what values of x is there a solution? is there ever a solution when x > z? etc.)

TODO: implement hovering

{% include template-tag, templates:"polyomino"%}

{% include polyomino, boxCoords:p-autosolutions.autoSolutionUpTo4 size:"large", caption:"results for boards of size 1-4", colorShift:90 %}

### Puzzle Constraints

**Constraint Template**: This is an abstract template, partially specifying a puzzle setup. It does not specify a piece supply or board, so it cannot be solved without more information.

{% include template-tag, templates:"constraints"%}

{% include constraints constraints:constraints-templates.Clones_Tile_A_Square_Simple %}

**Constraint**: This constraint instantiates the template above, specifying a piece supply and board. In this case, it also shows results from analysis:

{% include template-tag, templates:"constraints"%}

{% include constraints constraints:constraints-library.Clones_Tile_A_Square_Simple_rect4x4_T %}

### Hidden content

{% include template-tag, templates:"polyomino"%}

<div class="tabs-container hide-labels">
    <input type="radio" id="tab-B1" name="my-tabs-B">
    <label for="tab-B1" class="tab-label">1</label>
    <label for="tab-B2" class="tab-content">
    <div>
    {% include polyomino, boxCoords:p-pentominos.fourCoords, size:"small", caption: "Click to hide." -%}
    </div>
    </label>
    <!-- -->
    <input type="radio" id="tab-B2" name="my-tabs-B" checked>
    <label for="tab-B2" class="tab-label">2</label>
    <label for="tab-B1" class="tab-content">
    <div class="tab-content">
    {% include polyomino, boxCoords:p-pentominos.simpleCoordsEmpty, colorShift: 0, size:"small", caption:"Click to show." -%}
    </div>
    </label>
</div>

### Raw JSON

{% include template-tag, templates:"jsonTextArea"%}

{% include jsonTextArea, inputJSON:widget-gallery-examples["exampleDataGrid"] %}

### Library Browser / Gallery

* TODO

---

## Render Bugs

Known unresolved rendering problems.

### CSS grid: grid-auto-rows

CSS grid tables have intermittant artifacts on desktop chrome: thin horizontal white lines on some row boundaries.

The relevant CSS attribute seems to be grid-auto-rows in the actualMap CSS class.

#### Sometimes fails WITH grid-auto-rows

{% include template-tag, templates:"pieceElevation"%}

{% include pieceElevation, key:"T", color:1, size:"small" %}

<br style="clear:left">

#### Sometimes fails WITHOUT grid-auto-rows

{% include template-tag, templates:"pieceElevation"%}

{% include pieceElevation, key:"PLR", color:1, size:"small" %}

#### Sometimes fails either way

{% include template-tag, templates:"polyomino"%}

<div style="float:left; margin-right: 5px;">
{% include polyomino, boxCoords:p-pentominos.biggerCheckerboard, colorShift: 303, size:"small", caption:"checkerboard" %}
</div>
