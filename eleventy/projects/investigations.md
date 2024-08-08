---
layout: layouts/base.liquid
title: Investigations
eleventyNavigation:
  key: Investigations
permalink: investigations/
---
# {{title}}

Research and Development. Things that might become puzzles or games in the future.

<ul>
{%- for post in collections.investigation -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>

## 2D Puzzles
{% include constraints constraints:constraints-templates.Clones_Tile_A_Square_Simple %}

{% include constraints constraints:constraints-templates.Tatami %}

{% include constraints constraints:constraints-templates.Tatami_3color %}

{% include constraints constraints:constraints-templates.P_Pentominos %}

{% include constraints constraints:constraints-templates.Locked_Triangles %}

## 3D Puzzles
{% include constraints constraints:constraints-templates.Clones_Tile_A_Square %}

{% include constraints constraints:constraints-templates.Overhang_City %}

{% include constraints constraints:constraints-templates.Angel_Cube %}

