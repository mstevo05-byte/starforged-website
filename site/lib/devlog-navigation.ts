export type DevlogTopic = {
  title: string;
  slug: string;
  articleSlug?: string;
};

export type DevlogGroup = {
  key: string;
  title: string;
  topics: readonly DevlogTopic[];
};

export const DEVLOG_GROUPS: readonly DevlogGroup[] = [
  {
    key: 'start-here',
    title: 'Start Here',
    topics: [
      { title: 'What is Starforged Ascendant?', slug: 'what-is-starforged-ascendant' },
      { title: 'Current State', slug: 'current-state' },
    ],
  },
  {
    key: 'gameplay',
    title: 'Gameplay',
    topics: [
      { title: 'Missions', slug: 'missions', articleSlug: 'inside-a-mission' },
      { title: 'Combat', slug: 'combat', articleSlug: 'how-combat-works-in-starforged-ascendant' },
      { title: 'Progression', slug: 'progression', articleSlug: 'progression-through-missions' },
    ],
  },
  {
    key: 'buildcraft',
    title: 'Buildcraft',
    topics: [
      { title: 'How Artefacts Shape Your Combat Kit', slug: 'how-artefacts-shape-your-combat-kit' },
      { title: 'Power Cores', slug: 'power-cores', articleSlug: 'power-cores-change-your-skills' },
      { title: 'Talents', slug: 'talents', articleSlug: '21-talent-trees-one-character' },
      { title: 'Crafting', slug: 'crafting', articleSlug: 'crafting-the-items-you-want-to-keep' },
      { title: 'Augments', slug: 'augments', articleSlug: 'augments-make-skills-behave-differently' },
      { title: 'Builds', slug: 'builds', articleSlug: 'building-a-complete-character' },
    ],
  },
  {
    key: 'character-and-drone',
    title: 'Character & Drone',
    topics: [
      { title: 'Character', slug: 'character', articleSlug: 'building-your-character-through-stats' },
      { title: 'Drone', slug: 'drone', articleSlug: 'your-drone-is-part-of-your-build' },
      { title: 'Merge', slug: 'merge', articleSlug: 'merge-when-character-and-drone-become-one' },
    ],
  },
  {
    key: 'the-galaxy',
    title: 'The Galaxy',
    topics: [
      { title: 'Factions', slug: 'factions' },
      { title: 'Strategic Layer', slug: 'strategic-layer' },
      { title: 'Bases', slug: 'bases' },
      { title: 'Living World', slug: 'living-world' },
    ],
  },
  {
    key: 'development',
    title: 'Development',
    topics: [
      { title: 'Milestones', slug: 'milestones' },
      { title: 'Production', slug: 'production' },
      { title: 'Visual Development', slug: 'visual-development' },
    ],
  },
] as const;

export function findDevlogTopic(slug: string) {
  for (const group of DEVLOG_GROUPS) {
    const topic = group.topics.find((entry) => entry.slug === slug || entry.articleSlug === slug);
    if (topic) return { group, topic };
  }

  return undefined;
}

export function findDevlogGroupByCategory(category: string) {
  const groupKey = category === 'character-drone' ? 'character-and-drone' : category;
  return DEVLOG_GROUPS.find((group) => group.key === groupKey);
}
