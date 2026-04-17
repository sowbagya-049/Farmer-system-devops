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

export const orderService = {
  // Buyer operations
  placeOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get('/orders/buyer');
    return response.data;
  },

  cancelOrder: async (id) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },

  // Farmer operations
  getFarmerOrders: async () => {
    const response = await api.get('/orders/farmer');
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  // Admin operations
  getAllOrders: async () => {
    const response = await api.get('/orders/admin');
    return response.data;
  },
};
