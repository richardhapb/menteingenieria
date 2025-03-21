
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const newRequest = async (request) => {
  const res = await axios.post(`${API_URL}/request/`, request);
  return res.data;
}
