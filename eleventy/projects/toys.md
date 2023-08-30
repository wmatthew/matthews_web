---
layout: layouts/base.liquid
title: Toys
eleventyNavigation:
  key: Toys
permalink: toys/
eleventyImport:
  collections: ["toy"]
---
# {{title}}

Interactive projects where the goal is open-ended exploration.

<ul>
{%- for post in collections.toy -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>