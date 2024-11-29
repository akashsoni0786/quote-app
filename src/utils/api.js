import axios from 'axios';

// Base API URL for all endpoints
const API_BASE_URL = 'https://assignment.stage.crafto.app';

// Create an Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set or remove the Authorization token
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.Authorization;
  }
};

// Error handler for API responses
export const handleApiError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data);
    return error.response.data;
  } else {
    console.error('Network Error:', error.message);
    return { error: 'Network error. Please try again later.' };
  }
};

// Utility to make GET requests
export const get = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Utility to make POST requests
export const post = async (url, data = {}) => {
  try {
    const response = await apiClient.post(url, data);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Utility to make FormData POST requests (e.g., for file uploads)
export const postFormData = async (url, formData) => {
  try {
    const response = await apiClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
