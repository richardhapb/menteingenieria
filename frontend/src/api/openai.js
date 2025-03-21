import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Initialize csrf token
let csrfInitialized = false;

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(async (config) => {
    // If CSRF not initialized yet, get it first
    if (!csrfInitialized) {
        try {
            await axios.get(`${API_URL}/openai_request/csrf/`, {
                withCredentials: true,
                headers: {
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            csrfInitialized = true;
        } catch (error) {
            console.error("Failed to initialize CSRF token:", error);
        }
    }

    // Get and add the CSRF token to the request
    const csrfToken = getCsrfToken();
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
});

function getCsrfToken() {
    let cookieValue = null;

    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 'csrftoken'.length + 1) === ('csrftoken=')) {
                cookieValue = decodeURIComponent(cookie.substring('csrftoken'.length + 1)).trim();
                break;
            }
        }
    }
    return cookieValue;
}

export const getOpenAiText = async () => {
    try {
        const response = await api.post('/openai_request/request/', {}, { headers: { "Content-Type": "application/json" } });

        return response.data;
    } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
        throw error;
    }
};
