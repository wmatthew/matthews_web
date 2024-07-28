---
layout: layouts/base.liquid
title: Polycube Gallery
eleventyNavigation:
  key: Polycube Gallery
  parent: Tools
permalink: polycube/gallery/
tags:
  - tool
---
# {{title}}
A gallery of polycube shapes.

# 2D Polycubes (Polyominos)

{% include pieceReport, key:"I1", color:1, size:"small" %}

{% include pieceReport, key:"I2", color:1, size:"small" %}

{% include pieceReport, key:"I3", color:1, size:"small" %}

{% include pieceReport, key:"R", color:1, size:"small" %}

{% include pieceReport, key:"T", color:1, size:"small" %}

{% include pieceReport, key:"O", color:1, size:"small" %}

{% include pieceReport, key:"I4", color:1, size:"small" %}

{% include pieceReport, key:"L", color:1, size:"small" %}

{% include pieceReport, key:"S", color:1, size:"small" %}

{% include pieceReport, key:"P", color:1, size:"small" %}

{% include pieceReport, key:"A", color:1, size:"small" %}

# 3D Polycubes

{% include pieceReport, key:"PLR", color:1, size:"small" %}

{% include pieceReport, key:"PQR", color:1, size:"small" %}

{% include pieceReport, key:"PQO", color:1, size:"small" %}

{% include pieceReport, key:"VPL", color:1, size:"small" %}

{% include pieceReport, key:"APL", color:1, size:"small" %}

{% include pieceReport, key:"L+3", color:1, size:"small" %}

{% include pieceReport, key:"PLR+", color:1, size:"small" %}

{% include pieceReport, key:"knot", color:1, size:"small" %}

{% include pieceReport, key:"knot+1", color:1, size:"small" %}

{% include pieceReport, key:"helix", color:1, size:"small" %}

{% include pieceReport, key:"3x4x5", color:1, size:"small" %}

{% include pieceReport, key:"hollowCube", color:1, size:"small" %}

{% include pieceReport, key:"kian", color:1, size:"small" %}

# Representing Polycubes
## Compact Notation
Polycubes are represented as delimited strings of numbers.
* numbers represent stacks of cubes (in the z direction, coming out of viewing plane toward viewer)
* row of numbers are adjacent stacks (in the x direction, left to right across viewing plane)
* single slash / delimits rows (y direction, downward on viewing plane).
* double slash // delimits planes (z direction, generally only necessary to represent overhangs)
* 0s represent empty spaces. Use a 0 in a empty row or plane when there is nothing to represent (for an example, see 'hollow cube' shape). This prevents two / delimiters from being mistaken for a single // delimiter.

## Naming
Every polycube gets a shorthand name.
* Name rods by length, prefixed with "I" ("I4")
* Name rectangular solids by their dimensions, delimited with "x" ("1x2x3")
* When possible, name 2D polycubes by a letter approximating their shape ("P")
* When possible, name polycubes by overhang-free faces, with bigger faces first ("PQO")
* Use + to indicate a shape where footprint has been extended, generally along the Z axis ("PLR+")
* Use +N to indicate a shape where an N-long spike has been added, generally at the top left along the Z axis ("L+3", "knot+1")

## Orientation
Compact notation implies a default orientation. Best practices for choosing an orientation:
* Favor orientations that are easy to quickly assess and understand.
* Minimize the number, size, and complexity of z-axis structures extruding from the xy plane. If there is a complex 2D shape, lay it out flat on the xy plane so the viewer can see it easily.
* Don't worry about finding a canonical/minimal representation that can be algorithmically determined (eg, shortest or lexicographically earliest representation). Instead, orient in a way that is convenient/intuitive.
* If the name of a polycube uses letters to describe its shape, try to match orientation and chirality of those letters. (TODO: match chirality? of footprint or piece when viewed head-on?)
