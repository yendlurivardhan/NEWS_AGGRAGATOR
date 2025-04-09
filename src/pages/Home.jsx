import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "../components/Categories";

const API_KEY = "40039d2c5a2e4a7b9ee3d1bfea2aaec8"; // Replace with your actual API key

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("General");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory.toLowerCase()}&apiKey=${API_KEY}`)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Top Headlines</h2>

      {/* Categories Section */}
      <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        articles.map((article, index) => (
          <div key={index} style={{ marginBottom: "20px", border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{
                  width: "100%",
                  maxWidth: "200px", // Ensuring images fit within a set width
                  height: "auto",
                  display: "block",
                  // margin: "0 auto",
                  borderRadius: "5px",
                }}
              />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
              Read More
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
