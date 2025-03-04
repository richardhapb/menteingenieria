import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

export const getUsuario = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blog/users/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return {};
  }
};

