export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiRequest(method, path, body = null, token = null) {
  const storedToken = token || localStorage.getItem('ns_token');
  const headers = { 'Content-Type': 'application/json' };
  if (storedToken) headers['Authorization'] = `Bearer ${storedToken}`;
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  const response = await fetch(`${API_BASE}${path}`, options);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}
