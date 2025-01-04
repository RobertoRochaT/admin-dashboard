import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./dashboard.css";

const GOOGLE_CLIENT_ID = import.meta.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "/api/signup" : "/api/login";

    axios
      .post(endpoint, formData)
      .then((response) => {
        console.log("Response:", response.data);
        if (!isRegistering) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.href = "/Dashboard";
        } else {
          alert("User registered successfully! Please log in.");
          setIsRegistering(false);
        }
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error
        );
      });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const tokenId = credentialResponse.credential;

    axios
      .post("http://localhost:9001/api/google-login", { tokenId })
      .then((res) => {
        console.log("Google Login Success:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/Dashboard";
      })
      .catch((err) => {
        console.error(
          "Google Login Error:",
          err.response ? err.response.data : err
        );
      });
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <section className="login-section">
        <div className="login-container">
          <div className="login-header">
            <h2>{isRegistering ? "Register" : "Login"}</h2>
            <p>
              {isRegistering
                ? "Create your account"
                : "Log in to access your dashboard"}
            </p>
          </div>
          <div className="login-body">
            <form onSubmit={handleSubmit} className="login-form">
              {isRegistering && (
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="form-button">
                {isRegistering ? "Register" : "Login"}
              </button>
            </form>
            <div className="divider">
              <span>OR</span>
            </div>
            <div className="google-login-button">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.error("Google Login Failed");
                }}
              />
            </div>
            <div className="toggle-link">
              <p>
                {isRegistering
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <span onClick={() => setIsRegistering(!isRegistering)}>
                  {isRegistering ? "Login here" : "Register here"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default Login;
