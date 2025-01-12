import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Update with your backend URL

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { username, password });
  const { token, refreshToken } = response.data;

  // Save tokens in localStorage
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const getUserData = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
