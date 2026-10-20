# Public website content

Game Systems explain how the game works. Existing explainers live in `game-systems/`; their public article URLs remain `/devlog/<slug>/` for compatibility with published links. The directory at `/game-systems/` uses the groupings in `lib/system-navigation.ts`. Retain existing slugs and image paths.

Devlogs record development work in `devlog/*.md`. They cover the problem, the work implemented, decisions and trade-offs, outcomes, and remaining work. They appear at `/devlog/<slug>/` and on `/devlog/` by publication date, newest first. No system explainers are included in that feed.

## Devlog frontmatter

All eight fields below are required. Use ISO dates, unique lowercase hyphenated slugs, and `published` or `draft` status. Slugs must not collide with existing system or retained legacy routes. Drafts are visible during local development and excluded from production exports.

```yaml
---
date: 2026-10-20
title: "A development update title"
slug: example-development-update
summary: "A concise summary of the work and its outcome."
status: draft
tags: ["Combat", "Missions"]
hero_image: /images/devlog/how-combat-works-in-starforged-ascendant/sa-devlog-10-how-combat-works-in-starforged-ascendant-01-hero.jpg
related_systems:
  - how-combat-works-in-starforged-ascendant
  - inside-a-mission
---

## Problem

## Development work and decisions

## Outcomes

## Remaining work
```

Frontmatter supports one-line strings (plain, double quoted, or single quoted) and string lists (inline or indented block lists). Empty lists use `[]`. Quote text containing frontmatter punctuation; use double quoted strings for escape sequences. Multiline YAML strings and nested objects are not supported. The existing Markdown renderer supports paragraphs, headings, images, links, emphasis, lists, quotes and tables.

Use system article slugs in `related_systems` to create links in both directions automatically. Use readable system names in `tags`. Hero images must reference an existing web asset under `public/images/`; do not use local filesystem paths. No dates or implementation claims are inferred for existing explainers.

Only publish text and assets approved for the public website. Draft files are still public repository content; do not put private or internal material in them.
