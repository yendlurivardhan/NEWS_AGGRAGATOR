import axios from "axios";

const API_KEY = "29a52a5ac6bf35bb06aac56431f3fa2d"
const BASE_URL = "https://newsapi.org/v2";

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
