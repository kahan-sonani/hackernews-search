import { useState, useEffect } from 'react';
import Comment from './Comment';
import type { Post } from '../types/post';

interface PostDetailProps {
  postId: string;
  onBack: () => void;
}

function PostDetail({ postId, onBack }: PostDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://hn.algolia.com/api/v1/items/${postId}`);
        const data = await response.json() as Post;
        setPost(data);
      } catch (err: any) {
        setError(err as Error);
        console.error('Error fetching post details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
    <div className="fullscreen-loading-container">
      <div className="loading-spinner">
        <div className="spinner-inner"></div>
      </div>
      <p>Loading...</p>
    </div>
    )
  }

  if (error) {
    return <div className="post-detail">Error: {error.message}</div>;
  }

  if (!post) {
    return <div className="post-detail">Post not found.</div>;
  }

  return (
    <div className="post-detail">
      <button onClick={onBack}>Back to Search</button>
      <h2>{post.title || post.story_title}</h2>
      <p>Points: {post.points}</p>
      <h3>Comments:</h3>
      {post.children && post.children.length > 0 ? (
        <ul className="comments">
          {post.children.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <p>No comments.</p>
      )}
    </div>
  );
}

export default PostDetail;
