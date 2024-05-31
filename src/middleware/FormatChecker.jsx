const emailRegex = (email) => {
    const regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*)(\.[a-zA-Z]{2,})$/
    return regex.test(email)
}  

const localStorageToUserClass = (userDetails) => {
    return {
        userID: userDetails.user_ID,
        userName: userDetails.user_name,
        userEmail: userDetails.user_email,
        displayPictureID: userDetails.dp_link
    }
}

export {
    emailRegex
}