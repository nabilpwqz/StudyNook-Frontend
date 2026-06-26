import axios from "axios";
import { Server_URL } from "./config";

// Create axios instance with default config
const api = axios.create({
  baseURL: Server_URL,
  withCredentials: true,
});

// Auth API calls
export const authAPI = {
  register: (data) => api.post("/api/auth/register", data),
  login: (data) => api.post("/api/auth/login", data),
  logout: () => api.post("/api/auth/logout"),
  getProfile: () => api.get("/api/auth/profile"),
};

// Rooms API calls
export const roomsAPI = {
  getAllRooms: (params) => api.get("/api/rooms", { params }),
  getLatestRooms: () => api.get("/api/rooms/latest"),
  getRoomById: (id) => api.get(`/api/rooms/${id}`),
  createRoom: (data) => api.post("/api/rooms", data),
  updateRoom: (id, data) => api.put(`/api/rooms/${id}`, data),
  deleteRoom: (id) => api.delete(`/api/rooms/${id}`),
  getUserRooms: () => api.get("/api/rooms/user/listings"),
};

// Bookings API calls
export const bookingsAPI = {
  createBooking: (data) => api.post("/api/bookings", data),
  getUserBookings: () => api.get("/api/bookings/my"),
  getBookingById: (id) => api.get(`/api/bookings/${id}`),
  cancelBooking: (id) => api.patch(`/api/bookings/${id}/cancel`),
};

export default api;
