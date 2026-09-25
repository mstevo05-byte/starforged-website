import fs from 'node:fs';
import path from 'node:path';
import { DEVLOG_GROUPS } from './devlog-navigation';

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

function readArticle(filePath: string): DevlogArticle {
  const { attributes, body } = parseFrontmatter(fs.readFileSync(filePath, 'utf8'));
  const requiredFields = ['title', 'slug', 'date', 'summary', 'category', 'status'] as const;

  for (const field of requiredFields) {
    if (!attributes[field]) {
      throw new Error(path.basename(filePath) + ' is missing the ' + field + ' frontmatter field.');
    }
  }

  return {
    title: attributes.title,
    slug: attributes.slug,
    date: attributes.date,
    summary: attributes.summary,
    category: attributes.category,
    status: attributes.status,
    number: attributes.number,
    heroImage: attributes.hero_image,
    body,
  };
}

function getDevlogArticles() {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => readArticle(path.join(contentDirectory, fileName)))
    .sort((first, second) => second.date.localeCompare(first.date));
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
    const configuredSlugs = new Set(group.topics.map((topic) => topic.slug));
    const entries: DevlogDirectoryEntry[] = group.topics.map((topic) => {
      const article = articles.find((candidate) => candidate.slug === topic.slug);
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
      if (article.category !== group.key) continue;
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
  const slugs = new Set(DEVLOG_GROUPS.flatMap((group) => group.topics.map((topic) => topic.slug)));
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
