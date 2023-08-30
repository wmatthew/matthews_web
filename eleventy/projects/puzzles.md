---
layout: layouts/base.liquid
title: Puzzles
eleventyNavigation:
  key: Puzzles
permalink: puzzles/
eleventyImport:
  collections: ["puzzle"]
---
# {{title}}

Interactive projects where the goal is to discover a solved state.

<ul>
{%- for post in collections.puzzle -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>