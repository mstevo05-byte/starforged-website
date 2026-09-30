import fs from 'node:fs';
import path from 'node:path';
import { DEVLOG_GROUPS, findDevlogGroupByCategory } from './devlog-navigation';

export type DevlogArticle = {
  title: string;
  slug: string;
  date: string;
  summary: string;
  category: string;
  status: string;
  number?: string;
  heroImage?: string;
  body: string;
};

export type DevlogDirectoryEntry = {
  title: string;
  slug: string;
  summary?: string;
  date?: string;
  status: 'published' | 'draft' | 'upcoming';
};

const contentDirectory = path.join(process.cwd(), 'content', 'devlog');

type DevlogMedia = {
  heroImage?: string;
  imageRoot: string;
  insertions?: readonly { before: string; fileName: string; alt: string }[];
};

function defineDevlogMedia(
  slug: string,
  heroFile: string | undefined,
  insertions: readonly [before: string, fileName: string, alt: string][],
): DevlogMedia {
  const imageRoot = '/images/devlog/' + slug + '/';
  return {
    imageRoot,
    heroImage: heroFile ? imageRoot + heroFile : undefined,
    insertions: insertions.map(([before, fileName, alt]) => ({ before, fileName, alt })),
  };
}

const DEVLOG_MEDIA: Record<string, DevlogMedia> = {
  'power-cores-change-your-skills': defineDevlogMedia('power-cores-change-your-skills', 'sa-devlog-03-power-cores-change-your-skills-01-hero.jpg', [
    ['There are five Power types:', 'sa-devlog-03-power-cores-change-your-skills-02-five-power-families.jpg', 'The five Power Core families in Starforged Ascendant'],
    ['The interesting part comes from combining these effects', 'sa-devlog-03-power-cores-change-your-skills-03-one-skill-different-power.jpg', 'One Skill changed by different Power Core choices'],
    ['Each Artefact can carry its own Power Core', 'sa-devlog-03-power-cores-change-your-skills-04-mixed-power-build.jpg', 'A Character build combining several Power Core families'],
  ]),
  '21-talent-trees-one-character': defineDevlogMedia('21-talent-trees-one-character', 'sa-devlog-04-21-talent-trees-one-character-01-hero.jpg', [
    ['## Five Weapon Trees', 'sa-devlog-04-21-talent-trees-one-character-02-primary-stat-builds.jpg', 'The seven Primary Stat Talent Trees'],
    ['## Five Power Trees', 'sa-devlog-04-21-talent-trees-one-character-03-weapon-armour-paths.jpg', 'Weapon and Armour Talent paths'],
    ['Talent Trees open progressively as points are invested', 'sa-devlog-04-21-talent-trees-one-character-04-power-and-drone-talents.jpg', 'Power and Drone Talent Trees'],
    ['A Rifle Character might invest heavily into Rifles and Reflex', 'sa-devlog-04-21-talent-trees-one-character-05-example-talent-builds.jpg', 'Example combinations drawn from the Talent Trees'],
  ]),
  'crafting-the-items-you-want-to-keep': defineDevlogMedia('crafting-the-items-you-want-to-keep', 'sa-devlog-05-crafting-the-items-you-want-to-keep-01-hero.jpg', [
    ['## From broad rolls to specific outcomes', 'sa-devlog-05-crafting-the-items-you-want-to-keep-02-affix-crafting.jpg', 'Affix crafting from broad rolls to targeted outcomes'],
    ['## Stability', 'sa-devlog-05-crafting-the-items-you-want-to-keep-03-stability.jpg', 'Stability limits the development of crafted items'],
    ['## Power Cores and Augments', 'sa-devlog-05-crafting-the-items-you-want-to-keep-04-item-development.jpg', 'Developing an item through successive crafting choices'],
    ['## Refabrication', 'sa-devlog-05-crafting-the-items-you-want-to-keep-05-absorb-refabricate-missions.jpg', 'Absorb, Refabrication and Mission crafting paths'],
  ]),
  'progression-through-missions': defineDevlogMedia('progression-through-missions', undefined, [
    ['Most Character progression', 'sa-devlog-06-second-set-01-power-node-assault.jpg', 'A Character and Drone assaulting a Power Node'],
    ['EXP earned inside a Mission', 'sa-devlog-06-second-set-02-pending-mission-exp.jpg', 'Pending Mission EXP accumulating during a run'],
    ['## Death and recovery', 'sa-devlog-06-second-set-03-death-and-recovery.jpg', 'Recovering progress after a Character dies during a Mission'],
    ['## Levelling feeds the build', 'sa-devlog-06-second-set-04-character-progression-corrected.jpg', 'Character progression feeding back into the build'],
  ]),
  'your-drone-is-part-of-your-build': defineDevlogMedia('your-drone-is-part-of-your-build', 'sa-devlog-07-your-drone-is-part-of-your-build-01-hero.jpg', [
    ['## Drone Weapons', 'sa-devlog-07-your-drone-is-part-of-your-build-02-drone-weapons.jpg', 'Drone Weapon options for support and offence'],
    ['## Drone Chassis', 'sa-devlog-07-your-drone-is-part-of-your-build-03-drone-chassis.jpg', 'Drone Chassis options that change its combat role'],
    ['## Drone Thrusters', 'sa-devlog-07-your-drone-is-part-of-your-build-04-drone-thrusters.jpg', 'Drone Thruster options for movement and support'],
    ['## Merge', 'sa-devlog-07-your-drone-is-part-of-your-build-05-chassis-to-merge.jpg', 'Each Drone Chassis connects to a different Merge ability'],
  ]),
  'inside-a-mission': defineDevlogMedia('inside-a-mission', 'sa-devlog-08-inside-a-mission-01-hero.jpg', [
    ['The current Mission setup includes', 'sa-devlog-08-inside-a-mission-02-power-core-capture.jpg', 'A Power Core Capture objective inside a Mission'],
    ['## Generated spaces', 'sa-devlog-08-inside-a-mission-03-generated-mission-spaces.jpg', 'Generated Mission spaces shape each encounter'],
    ['## Primary and Secondary Objectives', 'sa-devlog-08-inside-a-mission-04-primary-secondary-objectives.jpg', 'Primary and Secondary Mission Objectives'],
    ['## Infinite scaling', 'sa-devlog-08-inside-a-mission-05-infinite-scaling.jpg', 'Mission Items support infinitely scaling challenges'],
  ]),
  'building-a-complete-character': defineDevlogMedia('building-a-complete-character', 'sa-devlog-09-building-a-complete-character-01-hero.jpg', [
    ['## Start with the Weapon', 'sa-devlog-09-building-a-complete-character-02-kinetic-marksman.jpg', 'A Kinetic Marksman Weapon as the foundation of a build'],
    ['## Add a Power Core', 'sa-devlog-09-building-a-complete-character-03-zero-point-control.jpg', 'Zero Point Power adds control to a ranged build'],
    ['## Shape it with Talents', 'sa-devlog-09-building-a-complete-character-04-talent-drone-integration.jpg', 'Talents and the Drone integrated into a Character build'],
    ['Both Characters use the same ten equipment slots.', 'sa-devlog-09-building-a-complete-character-05-two-complete-builds.jpg', 'Two complete Characters built from the same underlying systems'],
  ]),
  'how-combat-works-in-starforged-ascendant': defineDevlogMedia('how-combat-works-in-starforged-ascendant', 'sa-devlog-10-how-combat-works-in-starforged-ascendant-01-hero.jpg', [
    ['## Hit and Evasion', 'sa-devlog-10-how-combat-works-in-starforged-ascendant-02-hit-evasion-vital.jpg', 'Hit, Evasion and Vital checks in combat'],
    ['## Damage Types and defence', 'sa-devlog-10-how-combat-works-in-starforged-ascendant-03-defensive-layers.jpg', 'The defensive layers that reduce incoming damage'],
    ['## Control and Resolve', 'sa-devlog-10-how-combat-works-in-starforged-ascendant-04-control-and-resolve.jpg', 'Control effects building toward Resolve'],
    ['## Skills and charges', 'sa-devlog-10-how-combat-works-in-starforged-ascendant-05-skill-charges-and-interruptions.jpg', 'Skill charges, recovery and interruptions during combat'],
  ]),
  'augments-make-skills-behave-differently': defineDevlogMedia('augments-make-skills-behave-differently', 'sa-devlog-11-augments-make-skills-behave-differently-01-hero.jpg', [
    ['## Change the projectile', 'sa-devlog-11-augments-make-skills-behave-differently-02-projectile-augments.jpg', 'Projectile Augments change how a Skill travels and spreads'],
    ['Then there are **Bounce** and **Rebound**.', 'sa-devlog-11-augments-make-skills-behave-differently-03-bounce-and-rebound.jpg', 'Bounce and Rebound projectile behaviours'],
    ['## Change the area', 'sa-devlog-11-augments-make-skills-behave-differently-04-field-augments.jpg', 'Field Augments alter the size and behaviour of area Skills'],
    ['## Change the timing', 'sa-devlog-11-augments-make-skills-behave-differently-05-timing-charges-combos.jpg', 'Augments for timing, charges and Skill combinations'],
  ]),
  'building-your-character-through-stats': defineDevlogMedia('building-your-character-through-stats', 'sa-devlog-12-building-your-character-through-stats-01-hero.jpg', [
    ['## Strength', 'sa-devlog-12-building-your-character-through-stats-02-offensive-stats.jpg', 'Primary Stats that support offensive Character builds'],
    ['## Intelligence', 'sa-devlog-12-building-your-character-through-stats-03-defensive-stats.jpg', 'Primary Stats that contribute to defensive layers'],
    ['## Stamina', 'sa-devlog-12-building-your-character-through-stats-04-utility-and-tempo.jpg', 'Stats supporting utility, movement and combat tempo'],
    ['## Trade-offs shape the build', 'sa-devlog-12-building-your-character-through-stats-05-stat-trade-offs.jpg', 'Stat trade-offs shape the strengths of a Character build'],
  ]),
  'merge-when-character-and-drone-become-one': defineDevlogMedia('merge-when-character-and-drone-become-one', 'sa-devlog-13-merge-when-character-and-drone-become-one-01-hero.jpg', [
    ['## Bastion Ascendance', 'sa-devlog-13-merge-when-character-and-drone-become-one-02-bastion-ascendance.jpg', 'Bastion Ascendance reinforces defence and area control'],
    ['## Reconstruction Ascendance', 'sa-devlog-13-merge-when-character-and-drone-become-one-03-reconstruction-ascendance.jpg', 'Reconstruction Ascendance combines recovery and additional Drone presence'],
    ['## Overdrive Relay', 'sa-devlog-13-merge-when-character-and-drone-become-one-04-overdrive-relay.jpg', 'Overdrive Relay accelerates movement and Skill tempo'],
    ['## A major answer, not a fixed role', 'sa-devlog-13-merge-when-character-and-drone-become-one-05-three-merge-answers.jpg', 'Three Merge abilities answer different combat situations'],
  ]),
};

function unquote(value: string) {
  const trimmed = value.trim();
  if (trimmed.length < 2) return trimmed;
  const firstCharacter = trimmed.at(0);
  const lastCharacter = trimmed.at(-1);
  if (firstCharacter !== lastCharacter) return trimmed;
  if (firstCharacter === String.fromCharCode(34)) return trimmed.slice(1, -1);
  if (firstCharacter === String.fromCharCode(39)) return trimmed.slice(1, -1);
  return trimmed;
}

function parseFrontmatter(source: string) {
  const normalised = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  if (!normalised.startsWith('---\n')) {
    throw new Error('Devlog Markdown must begin with frontmatter.');
  }

  const closingDelimiter = normalised.indexOf('\n---\n', 4);
  if (closingDelimiter === -1) {
    throw new Error('Devlog Markdown frontmatter is missing its closing delimiter.');
  }

  const attributes: Record<string, string> = {};
  const frontmatter = normalised.slice(4, closingDelimiter);
  for (const line of frontmatter.split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1);
    attributes[key] = unquote(value);
  }

  return {
    attributes,
    body: normalised.slice(closingDelimiter + 5).trim(),
  };
}

function stripLeadingTitle(body: string, title: string) {
  const lines = body.split('\n');
  if (lines[0]?.trim() === '# ' + title) {
    return lines.slice(1).join('\n').trim();
  }
  return body;
}

function deriveSummary(body: string) {
  const paragraph = body
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#{1,6}|[-*] |\d+\. |>|!\[|\|)/.test(block));

  return (paragraph ?? 'A Starforged Ascendant development article.')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ');
}

function applyDevlogMedia(slug: string, body: string) {
  const media = DEVLOG_MEDIA[slug];
  if (!media?.insertions) return body;

  return media.insertions.reduce((result, insertion) => {
    const image = '![' + insertion.alt + '](' + media.imageRoot + insertion.fileName + ')\n\n';
    return result.replace(insertion.before, image + insertion.before);
  }, body);
}

function readArticle(filePath: string): DevlogArticle {
  const { attributes, body } = parseFrontmatter(fs.readFileSync(filePath, 'utf8'));
  const requiredFields = ['title', 'slug', 'category', 'status'] as const;

  for (const field of requiredFields) {
    if (!attributes[field]) {
      throw new Error(path.basename(filePath) + ' is missing the ' + field + ' frontmatter field.');
    }
  }

  const articleBody = stripLeadingTitle(body, attributes.title);
  const fileNumber = path.basename(filePath).match(/^(\d+)-/)?.[1];
  const media = DEVLOG_MEDIA[attributes.slug];

  return {
    title: attributes.title,
    slug: attributes.slug,
    date: attributes.date ?? '',
    summary: attributes.summary ?? deriveSummary(articleBody),
    category: attributes.category,
    status: attributes.status,
    number: attributes.number ?? fileNumber,
    heroImage: attributes.hero_image ?? media?.heroImage,
    body: applyDevlogMedia(attributes.slug, articleBody),
  };
}

function getDevlogArticles() {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => readArticle(path.join(contentDirectory, fileName)))
    .sort((first, second) => {
      const numberDifference = Number(second.number ?? 0) - Number(first.number ?? 0);
      return numberDifference || second.date.localeCompare(first.date);
    });
}

function includeDrafts() {
  return process.env.NODE_ENV !== 'production' || process.env.STARFORGED_DEVLOG_PREVIEW === '1';
}

export function getVisibleDevlogArticles() {
  return getDevlogArticles().filter(
    (article) => article.status === 'published' || (article.status === 'draft' && includeDrafts()),
  );
}

export function getVisibleDevlogArticle(slug: string) {
  return getVisibleDevlogArticles().find((article) => article.slug === slug);
}

export function getDevlogDirectory() {
  const articles = getVisibleDevlogArticles();

  return DEVLOG_GROUPS.map((group) => {
    const configuredSlugs = new Set(
      group.topics.flatMap((topic) => topic.articleSlug ? [topic.slug, topic.articleSlug] : [topic.slug]),
    );
    const entries: DevlogDirectoryEntry[] = group.topics.map((topic) => {
      const articleSlug = topic.articleSlug ?? topic.slug;
      const article = articles.find((candidate) => candidate.slug === articleSlug);
      return article
        ? {
            title: topic.title,
            slug: article.slug,
            summary: article.summary,
            date: article.date,
            status: article.status === 'draft' ? 'draft' : 'published',
          }
        : { title: topic.title, slug: topic.slug, status: 'upcoming' };
    });

    for (const article of articles) {
      if (findDevlogGroupByCategory(article.category)?.key !== group.key) continue;
      if (configuredSlugs.has(article.slug)) continue;
      entries.push({
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        date: article.date,
        status: article.status === 'draft' ? 'draft' : 'published',
      });
    }

    return { ...group, entries };
  });
}

export function getDevlogStaticSlugs() {
  const slugs = new Set(
    DEVLOG_GROUPS.flatMap((group) => group.topics.map((topic) => topic.articleSlug ?? topic.slug)),
  );
  for (const article of getVisibleDevlogArticles()) slugs.add(article.slug);
  return [...slugs];
}

export function formatDevlogDate(date: string) {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date + 'T00:00:00Z'));
}
