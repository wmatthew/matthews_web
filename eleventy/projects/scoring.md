---
layout: layouts/base.liquid
title: Scoring
eleventyNavigation:
  key: Scoring
  parent: Tools
tags:
  - tiling
  - investigation
permalink: scoring/tiling/puzzles/
---
# {{title}}

Some investigations will produce many possible solutions. Scoring solutions makes it easier to quickly sort out which solutions are worth looking at more closely.

This is an approximate rubrik, so the highest score is not necessarily the best puzzle.

## Scores

- Sliceability: every grid-aligned straight line/plane splits some number of pieces. the best cut minimizes this number. how many pieces does the best cut split? (int) (bigger number is better):
  * 5 * (slice number)
- Number of solutions:
  * -1 * (solutions)
- Use every piece (probably never comes up, because pieces could be removed from supply?)
  * -1 * (pieces not used)
- Use every orientation:
  * -1 * (orientations not used)
- Use every orientation/rotation combo:
  * -1 * (orientation/rotation combo not used)

## Precalculated Scores
Some scores can be computed before we even search for solutions.

* Total Number of pieces: ideal is 12. 
  * -1 * (distance from ideal)
* Board is simple
  * -1 * (sides on board)
* Small distinct number of pieces in puzzle.
  * -5 * (number of pieces)
* Annoying rules: eg, you must assess buried pieces to know if a solution is valid.
  * -1 * (number of rules)
