import { useState, useCallback, ChangeEvent } from 'react';

interface Filters {
  tags: string;
  numericFilters: string;
}

interface FilterComponentProps {
  onFilterChange: (filters: Partial<Filters>) => void;
  filters: Filters;
}

function PostFilters({ onFilterChange, filters }: FilterComponentProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTag = event.target.value;
    setLocalFilters(prev => ({ ...prev, tags: newTag }));
  };

  const handleNumericFiltersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalFilters(prev => ({ ...prev, numericFilters: newValue }));
  };

  const handleApplyFilters = useCallback(() => {
    onFilterChange(localFilters);
  }, [localFilters, onFilterChange]);

  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="tags" className="filter-label">Tags:</label>
        <div className="select-wrapper">
          <select id="tags" value={localFilters.tags} onChange={handleTagChange} className="filter-select">
            <option value="story">Story</option>
            <option value="comment">Comment</option>
            <option value="poll">Poll</option>
            <option value="pollopt">PollOpt</option>
            <option value="show_hn">Show HN</option>
            <option value="ask_hn">Ask HN</option>
            <option value="front_page">Front Page</option>
          </select>
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="numericFilters" className="filter-label">Numeric Filters:</label>
        <input
          type="text"
          id="numericFilters"
          value={localFilters.numericFilters}
          onChange={handleNumericFiltersChange}
          className="filter-input"
        />
      </div>

      <button onClick={handleApplyFilters} className="filter-button">Apply Filters</button>
    </div>
  );
}

export default PostFilters;