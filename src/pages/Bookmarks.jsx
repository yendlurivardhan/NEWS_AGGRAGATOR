import React from 'react';
import { useBookmark } from '../components/useBookmark';
import NewsCard from '../components/NewsCard';
import '../styles/Bookmarks.css';

const Bookmarks = () => {
  const { bookmarks } = useBookmark();

  return (
    <div className="bookmarks-page">
      <h1 className="bookmark-title">Bookmarked Articles</h1>
      <p className="bookmark-subtitle">Your saved articles for later reading.</p>
      {bookmarks.length > 0 ? (
        <div className="bookmarks-grid">
          {bookmarks.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      ) : (
        <p className="no-bookmarks">No bookmarks yet.</p>
      )}
    </div>
  );
};

export default Bookmarks;
