import { useState, useCallback } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import type { SearchHit } from '../types/post';

interface SearchProps {
  onSelectPost: (objectId: string) => void;
}

interface SearchState {
  hits: SearchHit[];
  page: number;
  nbPages: number;
  hitsPerPage: number;
}

function Search({ onSelectPost }: SearchProps) {
  const [searchResults, setSearchResults] = useState<SearchState>({
    hits: [],
    page: 0,
    nbPages: 0,
    hitsPerPage: 20
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');

  const fetchSearchResults = useCallback(async (query: string, page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `http://hn.algolia.com/api/v1/search?query=${query}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setSearchResults({
        hits: data.hits,
        page: data.page,
        nbPages: data.nbPages,
        hitsPerPage: data.hitsPerPage
      });
    } catch (err: any) {
      console.error('Error fetching search results:', err);
      setError(err as Error);
      setSearchResults(prev => ({ ...prev, hits: [] }));
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    setCurrentQuery(query);
    await fetchSearchResults(query, 0);
  }, [fetchSearchResults]);

  const handlePageChange = useCallback(async (newPage: number) => {
    if (currentQuery) {
      await fetchSearchResults(currentQuery, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuery, fetchSearchResults]);

  return (
    <div className="search-container">
      <SearchBar onSearch={handleSearch} />
      
      {loading && (
        <div className="fullscreen-loading-container">
          <div className="loading-spinner">
            <div className="spinner-inner"></div>
          </div>
          <p>Searching...</p>
        </div>
      )}
      <>
        {error ? (
          <div className="error-message">
            Error: {error.message}
          </div>
        ) : (
          <>
            {searchResults.hits.length > 0 && (
              <>
                <SearchResults
                  results={searchResults.hits} 
                  onSelectPost={onSelectPost} 
                />
                
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(searchResults.page - 1)}
                    disabled={searchResults.page === 0}
                    className="pagination-button"
                  >
                    ← Previous
                  </button>
                  
                  <span className="pagination-info">
                    Page {searchResults.page + 1} of {searchResults.nbPages}
                  </span>
                  
                  <button
                    onClick={() => handlePageChange(searchResults.page + 1)}
                    disabled={searchResults.page >= searchResults.nbPages - 1}
                    className="pagination-button"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
            
            {!loading && searchResults.hits.length === 0 && currentQuery && (
              <div className="no-results">
                No results found for "{currentQuery}"
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default Search;
