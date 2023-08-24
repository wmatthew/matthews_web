---
layout: layouts/base.liquid
testVar: true
testString: TestString
testArr: [2,3,4]
title: Markdown Sandbox
eleventyExcludeFromCollections: true
---
# {{ title }}

✅ Template Variables: {{ testVar }}

✅ Filter: {{ testString | makeUppercase }}

✅ Shortcode: {% sandboxSum 2, 3 %}

✅ JSON field: {{ sandbox-data.lion.size }}

✅ Subtemplate: {% include sandbox/liquid-sandbox-child, name:'Brad', arr:testArr %}
