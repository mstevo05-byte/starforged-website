import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter, SiteHeader } from '../../components/SiteChrome';
import MarkdownArticle from '../../components/MarkdownArticle';
import DevlogCards from '../../components/DevlogCards';
import { formatArticleDate, getSystemStaticSlugs, getVisibleSystemArticle } from '../../../lib/game-systems';
import { getRelatedDevlogs, getVisibleDevlogArticles, getVisibleDevlogArticle } from '../../../lib/devlog';
import { findSystemGroupByCategory, findSystemTopic } from '../../../lib/system-navigation';
import { LEGACY_TOPICS } from '../../../lib/legacy-topics';

type ArticlePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return [...new Set([
    ...getSystemStaticSlugs(),
    ...LEGACY_TOPICS.map((topic) => topic.slug),
    ...getVisibleDevlogArticles().map((post) => post.slug),
  ])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = getVisibleSystemArticle(slug);
  const article = system ?? getVisibleDevlogArticle(slug);
  if (article) {
    const title = article.title + ' | Starforged Ascendant ' + (system ? 'Game Systems' : 'Devlog');
    const image = 'heroImage' in article ? article.heroImage : 'hero_image' in article ? article.hero_image : undefined;
    return {
      title, description: article.summary,
      robots: article.status === 'draft' ? { index: false, follow: false } : undefined,
      openGraph: { title, description: article.summary, type: 'article', ...(image ? { images: [{ url: image, alt: article.title }] } : {}) },
      twitter: { card: 'summary_large_image', title, description: article.summary, ...(image ? { images: [image] } : {}) },
    };
  }
  const topic = LEGACY_TOPICS.find((entry) => entry.slug === slug);
  return topic ? { title: topic.title + ' | Starforged Ascendant', description: 'No published article about ' + topic.title + ' yet.' } : {};
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const system = getVisibleSystemArticle(slug);
  const post = system ? undefined : getVisibleDevlogArticle(slug);
  const article = system ?? post;
  if (article) {
    const section = system ? 'game-systems' : 'devlog';
    const label = system ? 'GAME SYSTEMS' : 'DEVLOG';
    const group = system ? findSystemTopic(slug)?.group ?? findSystemGroupByCategory(system.category) : undefined;
    const heroImage = system?.heroImage ?? post?.hero_image;
    const relatedPosts = system ? getRelatedDevlogs(slug) : [];
    const relatedSystems = post?.related_systems.flatMap((systemSlug) => {
      const related = getVisibleSystemArticle(systemSlug);
      return related ? [related] : [];
    }) ?? [];
    return (
      <main className='devlog-page devlog-article-page' id='top'>
        <SiteHeader section={section} />
        <article>
          <header className='devlog-article-hero'>
            {heroImage ? <img className='devlog-article-hero-image' src={heroImage} alt='' fetchPriority='high' /> : null}
            <div className='devlog-article-hero-shade' />
            <div className='devlog-article-hero-copy page-shell'>
              <Link className='devlog-breadcrumb' href={'/' + section + '/'}>&#8592; {system ? 'ALL GAME SYSTEMS' : 'ALL DEVLOGS'}</Link>
              <p className='section-number light'>{label}{group ? ' / ' + group.title : ''}{article.status === 'draft' ? ' / DRAFT PREVIEW' : ''}</p>
              <h1>{article.title}</h1>
              <p className='devlog-article-summary'>{article.summary}</p>
              {article.date ? <time dateTime={article.date}>{formatArticleDate(article.date)}</time> : null}
              {post?.tags.length ? <ul className='article-tags' aria-label='System tags'>{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
            </div>
          </header>
          <div className='devlog-article-layout page-shell'>
            <aside className='devlog-article-rail' aria-label='Article details'>
              <span>{label}</span><i /><span>{group?.title ?? 'Development'}</span>
            </aside>
            <MarkdownArticle source={article.body} />
          </div>
          <footer className='devlog-article-end page-shell'>
            <p className='section-number'>{system ? 'RELATED DEVELOPMENT' : 'RELATED GAME SYSTEMS'}</p>
            <h2>{system ? 'From the Devlog.' : 'Explore the systems.'}</h2>
            {system ? (
              relatedPosts.length ? <DevlogCards posts={relatedPosts} /> : <p>No related development posts published yet.</p>
            ) : (
              relatedSystems.length ? <ul className='related-system-list'>{relatedSystems.map((related) => <li key={related.slug}><Link href={'/devlog/' + related.slug + '/'}>{related.title} <span aria-hidden='true'>&#8594;</span></Link></li>)}</ul> : <p>No related system articles linked to this post yet.</p>
            )}
            <div className='article-end-actions'>
              <Link className='button button-dark' href='/game-systems/'>ALL GAME SYSTEMS <b aria-hidden='true'>&#8594;</b></Link>
              <Link className='button button-dark' href='/devlog/'>ALL DEVLOGS <b aria-hidden='true'>&#8594;</b></Link>
            </div>
          </footer>
        </article>
        <SiteFooter />
      </main>
    );
  }
  const topic = LEGACY_TOPICS.find((entry) => entry.slug === slug);
  if (!topic) notFound();
  return (
    <main className='devlog-page devlog-coming-soon-page' id='top'>
      <SiteHeader section={topic.section} />
      <section className='devlog-coming-soon'>
        <div className='devlog-coming-grid' aria-hidden='true' />
        <div className='page-shell'>
          <Link className='devlog-breadcrumb' href={'/' + topic.section + '/'}>&#8592; {topic.section === 'game-systems' ? 'GAME SYSTEMS' : 'DEVLOG'}</Link>
          <p className='section-number light'>STARFORGED ASCENDANT</p>
          <span className='devlog-coming-label'>NO PUBLISHED ARTICLE YET</span>
          <h1>{topic.title}</h1>
          <p>This topic does not have a published article yet. Explore Game Systems or follow the latest development in the Devlog.</p>
          <div className='article-end-actions'>
            <Link className='button button-primary' href='/game-systems/'>GAME SYSTEMS <b aria-hidden='true'>&#8594;</b></Link>
            <Link className='button button-primary' href='/devlog/'>DEVLOG <b aria-hidden='true'>&#8594;</b></Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
