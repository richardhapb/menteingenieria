
import axios from 'axios';

const API_URL = process.env.API_URL;  

export const getSolicitudes = async () => {
  try {
    const response = await axios.get(`${API_URL}/solicitud`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
