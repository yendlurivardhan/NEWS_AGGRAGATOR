import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react"; // Import icons for dark and light modes
import "../styles/Day_Mode.css"; // Ensure the correct path for CSS

const DayMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check saved mode in localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode === "dark") {
      document.body.classList.add("dark-mode");
      setIsDarkMode(true);
    } else {
      document.body.classList.remove("dark-mode");
      setIsDarkMode(false);
    }
  }, []);

  // Toggle dark mode
  const toggleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("mode", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("mode", "light");
    }
  };

  return (
    <button onClick={toggleMode} className="mode-toggle-btn">
      {isDarkMode ? <Sun size={25} /> : <Moon size={25} />} {/* Toggle icons */}
    </button>
  );
};

export default DayMode;
