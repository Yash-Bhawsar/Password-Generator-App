// Optimal Approach
function getRandomCharacter(charSet) {
  return charSet[Math.floor(Math.random() * charSet.length)];
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function generatePassword(length, options) {
  const { uppercase, lowercase, numbers, symbols } = options;

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charPool = "";
  const guaranteedChars = [];

  if (uppercase) {
    charPool += uppercaseChars;
    guaranteedChars.push(getRandomCharacter(uppercaseChars));
  }
  if (lowercase) {
    charPool += lowercaseChars;
    guaranteedChars.push(getRandomCharacter(lowercaseChars));
  }
  if (numbers) {
    charPool += numberChars;
    guaranteedChars.push(getRandomCharacter(numberChars));
  }
  if (symbols) {
    charPool += symbolChars;
    guaranteedChars.push(getRandomCharacter(symbolChars));
  }

  if (charPool === "") return "Select at least one option";

  const passwordArray = [];
  for (let i = 0; i < length - guaranteedChars.length; i++) {
    passwordArray.push(getRandomCharacter(charPool));
  }

  const finalPassword = shuffleArray([
    ...passwordArray,
    ...guaranteedChars,
  ]).join("");
  return finalPassword;
}

function updateStrengthIndicator(length, options) {
  const indicator = document.querySelector("[data-indicator]");
  let strength = 0;

  if (options.uppercase) strength++;
  if (options.lowercase) strength++;
  if (options.numbers) strength++;
  if (options.symbols) strength++;
  if (length > 12) strength++;

  const colors = ["red", "orange", "yellow", "green", "darkgreen"];
  indicator.style.backgroundColor =
    colors[Math.min(strength, colors.length - 1)];
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
  updateStrengthIndicator(length, options);
});
