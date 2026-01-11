import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productsApi = {
  getAll: (params?: { category?: string; featured?: boolean; search?: string; limit?: number }) =>
    apiClient.get('/products', { params }),
  
  getFeatured: (limit: number = 4) =>
    apiClient.get('/products/featured', { params: { limit } }),
  
  getOne: (id: string) =>
    apiClient.get(`/products/${id}`),
  
  getBySlug: (slug: string) =>
    apiClient.get(`/products/slug/${slug}`),
  
  create: (data: any) =>
    apiClient.post('/products', data),
  
  update: (id: string, data: any) =>
    apiClient.put(`/products/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/products/${id}`),
  
  updateStock: (id: string, quantity: number) =>
    apiClient.put(`/products/${id}/stock`, { quantity }),
};

// Orders API
export const ordersApi = {
  getAll: (params?: { status?: string; customer_id?: string; limit?: number }) =>
    apiClient.get('/orders', { params }),
  
  getStats: (startDate?: string, endDate?: string) =>
    apiClient.get('/orders/stats', { params: { start_date: startDate, end_date: endDate } }),
  
  getOne: (id: string) =>
    apiClient.get(`/orders/${id}`),
  
  create: (data: any) =>
    apiClient.post('/orders', data),
  
  updateStatus: (id: string, status: string) =>
    apiClient.put(`/orders/${id}/status`, { status }),
};

// Customers API
export const customersApi = {
  getAll: (limit?: number) =>
    apiClient.get('/customers', { params: { limit } }),
  
  getOne: (id: string) =>
    apiClient.get(`/customers/${id}`),
  
  getByEmail: (email: string) =>
    apiClient.get(`/customers/email/${email}`),
  
  create: (data: any) =>
    apiClient.post('/customers', data),
  
  update: (id: string, data: any) =>
    apiClient.put(`/customers/${id}`, data),
  
  getOrders: (id: string) =>
    apiClient.get(`/customers/${id}/orders`),
  
  getStats: (id: string) =>
    apiClient.get(`/customers/${id}/stats`),
};

export default apiClient;
