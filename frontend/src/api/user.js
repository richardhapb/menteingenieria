import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get the user list
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

// Get an user by id
export const getUser = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blog/users/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    return {};
  }
};

