const stateSelect = document.getElementById("state");
const stateCodeInput = document.getElementById("stateCode");
const form = document.getElementById("testForm");
const result = document.getElementById("result");
const goToFormBtn = document.getElementById("goToForm");

// Auto-fill State Code
const stateCodes = {
  "AN": "01", "AP": "02", "AR": "03", "AS": "04", "BR": "05", "CH": "06", "CG": "07",
  "DN": "08", "DD": "09", "DL": "10", "GA": "11", "GJ": "12", "HR": "13", "HP": "14",
  "JK": "15", "JH": "16", "KA": "17", "KL": "18", "LA": "19", "LD": "20", "MP": "21",
  "MH": "22", "MN": "23", "ML": "24", "MZ": "25", "NL": "26", "OD": "27", "PY": "28",
  "PB": "29", "RJ": "30", "SK": "31", "TN": "32", "TS": "33", "TR": "34", "UP": "35",
  "UK": "36", "WB": "37"
};

stateSelect.addEventListener("change", function() {
  stateCodeInput.value = stateCodes[this.value] || "";
});

// On form submit, send data to the backend but STAY on the same page
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevents redirecting

  const category = document.querySelector('input[name="category"]:checked');
  const height = document.getElementById("height").value;
  const chest = document.getElementById("chest").value;
  const state = stateSelect.options[stateSelect.selectedIndex].text;
  const stateCode = stateCodeInput.value;

  // Basic input check
  if (!category || chest.trim() === "" || height.trim() === "" || stateSelect.value === "") {
    result.innerText = "Invalid input!";
    result.style.color = "red";
    goToFormBtn.style.display = "inline";
    return;
  }

  // Determine Pass/Fail (Example rule: height must be >=170 and chest min value >=90)
  const numericHeight = parseInt(height);
  const chestValues = chest.split("-").map(Number);
  let passFail = (numericHeight >= 170 && chestValues[0] >= 90) ? "Pass" : "Fail";

  // Build markdown entry
  const mdEntry = `| ${state} | ${stateCode} | ${category.value} | ${height} | ${chest} | ${passFail} |\n`;

  // Send the entry to the backend to append to data.md
  fetch("http://127.0.0.1:3000/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entry: mdEntry })
  })
  .then(response => response.text())
  .then(data => {
    result.innerText = "Form submitted & data saved!";
    result.style.color = "green";
    goToFormBtn.style.display = "inline";
  })
  .catch(error => {
    console.error("Error:", error);
    result.innerText = "Submission failed!";
    result.style.color = "red";
  });
});
