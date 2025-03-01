document.addEventListener("DOMContentLoaded", function () {
    const surveyFormHTML = `
      <form id="survey-form" style="padding: 15px; border: 1px solid #ccc; margin-top: 20px;">
        <h3>Your Feedback Matters!</h3>
        <label>How was your shopping experience?</label>
        <input type="text" id="survey-response" placeholder="Type your response..." style="width: 100%; margin-bottom: 10px;"/>
        <button type="submit">Submit</button>
      </form>
    `;
  
    // Insert the survey form into the Cart Page
    const cartContainer = document.querySelector(".cart");
    if (cartContainer) {
      cartContainer.insertAdjacentHTML("beforeend", surveyFormHTML);
    }
  
    // Handle form submission
    document.getElementById("survey-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const response = document.getElementById("survey-response").value;
  
      fetch("https://your-backend-url.com/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      })
        .then((res) => res.json())
        .then((data) => alert("Thank you for your feedback!"))
        .catch((error) => alert("Error submitting survey."));
    });
  });
  