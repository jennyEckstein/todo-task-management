const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5241';

export const API_ENDPOINTS = {
    tasks: `${API_BASE_URL}/api/tasks`,
    taskById: (id) => `${API_BASE_URL}/api/tasks/${id}`,
};

export default API_BASE_URL;