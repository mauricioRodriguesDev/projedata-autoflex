import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // A URL base da nossa API backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
