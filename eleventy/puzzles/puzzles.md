---
layout: layouts/base.njk
title: Puzzles
eleventyNavigation:
  key: Puzzles
permalink: puzzles/
eleventyImport:
  collections: ["puzzle"]
---
# {{title}}

<ul>
{%- for post in collections.puzzle -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>