---
layout: devlog
title: "The Playtest Experience"
date: 2026-10-24
slug: when-players-couldnt-tell-what-their-build-would-do
summary: "How one playtest exposed two connected problems in Starforged: players could not confidently read their builds, and busy Talent combinations were asking far too much of the systems underneath them."
status: published
tags: ["Playtesting", "Talents", "UI", "UX", "PX", "Buildcraft", "Performance"]
related_systems:
  - how-artefacts-shape-your-combat-kit
  - 21-talent-trees-one-character
  - augments-make-skills-behave-differently
  - crafting-the-items-you-want-to-keep
  - how-combat-works-in-starforged-ascendant
hero_image: /images/devlog/14-playtest/concept-hud.webp
---

Recently I took Starforged to a local game dev meetup, where people get together to play each other's games, eat some pizza and talk about making them. It was the first time I had watched other people play my game, and I came away with a very different picture of how it was working. Systems I could move through quite comfortably were stopping people before they had a chance to enjoy what they could build.

They could equip an Artefact, allocate a Talent and open Crafting, but they often couldn't explain what their next choice would do. I knew which Power Core, Augment, Stat or Talent had contributed to a result, so I could read the information on screen and assemble the answer in my head. Watching someone else struggle through it showed me how much knowledge I had been supplying on the interface's behalf.

After I helped people through those initial hurdles, a Shotgun and Siege combination exposed another problem. Several pellets could connect at once, advancing Talent counters and producing extra attacks and Fields, until a busy encounter could drop below one frame per second. The build was doing the interesting things I had designed it to do, and the game was struggling to keep up with it.

I initially treated the confusing screens and the stuttering combat as separate jobs to take home. As I worked through them, I kept finding behaviour attached at the wrong level. The complete Skill was being explained inside a screen responsible for gear, while Talent reactions were being attached around individual Skill activations when they belonged to the active Talent. Both problems had grown around the same part of the game without keeping those responsibilities clear.

## Following the Skill through the build

An Artefact provides a Skill, but the Skill the player actually uses is shaped by their Power Core, Augments, Talents and Stats. I had pushed too much of that combined explanation into Inventory, as though it were another set of properties to inspect on the item. Equipping gear, comparing it and understanding the resulting Skill were competing for space in the same screen.

Adding information had made the problem worse. The player could see plenty of relevant values without being able to tell what came from the item, what came from the rest of the build or how the result would behave. A comparison showing that a number had increased didn't explain the consequences of changing the Skill itself, and I was repeatedly helping people make connections the interface should have made understandable.

![Before the redesign: the playtest HUD and Inventory with overlapping panels and dense item information](/images/devlog/14-playtest/pre-playtest-hud-inventory.jpg)

*Before the redesign: the HUD and Inventory from the playtest build, with gear, Skill details and debug information competing for space.*

The combat problem sent me through the same relationship from another direction. Projectile count was an obvious suspect when the screen was full of pellets and effects, but I wanted to understand the work each hit caused before reducing the attacks. Those were the combinations I wanted people to discover, so making them smaller would have changed the build before I had explained the slowdown.

Tracing the reactions revealed listeners attached at the wrong level. They were following Skill activations, and later activations from other Skills were involving reactions that should have remained tied to the relevant Talent. A simple attack barely exposed the misplaced work, while Shotgun contacts and Siege effects gave it repeated opportunities to accumulate.

Seeing those two placements together helped me make sense of what I had watched at the meetup. Inventory was being asked to explain a complete Skill through the item supplying it, and individual activations were carrying reaction work that belonged to an ongoing Talent. I had allowed each of those smaller contexts to become responsible for too much.

## Giving each part a clearer job

I went back through the architecture to separate the ongoing Talent behaviour from the attacks using it. A Talent counter needs to retain its own progress across qualifying attacks, while a reaction belonging to one attack needs to finish with that attack. New Skill activations shouldn't keep establishing or advancing unrelated Talent reactions.

The repair took care because the attacks still needed their correct weapon, target and Power context. Early corrections could quiet the system while making a follow-up effect behave incorrectly, which would have defeated the purpose of supporting those combinations. Working back from the intended responsibilities let me correct the listener placement and keep the pellets, counters, triggered attacks and Fields that made the build interesting.

The UI needed its own separation around the assembled Skill. Inventory could concentrate on gear, equipment changes and item comparison, with a dedicated Skills screen explaining what the equipped Skill currently does after the build's contributions have been applied. That gave the detailed information somewhere appropriate to live instead of continuing to pack it into equipment inspection.

I used the Skills screen concept below as the reference for that split. The loadout and selected Skill can be understood together, with its Artefact, Power Core, Augments, behaviour and resolved values presented in one place. The aim is for the player to understand the Skill they will use in combat without having to reconstruct it from several unrelated parts of Inventory.

![Concept reference for a dedicated Skills screen showing the Skill loadout and detailed effects](/images/devlog/14-playtest/concept-skills.webp)

*Skills screen concept used as a reference for separating gear management from detailed Skill information.*

![Post-playtest Skills screen showing the loadout, selected Skill details and Power Core selection](/images/devlog/14-playtest/post-playtest-skills.jpg)

*Current implementation: the separate Skills screen brings the loadout, Skill description, Power Core choices and resolved effects together.*

Once those jobs were clearer, the rest of the interface work had a direction. I rebuilt Inventory around recognisable equipment groups, larger item artwork and a clearer inspection area. I could then judge each piece of information against the decision being made there, instead of treating another visible value as an improvement by itself.

That review carried through to Talents, Crafting and the HUD. Talent nodes could stay compact while the selected Talent explained its effect in context; Crafting needed the item, proposed result and costs together before commitment. During combat, the HUD needed Resources, actions and temporary states to be readable while the Character was moving. Each screen had a different job, with the same requirement to explain the state supplied by the game.

![HUD concept showing Resources, combat actions, the minimap and objectives](/images/devlog/14-playtest/concept-hud.webp)

*HUD concept used to guide the redesign, with Resource, Skill and objective information arranged around the combat view.*

![Post-playtest HUD with revised Inventory and Drone inspection panels](/images/devlog/14-playtest/post-playtest-hud-inventory.jpg)

*Current implementation: revised Inventory and Drone inspection alongside the updated HUD.*

I also needed a practical way to carry those decisions across the screens, which grew into 62 reusable UI components and a runtime gallery for reviewing their states and variants. That gave recurring problems a shared correction point. A clipped value or unclear selection could be addressed in the pattern that produced it, and I could inspect dense compositions before spreading the same mistake across another screen.

## Taking it back to players

The work has taken longer than I wanted, partly because each correction has exposed another assumption I had been making while testing on my own. Some visual choices I liked became exhausting when repeated across a screen, and some information I considered obvious depended on knowing how the game had been built. Watching people encounter those assumptions was uncomfortable, but it gave me specific decisions to reconsider.

The listener repairs made the work around the busy build smaller and more predictable while keeping its intended behaviour. The screens have improved too, although I'm still working through the redesign. Separating gear management from Skill inspection has given that work a clearer purpose, and the shared components make the next round of changes easier to carry through consistently.

I went to the meetup to see people play Starforged, and I found out how often they needed me beside them to explain it. The next playtest is a chance to see whether I've reduced that dependence: whether someone can understand what a build choice will do, make it for themselves and then enjoy the combination they put together when the fight gets busy.
