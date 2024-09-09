import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getArticulos = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog/articulos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export const getArticulo = async id => {
  try {
    const response = await axios.get(`${API_URL}/blog/articulos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return {};
  }
}

