// Brute Force Approach
document.querySelector(".generateButton").addEventListener("click", () => {
  const length = document.querySelector("[data-lengthSlider]").value;
  const includeUppercase = document.getElementById("Uppercase").checked;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("Symbols").checked;

  // Character sets
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charPool = "";
  if (includeUppercase) charPool += uppercaseChars;
  if (includeLowercase) charPool += lowercaseChars;
  if (includeNumbers) charPool += numberChars;
  if (includeSymbols) charPool += symbolChars;

  if (charPool === "") {
    alert("Please select at least one character type!");
    return;
  }

  // Generate password
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  // Display password
  document.querySelector("[data-passwordDisplay]").value = password;
});
