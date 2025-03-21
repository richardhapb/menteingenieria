import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Retrieve the list of services of menteingenieria
export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/service/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};


