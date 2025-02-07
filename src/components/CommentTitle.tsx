import React from 'react';
import useMarkdownToHtml from "../hooks/use-markdown";

interface CommentTitleProps {
  title?: string | null;
  comment_text?: string | null;
}

const CommentTitle: React.FC<CommentTitleProps> = ({ title, comment_text }) => {
  const { html, loading, error } = useMarkdownToHtml(comment_text);

  if (title) {
    return <>{title}</>;
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}
      {comment_text && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </>
  );
};

export default CommentTitle;
