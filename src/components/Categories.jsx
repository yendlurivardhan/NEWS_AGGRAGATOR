import React from "react";

const categories = ["General", "Business", "Entertainment", "Health", "Science", "Sports", "Technology"];

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <div style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          style={{
            margin: "5px",
            padding: "10px 15px",
            cursor: "pointer",
            backgroundColor: selectedCategory === category ? "blue" : "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;
