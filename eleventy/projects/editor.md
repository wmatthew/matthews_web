---
layout: layouts/base.liquid
title: Editor
eleventyNavigation:
  key: Editor
  parent: Tools
permalink: puzzle/editor/
tags:
  - tool
---

<!-- TODO: move scripts to head? -->

<script type="module" src="../../backendJS/Plot.js"></script>
<script type="module" src="../../frontendJS/Editor.js"></script>

# {{title}}

Editor for puzzle pieces, empty boards, partial and full solutions.

## Format
* 2D Grid(s) of pieceIDs (pieceID value can be A-Z; can extend later if needed)
* hyphen = split levels
* . = blank / empty space
* @ = out of bounds
* -- = end of grids. rest of file is annotations
* Annotations for special faces/edges

## Annotations
* 3D: PieceID, index, face, edge, color, text
* 2D: exact same as 3-D. can just be rendered with top down view.
* If you want to animate pieces being added - Piece ID is the render order 

## Plot
<div id="editorStatus">Edit the text below, then press a button.</div>

<textarea id="editorTextArea" class="editor__textbox--loading" rows=15 cols=50>
AHHG
AADG
BADD
BCCD
-
..HH
B..G
B..G
CC..
--
H,4,top,face,#F00,⭐️
</textarea>

## 3D View
{% include piece3d, key:"empty", color:1, size:"small", spin:false, caption:"3D View", mapid:"editor3d" %}

## 6 Side Views

{% include pieceElevation, key:"empty", color:1, size:"small", caption:"Front", mapid:"editorFront" %}

{% include pieceElevation, key:"empty", color:1, size:"small", caption:"Back", mapid:"editorBack" %}

{% include pieceElevation, key:"empty", color:1, size:"small", caption:"Left", mapid:"editorLeft" %}

{% include pieceElevation, key:"empty", color:1, size:"small", caption:"Right", mapid:"editorRight" %}

{% include pieceElevation, key:"empty", color:1, size:"small", caption:"Top", mapid:"editorTop" %}

{% include pieceElevation, key:"empty", color:1, size:"small", caption:"Bottom", mapid:"editorBottom" %}

## Exploded Layer View
<div id="editor2dexploded"></div>
