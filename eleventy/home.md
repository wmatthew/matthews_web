---
layout: layouts/base.njk
title: Matthew's
permalink: /
eleventyExcludeFromCollections: true
---
Matthew's ...
<ul>
{%- for post in collections.all -%}
  <li>{{ post.data.title }} {{ post.page.url }}</li>
{%- endfor -%}
</ul>