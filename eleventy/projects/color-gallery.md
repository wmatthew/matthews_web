---
layout: layouts/base.liquid
title: Color Gallery
eleventyNavigation:
  key: Colors
  parent: Tools
permalink: color/gallery/
tags:
  - tool
---
# {{title}}

## Basic Colors
Bright, contrasting pastels without semantic meaning.
{% include color, color:1 %}
{% include color, color:2 %}
{% include color, color:3 %}
{% include color, color:4 %}
{% include color, color:5 %}
{% include color, color:6 %}
{% include color, color:7 %}
{% include color, color:8 %}

## Semantic Colors
Colors used to describe state or quality.
{% include color, color:100, text:"unknown" %}
{% include color, color:101, text:"worst" %}
{% include color, color:102, text:"bad" %}
{% include color, color:103, text:"neutral" %}
{% include color, color:104, text:"good" %}
{% include color, color:105, text:"best" %}
{% include color, color:106, text:"impossible" %}
{% include color, color:107, text:"info" %}

## Gradient Colors
A range from dark to light
{% include color, color:200, text:"darkest" %}
{% include color, color:201 %}
{% include color, color:202 %}
{% include color, color:203 %}
{% include color, color:204 %}
{% include color, color:205 %}
{% include color, color:206 %}
{% include color, color:207 %}
{% include color, color:208 %}
{% include color, color:209 %}
{% include color, color:210 %}
{% include color, color:211 %}
{% include color, color:212, text:"lightest" %}


## Alternating Colors
Contrasting pairs of colors meant to be tiled.
{% include color, color:301 %}
{% include color, color:302 %}
