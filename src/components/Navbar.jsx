import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search as SearchIcon, Bookmark, Newspaper } from "lucide-react";
import DayMode from "../pages/Day_Mode"; // Import the DayMode component
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Navigate to the Home page
  const handleHomeClick = () => {
    navigate("/");
  };

  // Navigate to the Search page
  const handleSearchClick = () => {
    navigate("/search");
  };

  // ✅ Navigate to the Bookmarks page
  const handleBookmarkClick = () => {
    navigate("/bookmarks");
  };

  return (
    <div className="navbar">
      <div className="Header">
        <h1>
          <Newspaper size={24} style={{ marginRight: "6px", verticalAlign: "middle" }} />
          News Aggregator
        </h1>
      </div>

      <div className="navbar-right">
        <button className="nav-icon" onClick={handleHomeClick}>
          <Home size={18} /> <span>Home</span>
        </button>

        <button className="nav-icon" onClick={handleSearchClick}>
          <SearchIcon size={18} /> <span>Search</span>
        </button>

        <button className="nav-icon" onClick={handleBookmarkClick}>
          <Bookmark size={18} /> <span>Bookmarks</span>
        </button>
        
        <DayMode />
      </div>
    </div>
  );
}

export default Navbar;