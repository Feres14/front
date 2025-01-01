// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${API_URL}/books`, { headers: authHeader()});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};


export const getBookById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/books/${id}`, { headers: authHeader()});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const addBook = async (bookData) => {
    try {
      const response = await axios.post(`${API_URL}/books`, bookData, { headers: authHeader()});
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };

export const updateBook = async (id, bookData) => {
  try {
    const response = await axios.put(`${API_URL}/books/${id}`, bookData, { headers: authHeader()});
    return response.data;
  } catch (error) {
      throw error.response ? error.response.data : error;
  }
};

export const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}/books/${id}`, { headers: authHeader()});
  } catch (error) {
      throw error.response ? error.response.data : error;
  }
};
export const favoriteBook = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/books/favorite/${id}`,{},{ headers: authHeader()});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
export const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth`,{ headers: authHeader()});
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };