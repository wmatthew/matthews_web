---
layout: layouts/base.liquid
title: Tools
eleventyNavigation:
  key: Tools
permalink: tools/
---
# {{title}}

Tools for designing and testing puzzles, and for displaying them on this site.

<ul>
{%- for post in collections.tool -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>