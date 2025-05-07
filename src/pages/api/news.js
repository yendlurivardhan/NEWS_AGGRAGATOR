import React, { useState, useEffect } from 'react';
import axios from 'axios';


const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Your NewsAPI endpoint with your API key
    const apiKey = 'YOUR_API_KEY';  // Replace with your actual NewsAPI key
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    // Fetch data from NewsAPI directly in the frontend
    axios.get(url)
      .then(response => {
        setNews(response.data.articles);  // Set the articles in state
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        setError('Error fetching news');  // Set error message if something goes wrong
        setLoading(false);  // Set loading to false even if there's an error
      });
  }, []);  // Empty dependency array ensures it runs once when the component mounts

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Top Headlines</h1>
      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
