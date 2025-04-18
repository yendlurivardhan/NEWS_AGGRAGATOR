import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "../styles/search.css";
import { Bookmark } from "lucide-react";

const API_KEY = "40039d2c5a2e4a7b9ee3d1bfea2aaec8";

const Search = () => {
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
        `https://newsapi.org/v2/everything?q=${query}&sortBy=${sortBy}&apiKey=${API_KEY}`
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
        <input
          type="text"
          placeholder="Search Articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit">Search</button>
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
      <div className="news-grid"
      style={{width:'350px'}}
      >
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} />
              )}

              {/* Source + Date directly under image */}
              <p className="source-date"
              style={{marginRight:'auto'}}
              >
                {article.source.name} &nbsp;|&nbsp;{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>

              <h3 >{article.title}</h3>
              <p>
                {article.description
                  ? article.description.slice(0, 100) + "..."
                  : "No description available"}
              </p>

              <div className="card-footer">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-link"
                  style={{marginRight:'auto'}}
                >
                  Read More →
                </a>
                <a
                  className="BookMarkers-link"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Bookmark size={18} />
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No articles found.....</p>
        )}
      </div>
    </div>
  );
};

export default Search;
