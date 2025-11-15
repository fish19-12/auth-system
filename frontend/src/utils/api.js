const API_URL = import.meta.env.VITE_API_URL;

// Modern clean POST function
export const apiPost = async (path, body = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
};

// Optional: Classic API object (post/get)
export const api = {
  post: async (path, body = {}) => {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return res.json();
  },

  get: async (path, token) => {
    const res = await fetch(`${API_URL}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return res.json();
  },
};
