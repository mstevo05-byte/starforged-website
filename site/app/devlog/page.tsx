import type { Metadata } from 'next';
import { DevlogFooter, DevlogHeader } from '../components/DevlogChrome';
import { formatDevlogDate, getDevlogDirectory, getPublishedDevlogArticles } from '../../lib/devlog';

export const metadata: Metadata = {
  title: 'Devlog | Starforged Ascendant',
  description: 'Development articles about the systems, worlds and production of Starforged Ascendant.',
};

export default function DevlogIndex() {
  const articles = getPublishedDevlogArticles();
  const directory = getDevlogDirectory();
  const featured = articles[0];

  return (
    <main className='devlog-page' id='top'>
      <DevlogHeader />

      <section className='devlog-index-hero'>
        <div className='page-shell'>
          <p className='section-number light'>STARFORGED ASCENDANT / DEVLOG</p>
          <h1>Building the<br /><span>Galaxy.</span></h1>
          <p>Development articles about the game, its connected systems and the work taking Starforged Ascendant forward.</p>
          <a className='devlog-scroll-link' href='#devlog-directory'>EXPLORE THE DEVLOG <b aria-hidden='true'>&#8595;</b></a>
        </div>
      </section>

      {featured ? (
        <section className='devlog-featured page-shell' aria-labelledby='featured-devlog-title'>
          <a className='devlog-featured-image' href={'/devlog/' + featured.slug + '/'}>
            {featured.heroImage ? <img src={featured.heroImage} alt='' /> : null}
            <span>DEVLOG {featured.number ?? '01'}</span>
          </a>
          <div className='devlog-featured-copy'>
            <p className='section-number'>LATEST DEVLOG / {formatDevlogDate(featured.date)}</p>
            <h2 id='featured-devlog-title'>{featured.title}</h2>
            <p>{featured.summary}</p>
            <a className='button button-dark' href={'/devlog/' + featured.slug + '/'}>READ DEVLOG <b aria-hidden='true'>&#8594;</b></a>
          </div>
        </section>
      ) : null}

      <section className='devlog-directory' id='devlog-directory'>
        <div className='devlog-directory-intro page-shell'>
          <p className='section-number light'>DEVLOG DIRECTORY</p>
          <h2>Explore by topic.</h2>
          <p>Published articles and the subjects planned for future Devlogs, organised around the game.</p>
        </div>

        <div className='devlog-groups page-shell'>
          {directory.map((group, groupIndex) => (
            <section className='devlog-group' key={group.key} aria-labelledby={'devlog-group-' + group.key}>
              <header>
                <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                <h3 id={'devlog-group-' + group.key}>{group.title}</h3>
              </header>
              <div className='devlog-topic-list'>
                {group.entries.map((entry) => (
                  <a className={entry.published ? 'devlog-topic is-published' : 'devlog-topic'} href={'/devlog/' + entry.slug + '/'} key={entry.slug}>
                    <span className='devlog-topic-status'>{entry.published ? 'PUBLISHED' : 'COMING SOON'}</span>
                    <strong>{entry.title}</strong>
                    <span className='devlog-topic-arrow' aria-hidden='true'>&#8594;</span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <DevlogFooter />
    </main>
  );
}
