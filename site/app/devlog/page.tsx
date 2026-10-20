import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';
import DevlogCards from '../components/DevlogCards';
import { getVisibleDevlogArticles } from '../../lib/devlog';

export const metadata: Metadata = {
  title: 'Devlog | Starforged Ascendant',
  description: 'Chronological development updates: implementation work, problems, decisions, outcomes and remaining work on Starforged Ascendant.',
};

export default function DevlogIndex() {
  const posts = getVisibleDevlogArticles();
  return (
    <main className='devlog-page' id='top'>
      <SiteHeader section='devlog' />
      <section className='devlog-index-hero'>
        <div className='page-shell'>
          <p className='section-number light'>STARFORGED ASCENDANT / DEVLOG</p>
          <h1>Building the<br /><span>Galaxy.</span></h1>
          <p>Follow development as it happens: the work, the problems, the decisions and what comes next. Newest posts appear first.</p>
          <a className='devlog-scroll-link' href='#devlog-directory'>READ DEVELOPMENT UPDATES <b aria-hidden='true'>&#8595;</b></a>
        </div>
      </section>
      <section className='devlog-directory' id='devlog-directory' aria-labelledby='development-updates-title'>
        <div className='devlog-directory-intro page-shell'>
          <p className='section-number light'>DEVELOPMENT UPDATES</p>
          <h2 id='development-updates-title'>The latest work.</h2>
          <p>Looking for explanations of how the game works? Explore <Link href='/game-systems/'>Game Systems</Link>.</p>
        </div>
        <div className='page-shell'>
          {posts.length ? <DevlogCards posts={posts} /> : (
            <div className='content-empty'>
              <h3>No development posts published yet.</h3>
              <p>Future Devlogs will cover implementation work, problems, decisions, outcomes and remaining work.</p>
              <Link className='button button-primary' href='/game-systems/'>EXPLORE GAME SYSTEMS <b aria-hidden='true'>&#8594;</b></Link>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
