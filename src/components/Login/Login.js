import React, { useState } from "react";
import "../../assets/css/signup.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import SweetAlertService from "../../services/SweetAlertService";
const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.user) {
          localStorage.setItem("userName", responseData.user.name);
          localStorage.setItem("token", responseData.token);
          SweetAlertService.success("Great Job", "You are in Redirecting");
          setIsLoggedIn(true);
          history.push("/home");
          console.log("Login successful", isLoggedIn);
        } else {
          SweetAlertService.error(
            "Failed",
            "Invalid email or password. Please try again."
          );
          console.error("Login failed");
        }
      } else {
        SweetAlertService.error(
          "Failed",
          "Invalid email or password. Please try again."
        );
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-signup">
      <div className="card-signup">
        <div className="card_title">
          <h1>Welcome Back</h1>
          <span>
            Don't have an account? <a href="/signup">Sign Up</a>
          </span>
        </div>
        <div className="form">
          <form onSubmit={handleLoginSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleLoginInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleLoginInputChange}
              required
            />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
