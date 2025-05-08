import axios from "axios";

const API_KEY = "e5d5b4d1e4db79acd47e52209549bf9a"
const BASE_URL = "https://gnews.io/api/v4";


// Fetch top headlines
export const fetchTopHeadlines = async (category = "general") => {
    try {
        const response = await axios.get(`${BASE_URL}/top-headlines`, {
            params: { country: "us", category, apiKey: API_KEY },
        });
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching headlines:", error);
        return [];
    }
};

// Search for news articles
export const searchNews = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/everything`, {
            params: { q: query, sortBy: "publishedAt", apiKey: API_KEY },
        });
        return response.data.articles;
    } catch (error) {
        console.error("Error searching news:", error);
        return [];
    }
};
