import React from "react";

/** Render markdown-style **bold** and _italic_ inside a string. */
export function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let key = 0;
  const regex = /(\*\*[^*]+\*\*|_[^_]+_)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      parts.push(
        <span className="oc-lede-em" key={key++}>
          {token.slice(1, -1)}
        </span>
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
