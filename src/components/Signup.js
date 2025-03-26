import React, { useState } from "react";

const Signup = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) {
        setError("All fields are required!");
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    alert("Signup successful!");
    setError("");
    onNavigate("home"); // Navigate to Home after Signup
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.header}>Sign up</h3>
        <form onSubmit={handleSubmit}>
          {["name", "username", "email", "password", "confirmPassword"].map((field, index) => (
            <div key={index} style={styles.inputGroup}>
              <label style={styles.label}>
                {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          ))}

          {error && <p style={styles.errorText}>{error}</p>}

          <button type="submit" style={styles.button}>Signup</button>
        </form>
        <p onClick={() => onNavigate("login")} style={styles.linkText}>
          Already have an account? <span style={styles.link}>Login</span>
        </p>
        <p style={styles.footerText}>©2025</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.1)",
    width: "300px", 
    textAlign: "center",
  },
  header: {
    color: "#DF7F13",
    fontSize: "18px", 
    fontWeight: "bold",
    marginBottom: "10px",
  },
  inputGroup: {
    marginBottom: "8px", 
    textAlign: "left",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    color: "#333",
    fontSize: "13px", 
    marginBottom: "3px",
  },
  input: {
    width: "100%",
    padding: "6px", 
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "12px", 
  },
  button: {
    backgroundColor: "#DF7F13",
    color: "white",
    padding: "8px", 
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "14px", 
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  linkText: {
    fontSize: "12px", 
    color: "#666",
    marginTop: "8px",
  },
  link: {
    color: "#DF7F13",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footerText: {
    fontSize: "10px",
    marginTop: "8px",
    color: "#888",
  },
};

export default Signup;
