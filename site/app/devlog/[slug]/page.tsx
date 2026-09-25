import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DevlogFooter, DevlogHeader } from '../../components/DevlogChrome';
import MarkdownArticle from '../../components/MarkdownArticle';
import {
  formatDevlogDate,
  getDevlogStaticSlugs,
  getVisibleDevlogArticle,
} from '../../../lib/devlog';
import { DEVLOG_GROUPS, findDevlogTopic } from '../../../lib/devlog-navigation';

type DevlogPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getDevlogStaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DevlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getVisibleDevlogArticle(slug);
  if (article) {
    return {
      title: article.title + ' | Starforged Ascendant Devlog',
      description: article.summary,
      robots: article.status === 'draft' ? { index: false, follow: false } : undefined,
    };
  }

  const topicEntry = findDevlogTopic(slug);
  if (!topicEntry) return {};
  return {
    title: topicEntry.topic.title + ' | Starforged Ascendant Devlog',
    description: 'A Starforged Ascendant Devlog about ' + topicEntry.topic.title + ' is coming soon.',
  };
}

export default async function DevlogPage({ params }: DevlogPageProps) {
  const { slug } = await params;
  const article = getVisibleDevlogArticle(slug);
  if (article) {
    const configuredTopic = findDevlogTopic(slug);
    const articleGroup = configuredTopic?.group ?? DEVLOG_GROUPS.find((group) => group.key === article.category);

    return (
      <main className='devlog-page devlog-article-page' id='top'>
        <DevlogHeader />

        <article>
          <header className='devlog-article-hero'>
            {article.heroImage ? <img className='devlog-article-hero-image' src={article.heroImage} alt='' fetchPriority='high' /> : null}
            <div className='devlog-article-hero-shade' />
            <div className='devlog-article-hero-copy page-shell'>
              <Link className='devlog-breadcrumb' href='/devlog/'>&#8592; ALL DEVLOGS</Link>
              <p className='section-number light'>DEVLOG {article.number ?? '01'} / {articleGroup?.title ?? 'DEVELOPMENT'}</p>
              <h1>{article.title}</h1>
              <p className='devlog-article-summary'>{article.summary}</p>
              <time dateTime={article.date}>{formatDevlogDate(article.date)}</time>
            </div>
          </header>

          <div className='devlog-article-layout page-shell'>
            <aside className='devlog-article-rail' aria-label='Article details'>
              <span>DEVLOG</span>
              <strong>{article.number ?? '01'}</strong>
              <i />
              <span>{articleGroup?.title ?? 'Development'}</span>
            </aside>
            <MarkdownArticle source={article.body} />
          </div>

          <footer className='devlog-article-end page-shell'>
            <p className='section-number'>CONTINUE EXPLORING</p>
            <h2>More from the Devlog.</h2>
            <Link className='button button-dark' href='/devlog/'>VIEW ALL TOPICS <b aria-hidden='true'>&#8594;</b></Link>
          </footer>
        </article>

        <DevlogFooter />
      </main>
    );
  }

  const topicEntry = findDevlogTopic(slug);
  if (!topicEntry) notFound();

  return (
    <main className='devlog-page devlog-coming-soon-page' id='top'>
      <DevlogHeader />
      <section className='devlog-coming-soon'>
        <div className='devlog-coming-grid' aria-hidden='true' />
        <div className='page-shell'>
          <Link className='devlog-breadcrumb' href='/devlog/'>&#8592; ALL DEVLOGS</Link>
          <p className='section-number light'>{topicEntry.group.title} / DEVLOG</p>
          <span className='devlog-coming-label'>DEVLOG COMING SOON</span>
          <h1>{topicEntry.topic.title}</h1>
          <p>This topic does not have a published Devlog yet. Explore the directory for the articles currently available.</p>
          <Link className='button button-primary' href='/devlog/'>VIEW DEVLOG DIRECTORY <b aria-hidden='true'>&#8594;</b></Link>
        </div>
      </section>
      <DevlogFooter />
    </main>
  );
}
