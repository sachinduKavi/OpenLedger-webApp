const emailRegex = (email) => {
    const regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)(\.[a-zA-Z]{2,})$/
    return regex.test(email)
}  

const mobileNumberRegex = (number) => {
    const regex = /^\d{10}$/;
    return regex.test(number);
}

const localStorageToUserClass = (userDetails) => {
    return {
        userID: userDetails.user_ID,
        userName: userDetails.user_name,
        userEmail: userDetails.user_email,
        displayPictureID: userDetails.dp_link
    }
}

function numberFormat(number) {
    return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
  }

export {
    emailRegex,
    numberFormat,
    mobileNumberRegex
}