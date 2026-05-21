---
title: "Memory graphs beat giant memory files"
slug: "memory-graphs-beat-giant-memory-files"
date: "2026-04-02T00:00:00.000Z"
description: "A single monolithic memory file becomes unusable past ~200 lines. The model spends tokens parsing irrelevant context, retrieval degrades, and updates create merge conflicts with itself. A graph of small, linked notes solves this because: Each note is atomic — one claim, one conce…"
read: "1 min"
order: 55
source: "vault"
---

# Memory graphs beat giant memory files

A single monolithic memory file becomes unusable past ~200 lines. The model spends tokens parsing irrelevant context, retrieval degrades, and updates create merge conflicts with itself.

A graph of small, linked notes solves this because:
- Each note is atomic — one claim, one concept
- Links create navigable paths between related ideas
- Retrieval is scoped — Claude only loads what's relevant
- Updates are surgical — change one node without touching others

## Evidence

we discovered this when [[hybrid retrieval outperforms pure semantic search]] — the graph structure gives semantic search a navigable backbone.

## Practical Application

- Keep `MEMORY.md` as a routing document under 200 lines
- Detail goes in topic-specific files linked from MEMORY.md
- Name files as claims so titles alone signal relevance
- because [[prose-as-title makes retrieval 10x more effective]]

## Related

- [[atomic notes compound better than long documents]]
- [[the persist step is where value compounds]]
