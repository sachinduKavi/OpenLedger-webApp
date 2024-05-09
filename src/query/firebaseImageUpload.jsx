import {storage} from '../middleware/firebaseConfig'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'



// This function directly interacting with the firebase storage to upload user profile pictures
// Fire store picture uploading 
const uploadImageFireStore = async (imageFile, userImageID) => {
    const imageRef = ref(storage, userImageID)
    await uploadBytes(imageRef, imageFile).then(res => {
        console.log('Image uploaded' , res)
    })
    return getDownloadURL(imageRef)
}



export {
    uploadImageFireStore
}
