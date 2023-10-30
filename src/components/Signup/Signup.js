import React, { useState } from "react";
import "../../assets/css/signup.css";
import { useHistory } from "react-router-dom";
import SweetAlertService from "../../services/SweetAlertService";
const Signup = () => {
  const history = useHistory();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(signupData.name)) {
      SweetAlertService.error("Failed", "Please enter a valid name");
      return;
    }

    if (!signupData.password || signupData.password.length < 8) {
      SweetAlertService.error(
        "Failed",
        "Please enter a valid password with at least 8 characters"
      );
      return;
    }
    try {
      const response = await fetch("https://inventory-app-backend-one.vercel.app/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        }),
      });
      const responseData = await response.json();
      console.log("REX", responseData);
      localStorage.setItem("userName", responseData.user.name);
      localStorage.setItem("token", responseData.token);
      console.log("RESPO", response.body);
      if (response.ok) {
        console.log("User registered successfully", responseData);
        SweetAlertService.success("Great Job", "Redirecting");
        history.push("/admin/dashboard");
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container-signup">
      <div className="card-signup">
        <div className="card_title">
          <h1>Create Account</h1>
          <span>
            Already have an account? <a href="/login">Sign In</a>
          </span>
        </div>
        <div className="form">
          <form onSubmit={handleSignupSubmit}>
            <input
              type="text"
              name="name"
              placeholder="User name"
              value={signupData.name}
              onChange={handleSignupInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={signupData.email}
              onChange={handleSignupInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={signupData.password}
              onChange={handleSignupInputChange}
              required
            />
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
