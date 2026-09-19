import type { ReactNode } from 'react';

function renderInline(source: string): ReactNode[] {
  const tokens = source.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return tokens.filter(Boolean).map((token, index) => {
    const strong = token.match(/^\*\*(.+)\*\*$/);
    if (strong) return <strong key={index}>{strong[1]}</strong>;

    const code = token.match(/^`(.+)`$/);
    if (code) return <code key={index}>{code[1]}</code>;

    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:\/\//.test(link[2]);
      if (external) {
        return <a key={index} href={link[2]} target='_blank' rel='noopener noreferrer'>{link[1]}</a>;
      }
      return <a key={index} href={link[2]}>{link[1]}</a>;
    }

    return token;
  });
}

function isBlockStart(line: string) {
  const patterns = [
    /^(#{1,3})\s+/,
    /^!\[[^\]]*\]\([^)]+\)$/,
    /^>\s?/,
    /^[-*]\s+/,
    /^\d+\.\s+/,
  ];
  return patterns.some((pattern) => pattern.test(line));
}

export default function MarkdownArticle({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      if (level === 1) blocks.push(<h1 key={index}>{renderInline(heading[2])}</h1>);
      if (level === 2) blocks.push(<h2 key={index}>{renderInline(heading[2])}</h2>);
      if (level === 3) blocks.push(<h3 key={index}>{renderInline(heading[2])}</h3>);
      index += 1;
      continue;
    }

    const image = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      blocks.push(
        <figure className='devlog-article-image' key={index}>
          <img src={image[2]} alt={image[1]} loading='lazy' />
        </figure>,
      );
      index += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length) {
        const quoteLine = lines[index].trim();
        if (!/^>\s?/.test(quoteLine)) break;
        quote.push(quoteLine.replace(/^>\s?/, ''));
        index += 1;
      }
      blocks.push(<blockquote key={'quote-' + index}>{renderInline(quote.join(' '))}</blockquote>);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length) {
        const itemLine = lines[index].trim();
        if (!/^[-*]\s+/.test(itemLine)) break;
        items.push(itemLine.replace(/^[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ul key={'list-' + index}>
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length) {
        const itemLine = lines[index].trim();
        if (!/^\d+\.\s+/.test(itemLine)) break;
        items.push(itemLine.replace(/^\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push(
        <ol key={'list-' + index}>
          {items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item)}</li>)}
        </ol>,
      );
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const paragraphLine = lines[index].trim();
      if (!paragraphLine) break;
      if (isBlockStart(paragraphLine)) break;
      paragraph.push(paragraphLine);
      index += 1;
    }
    blocks.push(<p key={'paragraph-' + index}>{renderInline(paragraph.join(' '))}</p>);
  }

  return <div className='devlog-prose'>{blocks}</div>;
}
