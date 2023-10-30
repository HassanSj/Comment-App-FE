import React, { useState } from "react";
import { submitFeedback } from "../../services/api";
const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = await submitFeedback(formData);
      alert(message);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit Feedback</button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackPage;
