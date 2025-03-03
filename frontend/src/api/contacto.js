import axios from 'axios';

const API_URL = import.meta.env.API_URL;  

export const getContactos = async () => {
  try {
    const response = await axios.get(`${API_URL}/contacto/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
