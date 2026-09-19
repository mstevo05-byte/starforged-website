export type DevlogTopic = {
  title: string;
  slug: string;
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
      { title: 'Missions', slug: 'missions' },
      { title: 'Combat', slug: 'combat' },
      { title: 'Progression', slug: 'progression' },
    ],
  },
  {
    key: 'buildcraft',
    title: 'Buildcraft',
    topics: [
      { title: 'Artefacts & Skills', slug: 'artefacts-and-skills' },
      { title: 'Power Cores', slug: 'power-cores' },
      { title: 'Talents', slug: 'talents' },
      { title: 'Augments', slug: 'augments' },
      { title: 'Builds', slug: 'builds' },
    ],
  },
  {
    key: 'character-and-drone',
    title: 'Character & Drone',
    topics: [
      { title: 'Character', slug: 'character' },
      { title: 'Drone', slug: 'drone' },
      { title: 'Merge', slug: 'merge' },
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
    const topic = group.topics.find((entry) => entry.slug === slug);
    if (topic) return { group, topic };
  }

  return undefined;
}
