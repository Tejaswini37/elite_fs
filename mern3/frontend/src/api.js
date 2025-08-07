// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://10.11.18.96:5000/api', // Update if using different backend port
});

export default API;
