import React, { useState } from "react";
import "./Auth.css"; // Import CSS

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const apiUrl = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

    if (!isLogin) {
      if (!formData.name || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("All fields are required!");
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
            isLogin
                ? { email: formData.email, password: formData.password }
                : { username: formData.username, email: formData.email, password: formData.password }
        ),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.msg || "Something went wrong!");
        return;
      }

      if (isLogin) {
        // Save JWT token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect to homepage or dashboard
        window.location.href = "/home";
      } else {
        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setLoading(false);
    }
  };

  return (
      <div className="auth-container">
        <div className="auth-card">
          <h3 className="auth-title">{isLogin ? "Login" : "Sign Up"}</h3>
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
                <>
                  <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="auth-input"
                  />
                  <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="auth-input"
                  />
                </>
            )}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="auth-input"
            />
            {!isLogin && (
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="auth-input"
                />
            )}
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
            </button>
          </form>

          <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </p>
        </div>
      </div>
  );
};

export default Auth;