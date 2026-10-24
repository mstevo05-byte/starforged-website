---
layout: devlog
title: "Adopting Lyra"
date: 2026-10-10
slug: taking-what-i-needed-from-lyra-without-importing-another-game
summary: "How Lyra saved months of animation work and gave Starforged cleaner locomotion, weapon swaps, jumping, diving, omnidirectional movement and a stronger humanoid foundation for its isometric combat."
status: published
tags: ["Animation", "Locomotion", "Character", "Weapons", "AI", "Unreal Engine"]
related_systems:
  - how-combat-works-in-starforged-ascendant
  - how-artefacts-shape-your-combat-kit
hero_image: /images/devlog/15-lyra/lyra-hero.webp
---

Lyra has saved me months of animation work.

Before bringing it into Starforged, the Character could move and fight, but the presentation was still basic. Every new weapon family threatened to become another isolated animation problem, and actions such as jumping, diving, aiming while moving and swapping weapons all needed a stronger shared foundation.

Lyra gave me that foundation.

The Character now has much cleaner omnidirectional locomotion, starts and stops, jumping, falling, a proper Dive presentation and weapon swaps that belong to the same animation setup. The lower body can continue carrying movement while the upper body aims or fires in another direction, which makes an enormous difference in a top-down action game.

Rifles, Pistols and Shotguns also have clearer physical identities. 
Manny and Quinn provide a consistent humanoid base. 
Selected movement techniques have helped enemy behaviour feel more active.

While the work still needs cleanup and polish, the result has already changed how Starforged feels in motion.

## What I needed from Lyra

Starforged already had its own combat systems, skills decide what can be activated, combat resolves hits and outcomes, stats supplies the Character's values, Artefacts and Inventory own equipment. The Character lifecycle handles entry, death and recovery.

What I needed was a mature presentation layer that could sit on top of those systems to prepare for 3D modelling assistance planned for later this year.

Lyra came with a large, coherent humanoid animation family. It included directional locomotion, starts, stops, crouching, jumping, falling, aim offsets, linked weapon layers, Manny and Quinn skeletons, weapon content and a range of useful action animations.

Building that breadth independently would have consumed months, as a systems thinker, I found the thought of this work unbelievably daunting. 
Using the sample and understanding the boundaries that could be adapted, let me spend a few days auditing the systems and planning the migration, followed by another few days to extract and integrate the assets with the systems & properties I had already built. Within a week I had a mature foundation for Starforged's isometric combat.

## Copying the assets was the beginning

The selected migration inventory eventually covered 605 packages (thanks to Unreal's migration tools, this took about an hour to actually do after the planning).

That included the Skeleton, Manny and Quinn, materials, rigs, poses, linked layers, locomotion families, aim offsets, actions and their supporting dependencies.

The number sounds excessive until you look at how a modern animation setup is assembled. A visible movement can rely on the Character model, Skeleton, animation sequence, linked layer, pose data, curves, transitions and native properties all agreeing with one another.

Copying those packages made the content available, it did not make the content immediately compatible with Starforged.

Lyra is a complete sample game with its own assumptions about equipment, abilities, health, teams, gameplay tags and Character setup. Starforged already had those responsibilities defined.

The job was to preserve the useful presentation while reconnecting it to the game that would actually use it.

## The animation graph expected a contract Starforged did not have

The duplicated animation stack contained 99 authored Property Access paths. Those paths allowed the animation graphs to read movement and presentation data efficiently without rebuilding the same logic in every Blueprint.

They also expected Lyra's native animation parent and the properties supplied by that class.

Starforged did not have that contract, consequently, I built a Starforged-owned compatible animation layer exposing the inputs the adapted graphs actually needed. That included velocity, acceleration, movement mode, grounded state, aim, firing, Dive, melee and the selected equipment presentation.

The existing Property Access paths could then continue doing useful work against a class owned by Starforged. Lyra's Gameplay Ability System (GAS) stayed outside the integration.

The animation reads what Starforged has already decided. It does not determine whether a Skill is valid, whether Energy should be spent or whether an attack causes damage.

That boundary kept the integration manageable and left the gameplay architecture in one place. Importing GAS, would have resulted in a significant blurring of the architectural lines and a complete rework of fundamental systems. 

## One humanoid foundation simplified everything after it

I also had to settle which Skeleton the project would use for this work.

The early option was to force the imported animation family around the older Starforged humanoid setup. The assets looked close enough in lists and previews to make that feel plausible.

Their relationships were not interchangeable.

I selected the Lyra humanoid family as the canonical foundation for the current Character presentation. Manny and Quinn share that Skeleton and the adapted animation architecture.

That decision gave the weapon layers, aim offsets, locomotion and actions one intended foundation. It also made later compatibility decisions far easier to reason about.

I was no longer asking whether each animation could be forced into several almost-compatible arrangements.

I was building one coherent humanoid presentation path for the game.

## The visible payoff is much larger than a new model

The biggest improvement is movement.

The Character can move in every direction while maintaining a useful relationship between facing, aim and locomotion. The legs can carry the movement direction while the torso presents the weapon and target. Starts and stops feel cleaner, and changing direction no longer looks like the whole body is being rotated as one rigid object.

Jumping and falling now belong to the same foundation.

Dive has a proper presentation while Starforged still owns the actual movement, timing, collision and recovery.

Weapon swaps have a physical transition instead of feeling like one object disappeared and another appeared.

Rifle, Pistol and Shotgun presentation use the shared humanoid setup. Siege uses the appropriate heavy hip-fire presentation. Melee and Unarmed movement fit into the same Character architecture.

Aiming also needed to work with Starforged's cursor-driven isometric combat. The presentation follows the world aim point used by the existing input, allowing the upper body to read the target the player is actually pointing at instead of inheriting the fixed camera pitch.

This is the part that made the integration feel worthwhile long before every cleanup item was finished.

## Several bugs only appeared once the content was in the game

At one stage, the player Character could enter the game without the intended animation presentation. Changing the equipped weapon suddenly made everything start working.

The assets were assigned.

The equipment mappings existed.

The presentation was being refreshed at the wrong point in startup.

I changed the setup so the default and restored equipment state were applied after the animation graph was ready. The Character no longer needed an artificial weapon change to wake the presentation up.

Movement exposed another problem.

The animation sequences contained their Distance curves, but the linked layer had lost the name of the curve it was supposed to read. The warnings looked like missing animation data, the data was there, but the connection was wrong.

NPC movement had a related mismatch. The animation expected acceleration-driven path movement while the Character movement setup was feeding it a different form of pathing information.

Restoring the curve binding and enabling the compatible movement input brought those systems back into agreement.

These were both frustrating and useful problems, each failure clarified another part of the contract between the animation and the game. 

## Weapon presentation is becoming part of the build

The animation work also gives equipment choices a stronger physical identity.

A Rifle stance, a Pistol stance and a Shotgun stance should not feel like the same Character holding a different mesh. Their movement, aim and firing presentation help communicate the weapon family before the player reads a tooltip.

The upper and lower body split is especially valuable here. A Character can keep moving through the encounter while the weapon presentation reacts to the target and action.

That makes the combat easier to read from the isometric camera and gives future weapon work a shared foundation.

![Armoured humanoid Characters demonstrating Rifle and Pistol weapon presentation](/images/devlog/15-lyra/lyra-weapons.webp)

*Illustration of Rifle and Pistol presentation, accompanying the discussion of distinct weapon identities.*

## I reused useful AI movement without replacing Starforged's combat rules

The AI work followed the same selective approach. Enemies in combat can now strafe, reposition and move out of dangerous area effects. Those behaviours make them feel like active participants in the fight instead of targets that reach a valid distance and remain there.

Starforged already had substantial AI policies implemented prior to Lyra. Guard, Patrol, Chase and Retreat all provide authored controls for in and out of combat behaviours. I was able to keep these parts of the behaviour structure, while adopting Lyra's Target validity, Skill use, damage and lifecycle to utilise the Starforged systems.

I explored a broader Lyra-derived executor during the integration and kept the current Starforged execution. This decision was determined by the performance impact of having multiple (hopefully hundreds) Lyra AI's making decisions moment to moment in response to player and drone positioning and skill usage. 

## There is still cleanup to do

Some animation transitions need another pass from the final game camera.

Footstep and optional audio presentation still need tidying (I'll add audio into Starforged one day).

A few retained sample references and editor-facing dependencies need to be cleaned up once I am confident they are no longer required.

Additional weapons and Character models will keep testing the foundation.

I expect more issues to appear as the animation is used across a wider range of combat situations. That is normal integration work, and the current setup gives me a much better place to solve it.

The important result is already visible, the Character moves more cleanly, Weapons have a stronger physical identity, aiming works alongside movement, Jumping, diving and swapping equipment belong to one coherent presentation, and importantly, enemies have access to more useful movement behaviour.

Using Lyra has given Starforged a level of animation coverage that would likely never be able to accomplish independently.

10/10 would recommend, check it out here: https://dev.epicgames.com/community/learning/paths/Z4/lyra-starter-game
*Not a paid advertisement*