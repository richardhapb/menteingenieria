import axios from 'axios';

const API_URL = import.meta.env.API_URL;  

export const getContacts = async () => {
  try {
    const response = await axios.get(`${API_URL}/contact/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
