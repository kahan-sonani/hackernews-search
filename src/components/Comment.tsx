import { getReadableDate } from '../utils/date';
import useMarkdownToHtml from '../hooks/use-markdown';
import type { Comment } from '../types/post';

interface CommentProps {
  comment: Comment
}

function Comment({ comment }: CommentProps) {
  const formattedDate = getReadableDate(comment.created_at);
  const { html, loading, error } = useMarkdownToHtml(comment.text);

  const isValidComment = (child: any): child is CommentProps['comment'] => {
    return child && typeof child.id === 'number';
  };

  return (
    <li className="comment">
      <div className="comment-header">
        {comment.author && <span className="author">{comment.author}</span>}
        <span className="comment-date">{formattedDate}</span>
        {comment.points !== null && (
          <span className="points">{comment.points} points</span>
        )}
      </div>
      {comment.text ? (
        <>
        {loading && <p>Loading...</p>}
        {error && <p className="error">Error: {error.message}</p>}
        <div className="comment-text" dangerouslySetInnerHTML={{ __html: html }} />
        </>
      ) : (
        <p className="no-content">[No comment text]</p>
      )}
      {comment.children && comment.children.length > 0 && (
        <ul className="nested-comments">
          {comment.children
            .filter(isValidComment)
            .map(child => (
              <Comment key={child.id} comment={child} />
            ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
