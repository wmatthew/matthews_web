---
layout: layouts/base.njk
title: Pentomino Tiling
eleventyNavigation:
  key: Pentominos
  parent: Puzzles
tags:
  - puzzle
  - rep-tile
permalink: pentomino/puzzle/
---
# {{title}}

This is a P-pentomino:
{% include polyomino, boxCoords:p-pentominos.simpleCoords, size:"small" %}

This shape is **chiral**: flipping it creates a new shape that can't be restored by shifting or rotating. That means there is a 'regular' and 'flipped' version. We'll call the shape above regular.

Here's the flipped version:
{% include polyomino, boxCoords:p-pentominos.mirrorCoords, size:"small" %}

One thing that's cool about this shape is that multiple copies can be arranged to form a larger version of the original shape.

Here two regular and two flipped shapes are used:
{% include polyomino, boxCoords:p-pentominos.fourCoords, size:"small" %}

This tiling of the space is satisfying: everything fits perfectly, with no gaps or overlaps. Lovely!

We can also do this with one regular and three flipped shapes:
{% include polyomino, boxCoords:p-pentominos.mirrorFourCoords, size:"small" %}

Some combinations aren't possible. For example, there's no way to arrange four regular shapes to make a larger P-pentomino.

# Scaling Up
Let's say our original P-pentomino shape is made of five unit squares. It has area 5, width 2, height 3.

The larger **board** we tiled above has four shapes (area 20, width 4, height 6).

There are many possible larger boards: for any N={1,2,3,...}, we can draw a board of area 5N&sup2;, width 2N, and height 3N.

Here's any empty board of size N=3 (area 45, width 6, height 9):
{% include polyomino, boxCoords:p-pentominos.bigCheckerboard, size:"small" %}

For each larger board, we can ask:
* Can we tile the board with **tile set** of N&sup2; regular tiles?
* What about a tile set of N&sup2;-1 regular tiles and 1 flipped tile?
* What about a tile set of N&sup2;-2 regular tiles and 2 flipped tiles?
* What about a tile set of N&sup2;-3 regular tiles and 3 flipped tiles?
* ...
* What about a tile set of 0 regular tiles and N&sup2; flipped tiles?

In effect, we have a boundless number of tiling **puzzles**, where each puzzle is a fixed tile set and board size. Some will have no solutions; some will have many. It's not immediately obvious if there will be any pattern, but this seems like an interesting space to explore.

{% include polyomino, boxCoords:p-pentominos.biggerCheckerboard, size:"small" %}

# Predictions
Before I programmatically explore the space, I'll make some predictions:

Will there be a pattern to which boards/tile sets have solutions?

* Prediction: No, solutions will be more common as area grows, without a clear pattern.

Will large boards be completely possible/impossible regardless of tile set?

* Prediction: No, large boards will have a mix of possible and impossible tile sets.

Will large boards have unique solutions?

* Prediction: Yes, we'll find at least one puzzle with a unique solution on every board we look at.

Will there be a repeating interior pattern in large board solutions?

* Prediction: Yes, there will be repeating interior patterns when there are many solutions. Unique solutions will have chaotic interiors.

# Quality Rubric
Ultimately, I'm hoping to find a puzzle that is fun to solve.

In descending priority order, I'd like to find a board/tile set that is:
* **Possible**: There is at least one solution.
* **Unique**: There are few solutions (ideally just one)
* **Chiral**: The tile set can only make one board shape (it can't assemble a mirror board).
* **Tricky**: There are many 'near misses': solutions for the same size board with one more or fewer regular tiles.

We can quantify these and automatically rank solutions by quality as we find them.

There are other factors to consider:
* Avoid repetitive patterns (tedious)
* Avoid very large/small boards (too hard/easy)

These are harder to quantify up front. We'll just have to play it by ear after we find some solutions.

## Colors
As we solve individual board/tileset combinations we'll color-code them as follows:
* Grey for unknown states
* Red for puzzles with 0 solutions
* Orange for puzzles with 2+ solutions
* Yellow for puzzles with 1 solution (not chiral-unique; tile set can assemble a flipped board)
* Green for puzzles with 1 solution (chiral-unique)

{% include polyomino, boxCoords:p-solutions.palette, size:"small" %}

# Visualizing Results
Each board size N has N&sup2;+1 possible tile sets corresponding to (0,1,...N&sup2;) regular tiles.

To visualize the solution space, we'll group solutions by board size. In each group, the single top square represents a tile set with 0 regular tiles. The N&sup2; squares below will represent tile sets with (1,...N&sup2;) tiles. 

This is what the map of solutions for N=[1,2,3,4] will look like:

{% include polyomino, boxCoords:p-solutions.blank4, size:"large"%}

Don't read too much into the spatial arrangement here: it's an arbitrary/aesthetic decision to make the data easy to scan. These results could have been presented in a ranked list, spreadsheet, or 3D visualization. Hopefully this layout will help us spot interesting solutions.

The fact that N=2 forms a P-Pentomino shape is a happy accident (or an unfortunate source of confusion?)

# Results

Let's start with the smallest board size (N=1) and work our way up.

We can do the first few by hand.

## N = 1
It's easy to reason about N=1. These are tile sets with 1 tile total and the board is the size of a single tile.
* 0 regular tiles means we only have 1 flipped tile. There's no solution, so this square is red.
* 1 regular tile is trivally solvable. Since we can't use the tile to make a flipped board, the solution is chiral-unique. Green.

{% include polyomino, boxCoords:p-solutions.solution1, size:"large"%}

## N = 2
You can work out N=2 in a few minutes with a pen and paper. These are tile sets with 4 tiles total. The two solutions described are the ones illustrated earlier in this post.

* 0 regular tiles is impossible (red)
* 1 regular tile is chiral-unique (greeen)
* 2 regular tiles is unique (yellow).
* 3 and 4 regular tiles are impossible (red)

{% include polyomino, boxCoords:p-solutions.solution2, size:"large"%}

As the board grows, it gets harder to work out solutions. I wrote a program that solves tiling puzzles and will use this going forward.

## N = 3

This content was generated 100% automatically. It's reassuring to see that the solutions for size 1 and 2 match the manual results above.

{% include polyomino, boxCoords:p-autosolutions.autoSolutionUpTo3 size:"large" %}


## N = 4

{% include polyomino, boxCoords:p-autosolutions.autoSolutionUpTo4 size:"large" %}

## N = 5, 6, 7

{% include polyomino, boxCoords:p-autosolutions.autoSolutionUpTo7 size:"large" %}

# Analysis
* examine the best solutions
* were my predictions right?
* anything else interesting here?
* is recursion apparent? (ie: N=2 solutions embedded in N=4?)

# Further Reading
* [Rep-tile](https://en.wikipedia.org/wiki/Rep-tile) (wikipedia): a shape that can be dissected into smaller copies of the same shape.
