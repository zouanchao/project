interface OutlineItem {
  id: string;
  title: string;
  level: number;
  lineNumber?: number;
}

export function parseOutlineFromMarkdown(content: string): OutlineItem[] {
  const lines = content.split('\n');
  const outline: OutlineItem[] = [];
  let currentId = 0;

  lines.forEach((line, index) => {
    // Match headers (# Header)
    const headerMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length - 1; // Convert ## to level 1
      const title = headerMatch[2].trim();
      outline.push({
        id: `header-${currentId++}`,
        title,
        level,
        lineNumber: index + 1
      });
      return;
    }
    
    // Match list items (- Item) as level 3 content
    const listMatch = line.match(/^(\s*)-\s+(.+)$/);
    if (listMatch) {
      const title = listMatch[2].trim();
      outline.push({
        id: `item-${currentId++}`,
        title,
        level: 3,
        lineNumber: index + 1
      });
    }
  });

  return outline;
}