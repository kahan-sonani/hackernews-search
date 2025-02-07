import { useState } from 'react';
import Search from './components/Search';
import PostDetail from './components/PostDetail';

function App() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleSelectPost = (objectId: string) => {
    setSelectedPostId(objectId);
  };

  const handleBackToSearch = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="app">
      <h1>Hacker News Search</h1>
      {selectedPostId ? (
        <PostDetail postId={selectedPostId} onBack={handleBackToSearch} />
      ) : (
        <Search onSelectPost={handleSelectPost} />
      )}
    </div>
  );
}

export default App;
