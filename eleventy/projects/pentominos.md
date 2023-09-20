---
layout: layouts/base.liquid
title: Pentomino Tiling
eleventyNavigation:
  key: Pentominos
  parent: Puzzles
tags:
  - puzzle
  - rep-tile
  - 3D printed
  - tiling
  - identical pieces
permalink: pentomino/puzzle/
hero: pentomino-1.jpg
---
# {{title}}

This is a P-pentomino:
{% include polyomino, boxCoords:p-pentominos.simpleCoords, size:"small", caption: "P"%}

This shape is **chiral**: flipping it creates a new shape that can't be restored by shifting or rotating. That means there is a 'regular' and 'flipped' version. We'll call the version above P because it looks like an upper case letter P.

The flipped version looks like a lower case Q:
{% include polyomino, boxCoords:p-pentominos.mirrorCoords, size:"small", caption: "Q" %}

Multiple Ps and Qs can be arranged to form a larger version of the original P shape.

Here two Ps and two Qs are used:
{% include polyomino, boxCoords:p-pentominos.fourCoords, size:"small", caption: "2P+2Q" %}

This tiling of the space is satisfying: everything fits perfectly, with no gaps or overlaps. Lovely!

We can instead fill this space with one P and three Qs:
{% include polyomino, boxCoords:p-pentominos.mirrorFourCoords, size:"small", caption: "P+3Q" %}

But some combinations aren't possible. For example, there's no way to arrange four P shapes to make a larger P.

# Scaling Up
Let's say our original P-pentomino shape is made of five unit squares. It has area 5, width 2, height 3.

The larger **board** we tiled above has four shapes (area 20, width 4, height 6).

There are many possible larger boards: for any N={1,2,3,...}, we can draw a board of area 5N&sup2;, width 2N, and height 3N.

Here's a board of size 3:
{% include polyomino, boxCoords:p-pentominos.bigCheckerboard, size:"small", caption:"size 3 board" %}

For each larger board, we can ask:
* Can we tile the board with **tile set** of N&sup2; P tiles?
* What about a tile set of N&sup2;-1 P tiles and 1 Q tile?
* What about a tile set of N&sup2;-2 P tiles and 2 Q tiles?
* What about a tile set of N&sup2;-3 P tiles and 3 Q tiles?
* ...
* What about a tile set of 0 P tiles and N&sup2; Q tiles?

In effect, we have a boundless number of tiling **puzzles**, where each puzzle is a fixed tile set and board size. Some will have no solutions; some will have many. It's not immediately obvious if there will be any pattern, but this seems like an interesting space to explore.

{% include polyomino, boxCoords:p-pentominos.biggerCheckerboard, size:"small", caption:"size 6 board" %}

# Predictions
Before I programmatically explore the space, I'll make some predictions:

1. Will there be a pattern to which boards/tile sets have solutions?

    Prediction: No, solutions will be more common as area grows, without a clear pattern.

2. Will large boards be completely possible/impossible regardless of tile set?

    Prediction: No, large boards will have a mix of possible and impossible tile sets.

3. Will large boards have unique solutions?

    Prediction: Yes, we'll find at least one puzzle with a unique solution on every board we look at.

4. Will there be a repeating interior pattern in large board solutions?

    Prediction: Yes, there will be repeating interior patterns when there are many solutions. Unique solutions will have chaotic interiors.

# Quality Rubric
Ultimately, I'm hoping to find a puzzle that is fun to solve.

In descending priority order, I'd like to find a board/tile set that is:
* **Possible**: There is at least one solution.
* **Unique**: There is exactly one solution.
* **Chiral**: The tile set can only make one board shape (it can't assemble a mirror board).
* **Tricky**: There are many 'near misses': solutions for the same size board that use one more or fewer P tiles.

We can quantify these and automatically rank solutions by quality as we find them.

There are other factors to consider:
* Avoid repetitive patterns (tedious)
* Avoid very large/small boards (too hard/easy)

These are harder to quantify up front. We'll just have to play it by ear after we find some solutions.

## Colors
As we solve individual board/tileset combinations we'll color-code them:
* Grey for unknown states
* Red for puzzles with 0 solutions (worst)
* Orange for puzzles with multiple solutions
* Yellow for unique puzzles: exactly 1 solution but not chiral-unique; tile set can assemble a flipped board.
* Green for chiral-unique puzzles: exactly 1 solution; can't assemble a flipped board. (best)

{% include polyomino, boxCoords:p-solutions.palette, size:"small", caption:"color key" %}

# Visualizing Results
Each board size N has N&sup2;+1 possible tile sets corresponding to (0,1,...N&sup2;) P tiles.

To visualize the solution space, we'll group solutions by board size. In each group, the single top square represents a tile set with zero P tiles (all Q tiles). The N&sup2; squares below will represent tile sets with (1 ... N&sup2;) P tiles. 

This is what the map of solutions for N=[1,2,3,4] will look like:

{% include polyomino, boxCoords:p-solutions.blank4, size:"large", caption:"map of solutions for board sizes 1-4"%}

Don't read too much into the spatial arrangement here: like the periodic table of elements, it's an arbitrary/aesthetic layout decision to make the data easy to scan. Hopefully this layout will help us spot interesting solutions.

The fact that N=2 forms a P-Pentomino shape is a coincidence (and hopefully not too confusing)

# Results

Let's start with the smallest board size (N=1) and work our way up.

We can do the first few by hand.

## Size 1 Boards
It's easy to reason about N=1. These are tile sets with 1 tile total and the board is the size of a single tile.
* 0 P tiles means we only have 1 Q tile. There's no solution, so this square is red.
* 1 P tile is trivally solvable. Since we can't use the tile to make a flipped board, the solution is chiral-unique. Green.

{% include polyomino, boxCoords:p-solutions.solution1, size:"large", caption:"results for boards of size 1"%}

## Size 2 Boards
You can work out N=2 in a few minutes with a pen and paper. These are tile sets with 4 tiles total. The two solutions described are the ones illustrated earlier in this post.

* 0 P tiles is impossible (red)
* 1 P tile is chiral-unique (green)
* 2 P tiles is unique (yellow).
* 3 and 4 P tiles are impossible (red)

{% include polyomino, boxCoords:p-solutions.solution2, size:"large", caption:"results for boards of size 1-2"%}

As the board grows, it gets harder to work out solutions. I wrote a program that solves tiling puzzles and will use this going forward.

## Size 3 Boards

This content was generated 100% automatically. It's reassuring to see that the solutions for size 1 and 2 match the manual results above.

{% include polyomino, boxCoords:p-autosolutions.autoSolutionUpTo3 size:"large", caption:"results for boards of size 1-3" %}

## Size 4 Boards

No unique solutions! A few extreme cases have no solutions, but most have multiple solutions.

{% include polyomino, boxCoords:p-autosolutions.autoSolutionUpTo4 size:"large", caption:"results for boards of size 1-4" %}

## Size 5, 6, 7 Boards

More of the same: no unique solutions, and all but a few cases have multiple solutions.

{% include polyomino, boxCoords:p-autosolutions.autoSolutionUpTo7 size:"large", caption:"results for boards of size 1-7" %}

# Analysis
* were my predictions right?
* examine the best solutions
* anything else interesting here?
* do the solutions have repeating structure?
* is recursion apparent? (ie: are N=2 solutions embedded in N=4?)

# Further Reading
* [Rep-tile](https://en.wikipedia.org/wiki/Rep-tile) (wikipedia): a shape that can be dissected into smaller copies of the same shape.
