import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { apiPost } from "../utils/api";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirecting, setRedirecting] = useState(false);
  const navigate = useNavigate();

  // Redirect already logged-in users
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setRedirecting(true);
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (key) => (e) =>
    setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await apiPost("/auth/login", form);

      if (res.token) {
        // Save token and user info
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/dashboard", { replace: true });
      } else {
        setError(res.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Try again.");
    }

    setLoading(false);
  };

  if (redirecting) return <p>Redirecting to dashboard...</p>; // show while redirecting

  return (
    <MainLayout>
      <div className={styles.wrap}>
        <form className={styles.card} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Welcome Back</h2>
          <p className={styles.subtitle}>
            Login to access your secure dashboard
          </p>

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange("password")}
            placeholder="••••••••"
          />

          {error && <div className={styles.error}>{error}</div>}

          {loading ? <Loader /> : <Button type="submit">Sign in</Button>}

          <div className={styles.footer}>
            Don’t have an account?{" "}
            <a href="/register" className={styles.link}>
              Create one
            </a>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
