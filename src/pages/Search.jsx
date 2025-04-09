import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "YOUR_NEWSAPI_KEY"; // Replace with your actual API key

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
            <h2>Search News</h2>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search news..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            <div className="sort-options">
                <label>Sort by: </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="publishedAt">Date</option>
                    <option value="relevancy">Relevance</option>
                    <option value="popularity">Popularity</option>
                </select>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            <div className="articles">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <div key={index} className="article-card">
                            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
                            <h3>{article.title}</h3>
                            <p>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
                            <p>{article.description ? article.description.slice(0, 100) + "..." : "No description available"}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                        </div>
                    ))
                ) : (
                    <p>No articles found.</p>
                )}
            </div>
        </div>
    );
};

export default Search;
