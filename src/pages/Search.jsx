import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/search.css";
import { Bookmark, BookmarkCheck, Search as SearchIcon } from "lucide-react";
import { useBookmark } from "../components/useBookmark";

const API_KEY = "e5d5b4d1e4db79acd47e52209549bf9a";

const Search = () => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmark();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("publishedAt");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    if (query) {
      fetchArticles();
    }
  }, [query, sortBy]);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://gnews.io/api/v4/search?q=${query}&sortby=${sortBy}&token=${import.meta.env.VITE_GNEWS_API_KEY}`
      );
      setArticles(response.data.articles);
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
    fetchArticles();
  };

  return (
    <div className="search-page">
      <h2 style={{ fontSize: "30px" }}>Search Articles</h2>
      <p style={{ fontSize: "20px" }}>
        Finding articles from around the world.
      </p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <div>
          <input
            type="text"
            placeholder="Search Articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <SearchIcon size={20} />
        </div>
      </form>

      {/* Sort Options */}
      <div className="sort-options">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: "10px", width: "100px" }}
        >
          <option value="publishedAt">Date</option>
          <option value="relevancy">Relevance</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {/* Loading & Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* News Articles Grid */}
      <div className="search-grid">
        {articles.length > 0 ? (
          articles.map((article, index) => {
            const isBookmarked = bookmarks.some(
              (item) => item.url === article.url
            );

            return (
              <div key={index} className="search-card">
               <div className="image-container">
               {article.image ? (
  <img
    src={article.image}
    alt={article.title || "Article image"}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "https://via.placeholder.com/150?text=Image+Not+Available";
    }}
  />
) : (
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundColor: "#ddd",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <span>Image Not Available</span>
  </div>
)}

</div>


                <div className="news-content">
                  <p className="source-date">
                    {article.source.name} &nbsp;|&nbsp;{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>

                  <h3 className="search-title">{article.title}</h3>
                  <p className="search-description">
                    {article.description
                      ? article.description.slice(0, 100) + "..."
                      : "No description available"}
                  </p>

                  <div className="news-footer">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more"
                    >
                      Read More →
                    </a>
                    <div
                      className="bookmark-icon"
                      onClick={() => {
                        if (isBookmarked) {
                          removeBookmark(article.url);
                          console.log("Removed Article");
                        } else {
                          addBookmark(article);
                          console.log("Added Article");
                        }
                      }}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck size={20} />
                      ) : (
                        <Bookmark size={20} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No articles found.....</p>
        )}
      </div>
    </div>
  );
};

export default Search;
