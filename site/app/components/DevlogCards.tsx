import { formatArticleDate, type DevlogArticle } from '../../lib/devlog';

export default function DevlogCards({ posts }: { posts: DevlogArticle[] }) {
  return (
    <div className='devlog-post-grid'>
      {posts.map((post) => (
        <article className='devlog-post-card' key={post.slug}>
          <a className='devlog-post-banner' href={'/devlog/' + post.slug + '/'} aria-labelledby={'devlog-title-' + post.slug}>
            <div className='devlog-post-copy'>
              <p className='section-number'><time dateTime={post.date}>{formatArticleDate(post.date)}</time>{post.status === 'draft' ? ' / DRAFT PREVIEW' : ''}</p>
              <h3 id={'devlog-title-' + post.slug}>{post.title}</h3>
              <p className='devlog-post-summary'>{post.summary}</p>
              {post.tags.length ? <ul className='article-tags' aria-label='System tags'>{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
              <span className='devlog-banner-arrow' aria-hidden='true'>&#8594;</span>
            </div>
            <img src={post.hero_image} alt='' loading='lazy' width='480' height='270' />
          </a>
        </article>
      ))}
    </div>
  );
}
