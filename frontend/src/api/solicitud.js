
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const newSolicitud = async (solicitud) => {
  const res = await axios.post(`${API_URL}/solicitud/`, solicitud);
  return res.data;
}
