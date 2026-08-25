import axios from "axios";

// Set VITE_API_URL in .env when the backend is deployed.
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const getResponseData = (response) => response.data;

export const freelancerApi = {
  getAll: () => api.get("/api/freelancers").then(getResponseData),
  getById: (id) => api.get(`/api/freelancers/${id}`).then(getResponseData),
};

export const invitationApi = {
  create: (invitation) => api.post("/api/invitations", invitation).then(getResponseData),
};

export default api;
