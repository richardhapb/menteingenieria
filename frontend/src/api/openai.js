import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

export const getOpenAiText = async (prompt) => {
  try {
    const response = await axios.post(`${API_URL}/openai_request/request/`, prompt, {
      headers: {
        'X-CSRFToken': csrftoken,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
