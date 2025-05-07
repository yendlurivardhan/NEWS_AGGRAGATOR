import React from 'react';
import NewsCard from './NewsCard';
import '../styles/NewsList.css';  

function NewsList({ articles }) {
  return (
    <div className="news-list-container"
    
    >
      {articles.length > 0 ? (
        <div className="news-list">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      ) : (
        <p>No articles available</p>
      )}
    </div>
  );
}

export default NewsList;