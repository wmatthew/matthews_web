---
layout: layouts/base.liquid
title: Games
--eleventyNavigation:
--  key: Games
permalink: false
eleventyImport:
  collections: ["game"]
---
# {{title}}

Projects where the goal is to reach a win condition.

<ul>
{%- for post in collections.game -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>