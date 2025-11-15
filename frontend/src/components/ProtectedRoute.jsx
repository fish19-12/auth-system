// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

/**
 * Wrap any page that should be protected.
 * If the user has a token in localStorage, they can access it.
 * Otherwise, they are redirected to /login
 */
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />; // redirect if not logged in
  }
  return children;
}
