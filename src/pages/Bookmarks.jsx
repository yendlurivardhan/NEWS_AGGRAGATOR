import React from 'react';
import { useBookmark } from '../components/useBookmark';
import NewsCard from '../components/NewsCard';
import '../styles/Bookmarks.css';
import { Bookmark } from "lucide-react";

const Bookmarks = () => {
  const { bookmarks, removeBookmark } = useBookmark();

  return (
    <div className="bookmarks-page" >
      <div className='Bookmarks-header' >
      <h1 className="bookmark-title">Bookmarked Articles</h1>
      <p className="bookmark-subtitle">Your saved articles for later reading...</p>
      </div>
      {bookmarks && bookmarks.length > 0 ? (
        <div className="bookmarks-grid">
          {bookmarks.map((article, index) => (
  <NewsCard
    key={article.url}
    article={article}
    onRemove={() => removeBookmark(article.url)}
    isBookmarkedPage={true}
  />
))}

        </div>
      ) : (
        <div style={{ marginTop: '70px', textAlign: 'center' }}>
          <Bookmark size={45} />
          <h1>No bookmarked articles</h1>
          <p>Articles you bookmark will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
