---
layout: layouts/base.liquid
title: Orientations
eleventyNavigation:
  key: Orientations
  parent: Tools
permalink: piece/orientations/
tags:
  - tool
---
# {{title}}

This is a naming scheme for piece orientations.

We need to precisely describe orientations to describe puzzle solutions.

## Axes
The legs of the piece below show the directions of the X, Y, Z axes.
* Positive X goes to the viewer's right.
* Positive Y goes toward the viewer and is the shortest leg.
* Positive Z goes upward and is the longest leg.

{% include piece3d, key:"L+3", color:1, size:"small" caption:"X, Y, Z axes." %}

## Orientation Names

Orientation names have two parts:
* A letter indicating the face that faces down (A,N,E,W,S,U). A means the bottom faces down. N, E, W, S are named after compass directions, where each of these sides face down. U is the upside-down orientation, equivalent to applying the E or W transform twice.
* A digit indicating the number of 90º clockwise turns around the Z axis (0,1,2,3)

Thus, A0 is the identity orientation (no change).

{% for orientation in piece-orientations %}
  {% assign caption = orientation | append: ' orientation' %}
  {% include piece3d, transform:orientation, key:"OL", color:1, size:"small", caption:caption %}
{% endfor %}

## Evaluating Piece Orientations

* Which orientations have overhangs?
* Which orientations are 2D (height=1)?
* What is the footprint of each orientation? (useful for pruning the decision tree when solving)
* Which orientations are duplicates? Which footprints are?
