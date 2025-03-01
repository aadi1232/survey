document.addEventListener("DOMContentLoaded", function () {
  // Wait until the cart page fully loads
  setTimeout(() => {
    const surveyFormHTML = `
      <form id="survey-form" style="padding: 15px; border: 1px solid #ccc; margin-top: 20px;">
        <h3>Your Feedback Matters!</h3>
        <label>How was your shopping experience?</label>
        <input type="text" id="survey-response" placeholder="Type your response..." style="width: 100%; margin-bottom: 10px;"/>
        <button type="submit">Submit</button>
      </form>
    `;

    // Find the correct cart container and inject the form
    const cartContainer = document.querySelector(".cart__contents") || document.querySelector(".cart") || document.querySelector("form[action='/cart']");

    if (cartContainer) {
      cartContainer.insertAdjacentHTML("beforeend", surveyFormHTML);
      console.log("✅ Survey form injected successfully!");
    } else {
      console.log("❌ Cart container not found! Check class names.");
    }

    // Handle form submission
    document.getElementById("survey-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const response = document.getElementById("survey-response").value;

      fetch("http://localhost:5000/api/survey/submit", {  // Replace with your backend URL if deployed
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      })
        .then((res) => res.json())
        .then((data) => alert("Thank you for your feedback!"))
        .catch((error) => alert("Error submitting survey."));
    });

  }, 3000); // Wait 3 seconds to ensure page loads fully
});
