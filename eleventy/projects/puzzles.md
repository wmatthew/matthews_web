---
layout: layouts/base.liquid
title: Puzzles
eleventyNavigation:
  key: Puzzles
permalink: puzzles/
eleventyImport:
  collections: ["puzzle"]
---
# {{title}}

Interactive projects where the goal is to discover a solved state.

## Design Philosophy: Simple, Complex, Satisfying
My goal is to make puzzles that start simple, exhibit organic emergent complexity, and end with a satisfying solution.

### Start Simple
Puzzles should be approachable and frictionless to start. It should be easy to learn and internalize a puzzle's rules and mechanics.

The design should be honest. If the pieces seem to be identical, the solution should not hinge on a single piece being marginally wider, shorter or heavier. Angles that are very close to major increments (45º, 60º, 90º) should be true to the user's perception and expectation.

When possible, favor few rules, or rules that are built into the materials of the puzzle. Pieces that fit together should decisively fit or not be close. Pieces that should not be flipped upside down or stacked should not flip or stack neatly. The player should not need significant strength or dexterity to solve a puzzle, and they should not be left wondering if they need to jam pieces together with force.

### Emergent Complexity
As the puzzle progresses, simple elements should combine together in interesting or surprising ways. The player should get a feeling of exploration or discovery, where new layers proceed naturally from mechanics introduced at the start.

The player should gain intuition as they go that helps them progress. High level reasoning should eliminate some paths of inquiry. Most players should not find the solution by enumerating and testing all possible configurations. Solving should not feel like brute-forcing a combination lock.

It should be easy to assess the state of the puzzle at a glance, without turning over every piece, summing numbers or doing some other form of audit. Errors should stick out. It should be easy for a passive observer to identify challenges and progress.

### Satisfying Solution
The goal state should be easy to express in the abstract; it must be something that can be understood and worked toward from the start.

When possible, the solution state should be unique. It should be exhaustive, using all pieces, and most or all configurations/orientations of those pieces. As a player gets closer to the solution, they will abstract away most pieces. As effort focuses on the final pieces and steps, the solving experience will simplify and accelerate dramatically.

The solution state itself should be interesting- although it will likely have internal structure, it should not be a tedious repetition of a trivial idea or pattern. Ideally players reaching the solution will not groan at a cheap trick or loophole that enables it, but identify with their work and feel ownership and pride in what they've accomplished.

## Puzzles I've Made
<ul>
{%- for post in collections.puzzle -%}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a></li>
{%- endfor -%}
</ul>
