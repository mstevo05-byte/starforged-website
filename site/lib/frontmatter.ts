type FrontmatterValue = string | string[];

function scalar(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith('"')) {
    const parsed: unknown = JSON.parse(trimmed);
    if (typeof parsed !== 'string') throw new Error('Expected a quoted string.');
    return parsed;
  }
  if (trimmed.startsWith("'")) {
    if (!trimmed.endsWith("'")) throw new Error('Unclosed frontmatter string.');
    return trimmed.slice(1, -1).replaceAll("''", "'");
  }
  return trimmed;
}

// The authoring format supports scalar fields and inline or block string lists.
export function parsePostFrontmatter(source: string) {
  const normalised = source.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const match = normalised.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) throw new Error('Devlog Markdown must begin with closed frontmatter.');
  const attributes: Record<string, FrontmatterValue> = {};
  let listKey: string | undefined;
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const item = line.match(/^\s+-\s+(.+)$/);
    if (item && listKey && Array.isArray(attributes[listKey])) {
      (attributes[listKey] as string[]).push(scalar(item[1]));
      continue;
    }
    const field = line.match(/^([a-z_]+):\s*(.*?)\s*$/);
    if (!field) throw new Error('Unsupported frontmatter line: ' + line);
    const [, key, value] = field;
    if (key in attributes) throw new Error('Duplicate frontmatter field: ' + key);
    listKey = undefined;
    if (!value) {
      attributes[key] = [];
      listKey = key;
    } else if (value.startsWith('[')) {
      if (!value.endsWith(']')) throw new Error('Unclosed frontmatter list: ' + key);
      const entries: string[] = [];
      let entry = '';
      let quote = '';
      let escaped = false;
      for (const character of value.slice(1, -1)) {
        if (quote) {
          entry += character;
          if (escaped) escaped = false;
          else if (character === '\\' && quote === '"') escaped = true;
          else if (character === quote) quote = '';
        } else if (character === '"' || character === "'") {
          quote = character;
          entry += character;
        } else if (character === ',') {
          entries.push(scalar(entry));
          entry = '';
        } else {
          entry += character;
        }
      }
      if (quote) throw new Error('Unclosed string in frontmatter list: ' + key);
      if (entry.trim()) entries.push(scalar(entry));
      attributes[key] = entries;
    } else {
      attributes[key] = scalar(value);
    }
  }
  return { attributes, body: normalised.slice(match[0].length).trim() };
}
