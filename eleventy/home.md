---
layout: layouts/base.njk
title: Matthew's
permalink: /
eleventyExcludeFromCollections: true
---
Matthew's ...
<ul>
{%- for post in collections.all -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>