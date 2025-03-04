import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function getCsrfToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 'csrftoken'.length + 1) === ('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring('csrftoken'.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const getOpenAiText = async () => {
    try {
        const csrfToken = getCsrfToken();

        if (!csrfToken) {
            console.warn('CSRF token not found. Request may fail.');
        }

        const response = await axios.post(
            `${API_URL}/openai_request/request/`,
            {},
            {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        throw error;
    }
};
