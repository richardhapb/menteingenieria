import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function getCookie(name) {
  const CSRF_HEADER = 'X-CSRFToken'; // Define the CSRF header name

  // Create a new XMLHttpRequest object
  const request = new XMLHttpRequest();

  request.open('GET', API_URL, true); // Use asynchronous mode

  // Define the onload event handler
  request.onload = function() {
    // Check if the request was successful
    if (request.status === 200) {
      // Get the CSRF token from the response header
      const csrfToken = request.getResponseHeader(CSRF_HEADER);

      if (csrfToken) {
        // Set the CSRF token as a cookie
        document.cookie = `csrftoken=${csrfToken}; path=/; Secure; SameSite=Strict`;
      } else {
        console.error('CSRF token not found in the response headers.');
      }
    } else {
      console.error(`Request failed with status: ${request.status}`);
    }
  };

  // Define the onerror event handler
  request.onerror = function() {
    console.error('An error occurred during the request.');
  };

  // Send the request
  request.send(null);

  // Get the cookie value
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
