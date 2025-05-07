import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmark } from './useBookmark';
import '../styles/NewsCard.css'; 

const NewsCard = ({ article }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmark();
  const [imgSrc, setImgSrc] = useState(article.urlToImage || '/camera-off.png');

  const isBookmarked = bookmarks.some((item) => item.url === article.url);

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  };

  return (
    <div className="news-grid">
      <div className="news-card">
        <div className="image-container">
          <img
            src={imgSrc}
            onError={() => setImgSrc('data:image/png;base64,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')}
          alt="Article"
          />
        </div>
        <div className="news-content">
          <p className="source-date">
            <span className="source-name">{article.source?.name}</span>
            <span className="publish-date">
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </p>
          <h3>{article.title}</h3>
          <p>{article.description}</p>

          <div className="news-footer">
            <a className="read-more" href={article.url} target="_blank" rel="noopener noreferrer">
              Read More →
            </a>
            <div className="bookmark-icon" onClick={handleBookmarkClick}>
              {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
