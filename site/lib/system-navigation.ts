export type SystemTopic = { title: string; slug: string; articleSlug?: string };
export type SystemGroup = { key: string; title: string; topics: readonly SystemTopic[] };

export const SYSTEM_GROUPS: readonly SystemGroup[] = [
  { key: 'start-here', title: 'Start Here', topics: [
    { title: 'What is Starforged Ascendant?', slug: 'what-is-starforged-ascendant' },
  ] },
  { key: 'gameplay', title: 'Gameplay', topics: [
    { title: 'Combat', slug: 'combat', articleSlug: 'how-combat-works-in-starforged-ascendant' },
    { title: 'Missions', slug: 'missions', articleSlug: 'inside-a-mission' },
    { title: 'Progression', slug: 'progression', articleSlug: 'progression-through-missions' },
  ] },
  { key: 'buildcraft', title: 'Buildcraft', topics: [
    { title: 'Artefacts and Skills', slug: 'how-artefacts-shape-your-combat-kit' },
    { title: 'Power Cores', slug: 'power-cores', articleSlug: 'power-cores-change-your-skills' },
    { title: 'Talent Trees', slug: 'talents', articleSlug: '21-talent-trees-one-character' },
    { title: 'Augments', slug: 'augments', articleSlug: 'augments-make-skills-behave-differently' },
    { title: 'Crafting', slug: 'crafting', articleSlug: 'crafting-the-items-you-want-to-keep' },
    { title: 'Complete Builds', slug: 'builds', articleSlug: 'building-a-complete-character' },
  ] },
  { key: 'character-and-drone', title: 'Character and Drone', topics: [
    { title: 'Character Stats', slug: 'character', articleSlug: 'building-your-character-through-stats' },
    { title: 'Drone', slug: 'drone', articleSlug: 'your-drone-is-part-of-your-build' },
    { title: 'Merge', slug: 'merge', articleSlug: 'merge-when-character-and-drone-become-one' },
  ] },
];

export function findSystemTopic(slug: string) {
  for (const group of SYSTEM_GROUPS) {
    const topic = group.topics.find((entry) => entry.slug === slug || entry.articleSlug === slug);
    if (topic) return { group, topic };
  }
}

export function findSystemGroupByCategory(category: string) {
  return SYSTEM_GROUPS.find((group) => group.key === (category === 'character-drone' ? 'character-and-drone' : category));
}
