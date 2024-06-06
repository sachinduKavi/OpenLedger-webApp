import {temp_domain, header, mainDomain} from '../middleware/API'
import {storage} from '../middleware/firebaseConfig'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'

// Change the whole system api address
const cDomain = temp_domain

// Send post request through axios to the api backend 
// Registration step 01
const verificationCode = async (user_email) => {
    console.log('Inside the verification code')
    
    const response = await cDomain.post('user/verificationCode', {userEmail: user_email}, header)
    console.log(response)
    return {
        data: response.data.codeSent,
        error: response.data.error,
        statusCode: response.status
    }
}

// Registration step 02 
// Checking the code 
const emailValidation = async (user_email, pinNumber) => {
    console.log(user_email, pinNumber)
    // try{
        const response = await cDomain.post('user/codeValidation', {userEmail:user_email, code:pinNumber}, header)
        console.log("Response", response)
        return {
            validity: response.data.email_validation,
            statusCode: response.status
        }
}

// This function directly interacting with the firebase storage to upload user profile pictures
// Fire store picture uploading 
const profilePictureUpload = async (imageFile, userImageID) => {
    const imageRef = ref(storage, `user_images/${userImageID}`)
    await uploadBytes(imageRef, imageFile).then(res=> {
        console.log('Image uploaded' , res)
    })
    return getDownloadURL(imageRef)
}


// Registration step 03
// Final step of the registration process all the data of the user are send to the api to create an account
const userRegistration = async (userDetails) => {
    console.log("Inside the user registration...")
    console.log("User Details", userDetails)

    const response = await cDomain.post('user/newUserRegistration', {...userDetails, setHeader: true}, header)
    return {process:response.data.process_success, content: response.data.content}
}


export {verificationCode, emailValidation, profilePictureUpload, userRegistration}



