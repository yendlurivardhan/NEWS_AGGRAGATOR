import React, { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmark } from './useBookmark';
import '../styles/NewsCard.css';

const NewsCard = ({ article }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmark();

  // Set imgSrc to null initially
  const [imgSrc, setImgSrc] = useState(null);

  const isBookmarked = bookmarks.some((item) => item.url === article.url);

  const handleBookmarkClick = () => {
    if (isBookmarked) {
      removeBookmark(article.url);
    } else {
      addBookmark(article);
    }
  };

  useEffect(() => {
    const imageUrl = article?.image;  // Change to article.image
    console.log('Image URL:', imageUrl);  // Check the image URL from the correct property

    if (imageUrl && isValidHttpUrl(imageUrl)) {
      setImgSrc(imageUrl);  // Set image if valid
    } else {
      setImgSrc(null);  // If no valid image, leave it empty
    }
  }, [article]);

  const handleImageError = () => {
    setImgSrc(null);  // Fallback to empty if image fails to load
  };

  const isValidHttpUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="news-grid">
      <div className="news-card">
        <div className="image-container">
          {/* Show placeholder if no valid image source */}
          {imgSrc ? (
            <img
              src={imgSrc}
              alt="Article"
              onError={handleImageError}  // Handle image loading error
            />
          ) : (
            <div className="image-placeholder">No Image Available</div> // Placeholder when image is missing
          )}
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
