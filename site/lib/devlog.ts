import fs from 'node:fs';
import path from 'node:path';
import { getVisibleSystemArticle, getSystemStaticSlugs } from './game-systems';
import { LEGACY_TOPICS } from './legacy-topics';
import { parsePostFrontmatter } from './frontmatter';

export type DevlogArticle = {
  date: string;
  title: string;
  slug: string;
  summary: string;
  status: 'published' | 'draft';
  tags: string[];
  hero_image: string;
  related_systems: string[];
  body: string;
};

const contentDirectory = path.join(process.cwd(), 'content', 'devlog');

function readPost(fileName: string): DevlogArticle {
  const { attributes, body } = parsePostFrontmatter(fs.readFileSync(path.join(contentDirectory, fileName), 'utf8'));
  const stringField = (key: string) => {
    const value = attributes[key];
    if (typeof value !== 'string' || !value.trim()) throw new Error(fileName + ' needs a non-empty ' + key + ' field.');
    return value;
  };
  const listField = (key: string) => {
    const value = attributes[key];
    if (!Array.isArray(value) || value.some((item) => !item.trim())) throw new Error(fileName + ' needs a string list for ' + key + '.');
    return [...new Set(value)];
  };
  const date = stringField('date');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
    throw new Error(fileName + ' needs a valid YYYY-MM-DD publication date.');
  }
  const slug = stringField('slug');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(fileName + ' needs a lowercase URL slug.');
  const status = stringField('status');
  if (status !== 'draft' && status !== 'published') throw new Error(fileName + ' status must be draft or published.');
  const hero_image = stringField('hero_image');
  // Only web assets already supplied to the public site can be used as heroes.
  if (!hero_image.startsWith('/images/') || hero_image.split('/').includes('..') || !fs.existsSync(path.join(process.cwd(), 'public', hero_image))) {
    throw new Error(fileName + ' hero_image must reference an existing public /images/ asset.');
  }
  const related_systems = listField('related_systems');
  for (const systemSlug of related_systems) {
    const system = getVisibleSystemArticle(systemSlug);
    if (!system || (status === 'published' && system.status !== 'published')) {
      throw new Error(fileName + ' references an unavailable system: ' + systemSlug);
    }
  }
  const title = stringField('title');
  return {
    date, title, slug, summary: stringField('summary'), status,
    tags: listField('tags'), hero_image, related_systems,
    body: body.startsWith('# ' + title + '\n') ? body.slice(title.length + 3).trim() : body,
  };
}

export function getVisibleDevlogArticles() {
  if (!fs.existsSync(contentDirectory)) return [];
  const posts = fs.readdirSync(contentDirectory).filter((name) => name.endsWith('.md')).map(readPost);
  const reserved = new Set([...getSystemStaticSlugs(), ...LEGACY_TOPICS.map((topic) => topic.slug)]);
  for (const post of posts) {
    if (reserved.has(post.slug)) throw new Error('Duplicate or reserved Devlog slug: ' + post.slug);
    reserved.add(post.slug);
  }
  return posts
    .filter((post) => post.status === 'published' || (post.status === 'draft' && process.env.NODE_ENV !== 'production'))
    .sort((first, second) => second.date.localeCompare(first.date) || first.slug.localeCompare(second.slug));
}

export function getVisibleDevlogArticle(slug: string) {
  return getVisibleDevlogArticles().find((post) => post.slug === slug);
}

export function getRelatedDevlogs(systemSlug: string) {
  return getVisibleDevlogArticles().filter((post) => post.related_systems.includes(systemSlug));
}

export { formatArticleDate } from './game-systems';
