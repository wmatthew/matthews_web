---
layout: layouts/base.liquid
title: Matthew's
permalink: /
eleventyExcludeFromCollections: true
navToHtmlOptions:
  showExcerpt: false
---
# {{title}} ...

{{ collections.all | eleventyNavigation | eleventyNavigationToHtml: navToHtmlOptions | safe }}