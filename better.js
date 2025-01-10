// Better Approach
function getRandomCharacter(charSet) {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

function generatePassword(length, options) {
  const { uppercase, lowercase, numbers, symbols } = options;

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charPool = "";
  if (uppercase) charPool += uppercaseChars;
  if (lowercase) charPool += lowercaseChars;
  if (numbers) charPool += numberChars;
  if (symbols) charPool += symbolChars;

  if (charPool === "") return "Select at least one option";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += getRandomCharacter(charPool);
  }
  return password;
}

document.querySelector(".generateButton").addEventListener("click", () => {
  const length = parseInt(
    document.querySelector("[data-lengthSlider]").value,
    10
  );
  const options = {
    uppercase: document.getElementById("Uppercase").checked,
    lowercase: document.getElementById("lowercase").checked,
    numbers: document.getElementById("numbers").checked,
    symbols: document.getElementById("Symbols").checked,
  };

  const password = generatePassword(length, options);
  document.querySelector("[data-passwordDisplay]").value = password;
});
