import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmark } from './useBookmark';
import '../styles/NewsCard.css'; 
import '../styles/Bookmarks.css';

const NewsCard = ({ article }) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmark();
  const [imgSrc, setImgSrc] = useState(article.urlToImage || '/camera-off.png');

  const isBookmarked = bookmarks.some((a) => a.url === article.url);

  const toggleBookmark = () => {
    isBookmarked ? removeBookmark(article.url) : addBookmark(article);
  };

  return (
    <div className="news-card" style={{width:'350px'}}>
      <div className="image-container">
        <img
          src={imgSrc}
          onError={() => setImgSrc('/camera-off.png')}
          alt="Article"
        />
      </div>

      <div className="news-content">
        <p className="source-date" style={{marginTop:'10px'}}>
          {article.source.name} | {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <div className="news-footer">
          <a 
          className='read-more'
          href={article.url}
           target="_blank" 
           rel="noopener noreferrer" 
           style={{marginBottom:'0px'}}
           >
            Read More →</a>
          <div 
          className="bookmark-icon"
           onClick={toggleBookmark}>
            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
