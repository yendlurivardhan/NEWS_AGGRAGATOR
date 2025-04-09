import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "../components/Categories"; // Import the Categories component

const API_KEY = "40039d2c5a2e4a7b9ee3d1bfea2aaec8";

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
      .catch((error) => console.error(error));
  }, [selectedCategory]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Top Headlines - {selectedCategory}</h2>

      {/* Category Selection */}
      <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        articles.map((article, index) => (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #ccc",
              paddingBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                style={{
                  width: "120px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            )}
            <div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
