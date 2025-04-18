import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NewsPages from "./pages/NewsPages";
import Bookmarks from "./pages/Bookmarks";
import Navbar from "./components/Navbar";
import { BookmarkProvider } from "./components/useBookmark"; // ✅

function App() {
  return (
    <BookmarkProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:category" element={<NewsPages />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Router>
    </BookmarkProvider>
  );
}

export default App;
