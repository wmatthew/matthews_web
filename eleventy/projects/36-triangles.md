---
layout: layouts/base.liquid
title: 36 Triangles
eleventyNavigation:
  key: 36 Triangles
  parent: Puzzles
  excerpt: A tiling puzzle where pieces can't rotate.
tags:
  - tiling
  - puzzle
  - 3D printed
permalink: 36/triangles/puzzle/
hero: 36-triangles-1.jpg 
---
# {{title}}

// TODO: image of jigsaw puzzle, sliding puzzle, some other tiling puzzle

## Constraining Rotation

In a typical tiling puzzle you can flip, shift, and rotate pieces. Can we change these operations to make interesting new puzzles?

* **Flipping** pieces is often limited by printing a pattern on one side (eg, jigsaw puzzles) or making pieces with rounded or uneven tops that discourage upside-down placement.
* **Shifting** is core to what makes a tiling puzzle. We could anchor every piece to a location but the result would be a very different experience. Shifting can be constrained by [sliding puzzles](https://en.wikipedia.org/wiki/Sliding_puzzle).
* **Rotation** is locked in sliding tile puzzles, and is gently constrained when all pieces are modified rectangles (jigsaw puzzles).

I want to make a puzzle where rotation is locked but where pieces can be freely placed or removed at any time. Here are some ways to do this:

* Pieces could fit into a board with asymmetric holes. Pieces would only have 1 possible orientation (no turning).
* Pieces could fit into a board with regularly spaced grooves. Pieces could be turned to 2 possible orientations (180º turns)
* Pieces could fit into a board with rotationally symmetric holes, where they could be turned to a number of orientations based on the symmetry of the hole. 

All of these schemes restrict pieces to a lattice grid.

I chose to do polyomino pieces (4 orientations) and triangle holes (3 orientations), which locks pieces the way asymmetric holes would, but with a bit more pleasing visual symmetry.

In my current iteration pieces are all rectangular, which means they are overconstrained (pieces can't be turned 180º and placed, but even if they could this wouldn't change the puzzle)

## Constraining Colors

TODO


