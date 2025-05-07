import React, { createContext, useContext, useState, useEffect } from 'react';

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const stored = localStorage.getItem('bookmarkedArticles');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarkedArticles', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (article) => {
    if (!bookmarks.some((item) => item.url === article.url)) {
      setBookmarks((prev) => [...prev, article]);
    }
  };

  const removeBookmark = (url) => {
    setBookmarks((prev) => prev.filter((news) => news.url !== url));
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
};
