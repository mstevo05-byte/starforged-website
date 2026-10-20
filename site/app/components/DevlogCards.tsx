import { formatArticleDate, type DevlogArticle } from '../../lib/devlog';

export default function DevlogCards({ posts }: { posts: DevlogArticle[] }) {
  return (
    <div className='devlog-post-grid'>
      {posts.map((post) => (
        <article className='devlog-post-card' key={post.slug}>
          <a href={'/devlog/' + post.slug + '/'} aria-label={'Read ' + post.title}>
            <img src={post.hero_image} alt='' loading='lazy' />
          </a>
          <div className='devlog-post-copy'>
            <p className='section-number'><time dateTime={post.date}>{formatArticleDate(post.date)}</time>{post.status === 'draft' ? ' / DRAFT PREVIEW' : ''}</p>
            <h3><a href={'/devlog/' + post.slug + '/'}>{post.title}</a></h3>
            <p>{post.summary}</p>
            {post.tags.length ? <ul className='article-tags' aria-label='System tags'>{post.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
            <a className='devlog-scroll-link' href={'/devlog/' + post.slug + '/'}>READ DEVLOG <b aria-hidden='true'>&#8594;</b></a>
          </div>
        </article>
      ))}
    </div>
  );
}
