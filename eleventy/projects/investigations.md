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

## Templates
{% for conPair in constraints-templates %}
{% include constraints constraints:conPair[1] %}
{% endfor %}

## Generated
{% for conPair in constraints-library %}
{% include constraints constraints:conPair[1] %}
{% endfor %}
