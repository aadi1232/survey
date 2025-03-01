document.addEventListener("DOMContentLoaded", function () {
  function injectSurveyForm() {
    // Define the survey form
    const surveyFormHTML = `
      <form id="survey-form" style="padding: 15px; border: 1px solid #ccc; margin-top: 20px;">
        <h3>Your Feedback Matters!</h3>
        <label>How was your shopping experience?</label>
        <input type="text" id="survey-response" placeholder="Type your response..." style="width: 100%; margin-bottom: 10px;"/>
        <button type="submit">Submit</button>
      </form>
    `;

    // Find the correct cart container (Use the one that worked manually)
    const cartContainer = document.querySelector(".cart__contents") || 
                          document.querySelector(".cart") || 
                          document.querySelector("form[action='/cart']") ||
                          document.querySelector("[data-cart-container]") ||
                          document.querySelector("main");

    if (cartContainer && !document.querySelector("#survey-form")) {
      // Prevent duplicate injections
      cartContainer.insertAdjacentHTML("beforeend", surveyFormHTML);
      console.log("✅ Survey form injected successfully!");
      setupFormSubmission();
    } else {
      console.log("⏳ Waiting for the Cart Page to load...");
    }
  }

  function setupFormSubmission() {
    document.getElementById("survey-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const response = document.getElementById("survey-response").value;

      fetch("http://localhost:5000/api/survey/submit", {  // Change this to your backend URL if deployed
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      })
        .then((res) => res.json())
        .then((data) => alert("Thank you for your feedback!"))
        .catch((error) => alert("Error submitting survey."));
    });
  }

  // Keep checking every 2 seconds until the form is injected
  const interval = setInterval(() => {
    injectSurveyForm();
    if (document.querySelector("#survey-form")) {
      clearInterval(interval); // Stop checking once the form is injected
    }
  }, 2000);
});
