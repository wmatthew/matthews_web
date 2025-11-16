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

// TODO: move script to head
<script type="text/javascript" src="../../backendJS/Plot.js"></script>
<script type="text/javascript" src="../../frontendJS/Editor.js"></script>

# {{title}}

Editor for puzzle pieces, empty boards, partial and full solutions.

## Format
* 2D Grid(s) of pieceIDs (pieceID value can be A-Z; can extend later if needed)
* - = split levels
* . = blank / empty space so far
* @ = out of bounds
* -- = end of grids. rest of file is annotations
* Annotations for special faces/edges

## Annotations
* 3D: PieceID, index, face, edge, color, text
* 2D: exact same as 3-D. can just be rendered with top down view.
* If you want to animate pieces being added - Piece ID is the render order 

## Plot
<div id="editorStatus">
Edit the text below, then press a button.
</div>

<textarea id="editorTextArea" class="editor__textbox--loading" rows=15 cols=50>
AAAB
CABB
CC.B
C...
@..@
--
A,1,top,face,#F00,⭐️
</textarea>

<button type=button id="validate">validate</button>
<button type=button id="render">render</button>

## 3D View
<div class="map" id="editor3d" style="width:282px;">
 <div class="actualMap">
  <div class="scene ">
   <div class="zoomer">
    <div class="spinner is_spinning">
     <div class="polycube" style="transform: translateX(-200px) translateZ(-200px) translateY(300px);">
     </div>
    </div>
   </div>
  </div>
 </div>
 <div class="caption" align="center">3D View</div>
</div>
 
## 2D View (exploded)
<div id="editor2dexploded"></div>

## 2D View (6 side views)
<div id="editor2dsides"></div>
