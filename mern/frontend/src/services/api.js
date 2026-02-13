import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const authService = {
  register: (name, email, password) => 
    axios.post(`${API_URL}/auth/register`, { name, email, password }),
  
  login: (email, password) => 
    axios.post(`${API_URL}/auth/login`, { email, password }),
  
  getCurrentUser: (token) => 
    axios.get(`${API_URL}/auth/me`, { 
      headers: { Authorization: `Bearer ${token}` } 
    })
};

export const searchService = {
  searchBuses: (from, to, date) =>
    axios.post(`${API_URL}/search`, { from, to, date })
};

export const bookingService = {
  bookTicket: (scheduleId, passengers, token) =>
    axios.post(`${API_URL}/bookings`, { scheduleId, passengers }, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getBookingDetails: (ticketId) =>
    axios.get(`${API_URL}/bookings/${ticketId}`),
  
  getMyBookings: (token) =>
    axios.get(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  cancelBooking: (ticketId, token) =>
    axios.put(`${API_URL}/bookings/${ticketId}/cancel`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
};

export const adminService = {
  addBus: (busNumber, totalSeats, busType, token) =>
    axios.post(`${API_URL}/admin/buses`, { busNumber, totalSeats, busType }, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  addRoute: (source, destination, travelTime, token) =>
    axios.post(`${API_URL}/admin/routes`, { source, destination, travelTime }, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  addSchedule: (busId, routeId, dateOfJourney, departureTime, arrivalTime, token) =>
    axios.post(`${API_URL}/admin/schedules`, 
      { busId, routeId, dateOfJourney, departureTime, arrivalTime }, 
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  
  getBuses: (token) =>
    axios.get(`${API_URL}/admin/buses`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getRoutes: (token) =>
    axios.get(`${API_URL}/admin/routes`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  
  getSchedules: (token) =>
    axios.get(`${API_URL}/admin/schedules`, {
      headers: { Authorization: `Bearer ${token}` }
    })
};
