import axios from "axios";

const API_KEY = "873d144b75204821add8e592790785ad"
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
