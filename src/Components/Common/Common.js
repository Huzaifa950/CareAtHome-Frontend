const imgbbApiKey = '1e8d397f535c1e9aa72db24638e14e79';

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

async function uploadImageToImgBB(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload image to ImgBB');
        }

        const responseData = await response.json();

        if (responseData.success) {
            return responseData.data.url;
        } else {
            throw new Error('ImgBB upload failed: ' + responseData.error.message);
        }
    } catch (error) {
        console.error('Error uploading image to ImgBB:', error.message);
        return null;
    }
}

function formatDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

function isFirstTimeGreater(time1, time2) {
    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);

    if (hours1 > hours2) {
        return true;
    } else if (hours1 < hours2) {
        return false;
    } else {
        return minutes1 > minutes2;
    }
}

export {
    emailRegex,
    formatDate,
    alphabetRegex,
    validateRegex,
    alphaNumericRegex,
    capitalizeEachWord,
    isFirstTimeGreater,
    uploadImageToImgBB,
    capitalizeFirstLetter,
    alphabetWithSpaceRegex,
    alphaNumericWithUnderscoreRegex,
}