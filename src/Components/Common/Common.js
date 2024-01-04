const alphaNumericWithUnderscoreRegex = /^[a-zA-Z0-9_]*$/;
const alphaNumericRegex = /^[a-zA-Z0-9]*$/;
const alphabetRegex = /^[a-zA-Z]*$/;
const alphabetWithSpaceRegex = /^[a-zA-Z ]*$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const validateRegex = (string, regex) => {
    return regex.test(string);
}

function capitalizeFirstLetter(inputString) {
    inputString = inputString.toLowerCase();
    return inputString.replace(/\b\w/g, match => match.toUpperCase());
}

export {
    emailRegex,
    alphabetRegex,
    validateRegex,
    alphaNumericRegex,
    capitalizeFirstLetter,
    alphabetWithSpaceRegex,
    alphaNumericWithUnderscoreRegex,
}