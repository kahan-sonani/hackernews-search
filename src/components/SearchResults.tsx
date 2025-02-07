import { useCallback } from 'react';
import type { SearchHit } from "../types/post";
import CommentTitle from './CommentTitle';

interface SearchResultsProps {
  results: SearchHit[];
  onSelectPost: (objectId: string) => void;
}

function SearchResults({ results, onSelectPost }: SearchResultsProps) {

  const handleOpenPost = (result: SearchHit) => {
    if (!result.comment_text) {
      onSelectPost(result.objectID)
    }
  }

  const renderResultItem = useCallback((result: SearchHit) => {
    return (
      <li key={result.objectID} className="search-result-item" onClick={() => handleOpenPost(result)}>
        <div className="result-header">
          <CommentTitle title={result.title} comment_text={result.comment_text} />
          <a target="_blank" onClick={(e) => e.stopPropagation()} href={result.url}>
            {result.url &&
              <svg color="gray" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961"/>
              </svg>
            }
          </a>
        </div>
        <div className="result-details">
          <span className="author">{result.comment_text && 'commented '} by {result.author}</span>
          {result.points && <span><strong>{result.points}</strong> points</span>}
          {result.num_comments && <span><strong>{result.num_comments}</strong> comments</span>}
        </div>
      </li>
    );
  }, [onSelectPost]);

  return (
    <ul className="search-results">
      {results.map(renderResultItem)}
    </ul>
  );
}

export default SearchResults;
