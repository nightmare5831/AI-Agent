import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className="text-black dark:text-white"
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
