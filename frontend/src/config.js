// Centralized configuration for Narmada Setu API endpoints
// In production, Vite will replace this with the VITE_API_URL environment variable.
// In development, it defaults to the local backend port 5000.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
