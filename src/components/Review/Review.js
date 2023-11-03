import React, { useEffect, useState } from "react";
import "../../assets/css/review.css";
import { useParams } from "react-router-dom";
import Header from "../Common/Header";
import SweetAlertService from "../../services/SweetAlertService";
function Review() {
  const [starsHover, setStarsHover] = useState(0);
  const [starsSet, setStarsSet] = useState(4);

  const handleHoverStar = (value) => {
    setStarsHover(value);
    render(starsHover);
  };

  const handleClickStar = (value) => {
    setStarsSet(value);
    render(starsHover);
  };

  const render = (value) => {
    const StarComponents = Array.from(document.querySelectorAll(".star"));
    StarComponents.forEach((star, index) => {
      star.style.fill = index < value ? "#f39c12" : "#808080";
    });
  };

  const handleReviewInput = (e) => {
    const review = e.target.value.slice(0, 999);
    e.target.value = review;
    const remaining = 999 - review.length;
    document.getElementById("remaining").innerHTML = remaining;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const post = {
      stars: starsSet,
      review: form["review"].value,
      name: form["name"].value,
      city: form["city"].value,
      email: form["email"].value,
    };
    console.log(post);
  };
  const { id } = useParams();
  const token = localStorage.getItem("token");
  console.log("TOKEMN", token);
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    userId: "",
  });
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await fetch(
        "http://localhost:5000/api/user/getLoggedin",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("DATAAAA", data);
      setUserData({
        userId: data.id,
        userName: data.name,
        email: data.email,
        password: data.password,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  const fetchProducts = async () => {
    console.log("IDS", id);
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/product/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("DATA", data);
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const addFeedback = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/feedback/addReview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
          body: JSON.stringify({
            description: review,
            userId: userData.userId,
            productId: id,
          }),
        }
      );
      if (response.ok) {
        SweetAlertService.success("Great Job", "Review submitted");
      } else {
        SweetAlertService.error(
          "Failed",
          "Invalid feedback. Please try again."
        );
        console.error("Error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [userReview, setUserReview] = useState(""); // To store the user's review

  const fetchUserReview = async () => {
    try {
      if (!token || !userData.userId) {
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/feedback/getUserReview?productId=${id}&userId=${userData.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserReview(data.description);
      }
    } catch (error) {
      console.error("Error fetching user's review:", error);
    }
  };
  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, [id]);

  return (
    <>
      <Header />
      <main>
        <div class="section section-gray">
          <div class="section-content">
            <div class="product-details">
              <ul class="product-images">
                <li class="preview">
                  <img
                    src="https://res.cloudinary.com/dx6ro5dgg/image/upload/v1698866953/u8bw4odxlnlscz8w5zsx.png"
                    alt=""
                  />
                </li>
              </ul>
              {product && (
                <ul class="product-info">
                  <li class="product-name">{product.title}</li>
                  <li class="product-price">
                    <span>{product.price}</span>
                  </li>
                  <h3>description</h3>
                  <li class="product-description">
                    <p>
                      This string is randomly generated. The standard default
                      text is designed to ramble about nothing. The standard
                      default text is designed to ramble about nothing. This
                      string is randomly generated.
                    </p>
                  </li>
                </ul>
              )}
              <div class="container-feedback">
                <form onSubmit={addFeedback}>
                  <div class="form-group">
                    <textarea
                      style={{ marginTop: "89px", marginLeft: "25px" }}
                      class="form-control status-box"
                      rows="3"
                      placeholder="Enter your comment here..."
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    ></textarea>
                  </div>

                  <div class="button-group pull-right">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
                <ul class="posts"></ul>
              </div>

              <div
                className="comment-thread-container hover"
                style={{ top: "207px" }}
              >
                {product?.feedbacks.map((feedback) => (
                  <div className="comment-message-block" key={feedback.id}>
                    <div
                      className="comment-initials-container"
                      aria-hidden="true"
                    >
                      <span
                        className="avatar avatar-small avatar-ext-0"
                        style={{ width: "54px", height: "54px" }}
                      >
                        <img
                          src={feedback.user.profileImageUrl}
                          alt="User Avatar"
                          style={{ width: "54px", height: "54px" }}
                        />
                      </span>
                    </div>
                    <div className="comment-message-container">
                      <h3>{feedback.user.name}</h3>
                      <div className="comment-message-text">
                        {feedback.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <div className="container">
        <form id="review-form" onSubmit={addFeedback}>
          <h2>Write Your Review</h2>

          <div className="form-group">
            <textarea
              className="form-control"
              rows="10"
              placeholder="Your Review"
              name="review"
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <span id="reviewInfo" className="help-block pull-right">
              <span id="remaining">999</span> Characters remaining
            </span>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <input id="submitForm" type="submit" style={{ display: "none" }} />
          <span id="submitInfo" className="help-block">
            By clicking <strong>Submit</strong>, I authorize the sharing of my
            name and review on the web. (email will not be shared)
          </span>
        </form>
        <h2>Read what others have said about that:</h2>
        <div id="review-container">
          {product?.feedbacks &&
            product?.feedbacks?.map((index, key) => {
              return (
                <blockquote className="review" key={key}>
                  <div className="stars-container"></div>
                  <div className="review-content">
                    <p>{index?.description}</p>
                    <div className="reviewee footer">{index?.user?.name}</div>
                  </div>
                </blockquote>
              );
            })}
        </div>
      </div> */}
    </>
  );
}

export default Review;
