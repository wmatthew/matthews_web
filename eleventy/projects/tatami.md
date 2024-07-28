---
layout: layouts/base.liquid
title: Tatami Tiling
eleventyNavigation:
  key: Tatami Tiling
  parent: Investigations
permalink: tatami/tiling/
tags:
  - investigation
---
# {{title}}

## Premise

* What tatami tilings are
* Constraints

## Interesting Tilings

Outline:
* start with all tilings 1x1 up to 16x16
* remove impossible ones
* note patterns.
* remove ones w multiple solutions
* remove ones w simple whorl solutions
* remove ones w 2 whorls in a symmetrical layout
* remove trivial / uninteresting ones (eg:1xN)
* what's left?

## Visualizations

* Need way to highlight current ones being changed. Brighten? Darken all the others?

* Mousing over selections should show a preview

* Split out colors into a separate page


### Sample Code
```
createGrid(17,17) // each cell has a value, color, and map to show when moused over

.fillValues(<list of 289 values? start with question marks until investigated?>)

.colorAllCells(unknownColor) // purple

.colorRow(0,headerColor) // light grey

.colorCol(0,headerColor) // light grey

.colorCells([cells], impossibleColor) // black

.colorCells([cells], trivialColor) // red. eg: 1xN.

.colorCells([cells], manySolutionsColor) // orange

.colorCells([cells], oneWhorlColor) // yellow

.colorCells([cells], tooSymmetricalColor) // yellow

.colorCells([cells], prettyGoodCandidatesColor) // green

.colorCells([cells], bestOptionColor) // bright green?

```