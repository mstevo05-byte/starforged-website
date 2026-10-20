import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';
import { getSystemDirectory, getVisibleSystemArticle } from '../../lib/game-systems';

export const metadata: Metadata = {
  title: 'Game Systems | Starforged Ascendant',
  description: 'Explore Combat, Missions, buildcraft, Character Stats and the Drone in Starforged Ascendant.',
};

export default function GameSystemsIndex() {
  const directory = getSystemDirectory();
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
      <section className='devlog-directory' id='system-directory'>
        <div className='devlog-directory-intro page-shell'>
          <p className='section-number light'>GAME SYSTEMS DIRECTORY</p>
          <h2>Explore by topic.</h2>
          <p>Start with the game overview, then explore the connected systems. Follow implementation work in the <Link href='/devlog/'>Devlog</Link>.</p>
        </div>
        <div className='devlog-groups page-shell'>
          {directory.map((group) => (
            <section className='devlog-group' key={group.key} id={group.key} aria-labelledby={'system-group-' + group.key}>
              <header>
                <span>{group.key === 'start-here' ? 'START HERE' : 'GAME SYSTEMS'}</span>
                <h2 id={'system-group-' + group.key}>{group.title}</h2>
              </header>
              <div className='devlog-topic-list'>
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
