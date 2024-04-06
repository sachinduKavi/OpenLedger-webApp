import {temp_domain, header, mainDomain} from '../middleware/API'
import {storage} from '../middleware/firebaseConfig'
import {ref, uploadBytes} from 'firebase/storage'

// Send post request through axios to the api backend 
const verificationCode = async (user_email) => {
    console.log('Inside the verification code')
    const response = await mainDomain.post('user/verificationCode', {userEmail: user_email}, header)
    console.log(response)
    return {
        data: response.data.codeSent,
        statusCode: response.status
    }
}

const emailValidation = async (user_email, pinNumber) => {
    console.log(user_email, pinNumber)
    console.log('Inside the email validation')
    // try{
        const response = await mainDomain.post('user/codeValidation', {userEmail:user_email, code:pinNumber}, header)
        console.log('testing...')
        console.log("Response", response)
        return {
            validity: response.data.email_validation,
            statusCode: response.status
        }
}

// This function directly interacting with the firebase storage to upload user profile pictures
const profilePictureUpload = async (imageFile, userImageID) => {
    const imageRef = ref(storage, `user_images/${userImageID}`)
    await uploadBytes(imageRef, imageFile).then(res=> {
        alert('Image Uploaded')
    })
}

// Final step of the registration process all the data of the user are send to the api to create an account
const userRegistration = async (userDetails) => {
    console.log("Inside the user registration...")
    console.log(userDetails)

    const response = await mainDomain.post('user/newUserRegistration', userDetails, header)
    
    return response.data.process_success
}


export {verificationCode, emailValidation, profilePictureUpload, userRegistration}



