import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get list of articles
export const getArticles = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog/articles/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

// Get an article by id
export const getArticle = async id => {
  try {
    const response = await axios.get(`${API_URL}/blog/articles/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return {};
  }
}

