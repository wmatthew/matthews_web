---
layout: layouts/base.liquid
title: Design
permalink: false
---
# {{title}}

Design philosophy for puzzles and games.

<ul>
{%- for post in collections.design -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>