---
layout: layouts/base.liquid
title: 36 Triangles
eleventyNavigation:
  key: 36 Triangles
  parent: Investigations
  excerpt: A tiling puzzle where pieces can't rotate.
tags:
  - tiling
  - investigation
  - 3D printed
permalink: 36/triangles/puzzle/
hero: 36-triangles-1.jpg 
---
# {{title}}

// Images: jigsaw puzzle, sliding puzzle, some other tiling puzzle

## Constraining Rotation

In a typical tiling puzzle you can shift, and rotate, and flip pieces. Often the player can do any of these in any order, without limitation, until they reach a solution state. Can we change or limit these operations to make interesting new puzzles?

* **Shifting** is core to what makes a tiling puzzle. We could anchor every piece to a location but the result would be a very different experience. [Sliding puzzles](https://en.wikipedia.org/wiki/Sliding_puzzle) constrain shifting in space (often locking to movement along cartesian axes, like a rook) and time (pieces become locked and immobile depending on the configuration)
* **Rotation** is gently discouraged when all pieces are modified rectangles (jigsaw puzzles), and is completely locked in most sliding puzzles.
* **Flipping** pieces is the most common operation to restrict. It can be discouraged by printing a pattern on one side (eg, jigsaw puzzles) or making pieces with rounded or uneven tops that discourage upside-down placement. Flipping is impossible in all sliding puzzles that I've encountered.

// Image: slide puzzle solution state sometimes boring

Sliding puzzles have a lot of interesting ways to constrain movement. The drawback of sliding puzzles is that they are too focused on making moves in the right sequence, instead of discovering an interesting end state. I want to make a rotation-restricted puzzle where the solution state is unknown and interesting, and where pieces can be freely placed or removed in any order. Here are some ways to do this:

* Pieces could fit into a board with asymmetric holes. Pieces are locked to 1 possible orientation (no turns).
* Pieces could fit into a board with regularly spaced grooves. Pieces are limited to 2 possible orientations (180º turns only)
* Pieces could fit into a board with rotationally symmetric holes, where they could be turned to a number of orientations based on the symmetry of the hole. (star hole = 5 orientations, etc)

All of these schemes restrict pieces to discrete locations, often on a lattice grid (an irregular arragement of holes could be an interesting thing to explore in the future).

// Image: square lattice, equilateral triangle holes

I chose a square lattice with polyomino pieces (4 orientations) and equilateral triangle holes (3 orientations). In combination this locks pieces the way asymmetric holes would, but with a bit more pleasing visual symmetry.

// Image: pieces are effectively orientation locked

In my current iteration pieces are all rectangular, which means they are overconstrained (pieces can't be turned 180º and placed, but even if they could this wouldn't change the puzzle)

## Beta Testing

* 6x6 grid with 9 pieces
* Every combination of width and height up to 3x3
* Colors based on aspect ratio

### Physical properties

* Rounded corners
* Two-part box to hold pieces for storage vs flip open and play/experiment
* Holes in both lid and base

## Finding An Interesting Challenge

- Too easy to just pack these 9 pieces into a square
- How to make this challenging? Different piece shapes?
- Rules about colors being near each other. Same color can't touch on side. Same color can't touch even at corner.
    -  Is this solvable with 9 pieces? If not, what about 16?

// TODO


