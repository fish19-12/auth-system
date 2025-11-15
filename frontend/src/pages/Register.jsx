import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import MainLayout from "../layouts/MainLayout";
import { apiPost } from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect logged-in users
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Processing...");
    setLoading(true);

    try {
      // 1️⃣ Call register endpoint
      const res = await apiPost("/auth/register", form);

      if (res?.message) {
        setMessage(res.message); // show “User registered successfully” or error

        // 2️⃣ Auto-login after registration
        try {
          const loginRes = await apiPost("/auth/login", {
            email: form.email,
            password: form.password,
          });

          if (loginRes?.token) {
            localStorage.setItem("token", loginRes.token);
            localStorage.setItem("user", JSON.stringify(loginRes.user));
            navigate("/dashboard", { replace: true });
          } else {
            setMessage(loginRes.message || "Auto-login failed");
          }
        } catch (loginErr) {
          setMessage("Auto-login failed");
          console.error(loginErr);
        }
      } else {
        setMessage("Registration failed");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
      console.error(err);
    }

    setLoading(false); // Always clear loading
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Account</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={styles.input}
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={form.password}
              onChange={handleChange}
              required
            />

            <button type="submit" className={styles.button}>
              {loading ? "Processing..." : "Register"}
            </button>
          </form>

          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </MainLayout>
  );
}
