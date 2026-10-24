import type { Metadata } from 'next';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';
import { getSystemDirectory, getVisibleSystemArticle } from '../../lib/game-systems';

export const metadata: Metadata = {
  title: 'Game Systems | Starforged Ascendant',
  description: 'Explore Combat, Missions, buildcraft, Character Stats and the Drone in Starforged Ascendant.',
};

export default function GameSystemsIndex() {
  const directory = getSystemDirectory();
  const overviewEntry = directory.find((group) => group.key === 'start-here')?.entries[0];
  const overview = overviewEntry ? getVisibleSystemArticle(overviewEntry.slug) : undefined;

  return (
    <main className='devlog-page' id='top'>
      <SiteHeader section='game-systems' />
      <section className='devlog-index-hero'>
        <div className='page-shell'>
          <p className='section-number light'>STARFORGED ASCENDANT / GAME SYSTEMS</p>
          <h1>Explore the<br /><span>Systems.</span></h1>
          <p>Learn how the game works, from Combat and Missions to the systems that shape your Character and Drone.</p>
          <a className='devlog-scroll-link' href='#system-directory'>EXPLORE GAME SYSTEMS <b aria-hidden='true'>&#8595;</b></a>
        </div>
      </section>
      <section className='devlog-directory system-directory' id='system-directory'>
        <div className='system-directory-groups page-shell'>
          {overview ? (
            <a className='system-overview-banner' id='start-here' href={'/devlog/' + overview.slug + '/'} aria-labelledby='system-overview-title'>
              <div className='system-overview-copy'>
                <h2 id='system-overview-title'>{overview.title}</h2>
                <p>{overview.summary}</p>
                <span className='system-overview-arrow' aria-hidden='true'>&#8594;</span>
              </div>
              {overview.heroImage ? <img src={overview.heroImage} alt='' loading='lazy' width='480' height='270' /> : null}
            </a>
          ) : null}
          {directory.filter((group) => group.key !== 'start-here').map((group) => (
            <section className='system-topic-group' key={group.key} id={group.key} aria-labelledby={'system-group-' + group.key}>
              <header>
                <h2 id={'system-group-' + group.key}>{group.title}</h2>
              </header>
              <div className='system-topic-grid'>
                {group.entries.map((entry) => {
                  const article = getVisibleSystemArticle(entry.slug);
                  if (!article) return <div className='devlog-topic' key={entry.slug}><span className='devlog-topic-status'>NO PUBLISHED ARTICLE YET</span><strong>{entry.title}</strong></div>;
                  return (
                    <a className='devlog-topic system-card is-published' href={'/devlog/' + article.slug + '/'} key={entry.slug}>
                      <span className='devlog-topic-status'>{entry.status === 'draft' ? 'DRAFT PREVIEW' : entry.title}</span>
                      <strong>{article.title}</strong>
                      <span className='system-card-summary'>{article.summary}</span>
                      <span className='devlog-topic-arrow' aria-hidden='true'>&#8594;</span>
                    </a>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
