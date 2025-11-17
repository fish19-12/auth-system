// Frontend API utility
// Base URL includes /api/auth for consistency
const API_URL = "https://auth-backend-uvz5.onrender.com/api/auth";

// Modern POST function
export const apiPost = async (path, body = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
};

// GET function with optional token for protected routes
export const apiGet = async (path, token) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "GET",
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : { "Content-Type": "application/json" },
  });

  return res.json();
};

// Export a convenient api object if you prefer
export const api = {
  post: apiPost,
  get: apiGet,
};
