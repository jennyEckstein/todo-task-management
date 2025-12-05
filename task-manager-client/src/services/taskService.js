import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export const taskService = {
    // Get all tasks with optional filters
    getTasks: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        if (filters.category) params.append('category', filters.category);
        if (filters.sortBy) params.append('sortBy', filters.sortBy);

        const queryString = params.toString();
        const url = queryString ? `${API_ENDPOINTS.tasks}?${queryString}` : API_ENDPOINTS.tasks;

        const response = await api.get(url);
        return response.data;
    },

    // Create a new task
    createTask: async (taskData) => {
        const response = await api.post(API_ENDPOINTS.tasks, taskData);
        return response.data;
    },

    // Update a task
    updateTask: async (id, taskData) => {
        const response = await api.put(API_ENDPOINTS.taskById(id), taskData);
        return response.data;
    },

    // Update task status (quick update)
    updateTaskStatus: async (id, status) => {
        const url = `${API_ENDPOINTS.tasks}/${id}/status`;
        const response = await api.patch(url, { status });
        return response.data;
    },

    // Delete a task
    deleteTask: async (id) => {
        const response = await api.delete(API_ENDPOINTS.taskById(id));
        return response.data;
    },
};