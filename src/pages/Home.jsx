import React, { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=${selectedCategory.toLowerCase()}&token=${import.meta.env.VITE_GNEWS_API_KEY}`
        );
        
        const data = await response.json();
    
        if (Array.isArray(data.articles)) {
          setArticles(data.articles);
          setError('');
        } else {
          setError('Failed to fetch articles');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong');
      }
      setLoading(false);
    };
    
    fetchNews();
  }, [selectedCategory]);

 return (
  <div className="home-container">
    {/* ✅ This is the top heading section */}
    <div className="headlines-header" style={{marginLeft:"20px"}}>
      <h1>Top Headlines</h1>
      <p>Stay informed with the latest news from around the world.</p>
    </div>
    <br></br>
    {/* ✅ Category buttons below the heading */}
    <Categories 
      onCategoryClick={setSelectedCategory} 
      selectedCategory={selectedCategory} 
    />

    {/* ✅ Loading/Error/News list */}
    {loading && <p style={{ padding: '1rem' }}>Loading articles...</p>}
    {error && <p style={{ color: 'red', padding: '1rem' }}>{error}</p>}
    
    {!loading && !error && <NewsList articles={articles} />}
  </div>
);

}

export default Home;