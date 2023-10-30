export const submitFeedback = async (formData) => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 201) {
        return "Feedback submitted successfully!";
      } else {
        throw new Error("Failed to submit feedback");
      }
    } catch (error) {
      throw error;
    }
  }