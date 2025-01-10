const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const copyBtn = document.querySelector("[data-copy]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const inputSlider = document.querySelector("[data-lengthSlider]");

// checkboxes
const uppercaseCheck = document.querySelector("#Uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#Symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

// strength indicator
const indicator = document.querySelector("[data-indicator]");

// generate pass btn
const generateBtn = document.querySelector(".generateButton");

// symbols
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


// Setting Initial Conditions as page gets open or default situations
uppercaseCheck.checked = true;
let password = ""; 
let passwordLength = 10;
let checkCount = 1;



// set indicator circle as grey
setIndicator("#ccc");


// set passwordLength or update everytime change of pass length on UI
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    // to add black color to remaining slider portion
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max-min)) + "% 100%";

}

handleSlider();

// setting indicator color
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow =  `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumber() {
    return getRndInteger(1,10); 
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97,123));
    // beacuse ASCII value of (a to z) = (97 to 123)
}

function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65,91));
  // beacuse ASCII value of (A to Z) = (65 to 91)
}

function generateSymbol() {
    const randNum =  getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    // can i use .ariaChecked
    if(uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength >=8) {
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6)
    {
        setIndicator("#ff0");
    } 
    else{
        setIndicator("#f00");
    }
}

async function copyContent () {

    try {
        // using navigator method to copy to the clipboard
        if(password === "")
        {
            alert('First generate password to Copy');
            throw 'Failed';
        }

        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed to copy";
    }
    // to make copy wala span visible by adding active class to this element and then removing is after 2 seconds.
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

}

// to shufflePassword we use an algorithm Fisher Yates Method
function shufflePassword(array) {
    // fisher Yates method
    for(let i = array.length - 1; i > 0; i--)
    {
        const j =  Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// this process recounts all the checked and not checked boxes
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            {
                checkCount++;
            }
    });
        
    // special conercase 
    if(passwordLength < checkCount)
        {
            passwordLength = checkCount;
            handleSlider();
        }
}
        
// After creating all the functions we will create event listners

// a forEach loop used to add eventlisnters to every check box to keep an aacount whether the state of any checkbox got changed
allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

// to get the new value changed by user by moving the slider, since the slider got updated value so we copy this value to passwordLength variable and call handleSlider fucntion to update the same value on UI.
inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

// to add condition that if there is some value in the inputdisplay then only user can copy other wise it will not work 
copyBtn.addEventListener('click', () => {

    // if there is some value in passwordDisplay then only copycontent by calling copycontent();
    if(passwordDisplay.value)
    {
        copyContent();
    }
});

// when no check box is ticked then password could not be generated, user needs to markcheck at least 1 check box to generate password

// generate Password event listner on the btn
generateBtn.addEventListener('click', () => {
    // case if none of the checkbox are selected
    if(checkCount <= 0)
    {
        alert('Atleast check one checkbox');
        return;
    }
            
    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's find new password 
    console.log("Starting the jorney");

    // now to find new password we need to remove previous value from the input 

    password = "";

    // let's put the stuff mentioned by the checkboxes

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }

    // to put random between lower,upper, symbol and number we need to put all the function in an array and then we will select at random the function to be called and so the random charater will be inserted in the password
    // and that too should be insterted and called in the array if it is checked by user 

    let funcArr = [];

    if(uppercaseCheck.checked)
    {   
        funcArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked)
    {
        funcArr.push(generateLowerCase);
    }

    if(symbolsCheck.checked)
    {
        funcArr.push(generateSymbol);
    }

    if(numbersCheck.checked)
    {
        funcArr.push(generateRandomNumber);
    }

    // for complusary addition - means which are checked
    for(let i = 0; i<funcArr.length; i++)
    {
        // to call and add necessary 1st characters
        password += funcArr[i]();
    }
    console.log("Compulsory addition done");

    // now if the length is greater than 4 then we need to include other characters at random as well and that lenght will be opt by passwordlength-funcArr.length
    for(let i = 0; i< (passwordLength - funcArr.length); i++)
    {
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex](); 
    }
    console.log("Remaining addition done");

    // shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling Done");
    //show to UI
    passwordDisplay.value = password;
    console.log("UI addition done");

    //calculate strength
    calcStrength();

});










