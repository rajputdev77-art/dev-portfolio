---
title: "Hybrid retrieval outperforms pure semantic search"
slug: "hybrid-retrieval-outperforms-pure-semantic-search"
date: "2026-04-02T00:00:00.000Z"
description: "Pure semantic search finds conceptually similar content but misses structural relationships. Pure keyword search finds exact matches but misses conceptual connections. Hybrid retrieval combines both: 1. Semantic search (smartconnections MCP) — finds relevant notes even without kn…"
read: "1 min"
order: 53
source: "vault"
---

# Hybrid retrieval outperforms pure semantic search

Pure semantic search finds conceptually similar content but misses structural relationships. Pure keyword search finds exact matches but misses conceptual connections.

Hybrid retrieval combines both:
1. **Semantic search** (smart-connections MCP) — finds relevant notes even without knowing exact titles
2. **Structured queries** (qmd MCP) — precise lookups by path, tag, or metadata

## Why This Works

The Obsidian graph gives semantic search a backbone to navigate. When Claude searches for "authentication patterns," it finds:
- Semantically similar notes (via embeddings)
- Structurally linked notes (via wiki-links)
- Tagged collections (via metadata queries)

Three retrieval paths means three chances to find the right context.

## Related

- [[memory graphs beat giant memory files]]
- [[prose-as-title makes retrieval 10x more effective]]
