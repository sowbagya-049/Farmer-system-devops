import axios from 'axios';

const API_URL = 'http://192.168.49.2:30383/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const produceService = {
  // Farmer operations
  addProduce: async (produceData) => {
    const response = await api.post('/produce', produceData);
    return response.data;
  },

  getMyProduce: async () => {
    const response = await api.get('/produce/farmer');
    return response.data;
  },

  updateProduce: async (id, produceData) => {
    const response = await api.put(`/produce/${id}`, produceData);
    return response.data;
  },

  deleteProduce: async (id) => {
    const response = await api.delete(`/produce/${id}`);
    return response.data;
  },

  // Buyer operations
  getAllProduce: async () => {
    const response = await api.get('/produce');
    return response.data;
  },

  searchProduce: async (query) => {
    const response = await api.get(`/produce/search?q=${query}`);
    return response.data;
  },
};
