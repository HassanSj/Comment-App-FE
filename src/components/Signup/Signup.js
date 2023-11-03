import React, { useRef, useState } from "react";

import "../../assets/css/signup.css";
import { useHistory } from "react-router-dom";
import SweetAlertService from "../../services/SweetAlertService";

const Signup = () => {
  const history = useHistory();
  const imageUploadRef = useRef(null);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log("FILESS", file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "inventory_crud");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dx6ro5dgg/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const imageData = await response.json();
          setProfileImage(imageData.secure_url); // set the secure URL of the uploaded image
        } else {
          console.error("Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  console.log("UR:LLLL", profileImage);
  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  const handleImageClick = () => {
    // Trigger a click event on the hidden file input
    imageUploadRef.current.click();
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
      const response = await fetch("http://localhost:5000/api/user/signup", {
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
          profileImageUrl: profileImage,
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
        history.push("/home");
      } else {
        console.error("Error registering user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const renderImage = profileImage ? (
    <img
      id="profilePic"
      className="pic"
      src={profileImage}
    />
  ) : (
    <img
      id="profilePic"
      className="pic"
      src="https://source.unsplash.com/random/150x150?person" // Static image URL
    />
  );
  return (
    <div className="container-signup">
      <div className="card-signup">
        <div className="profile-pic-wrapper">
          <div className="pic-holder" onClick={handleImageClick}>
           {renderImage}
            <input
              ref={imageUploadRef}
              onChange={handleImageUpload}
              id="image-upload"
              class="uploadProfileInput"
              type="file"
              name="profile_pic"
              accept="image/*"
              style={{ opacity: "0" }}
            />
          </div>
        </div>
        <div className="img-upload">
          <label
            htmlFor="image-upload"
            className="custom-file-upload fas"
          ></label>
        </div>
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
