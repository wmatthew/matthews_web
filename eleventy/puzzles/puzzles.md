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
  <li>{{ post.data.title }}</li>
{%- endfor -%}
</ul>