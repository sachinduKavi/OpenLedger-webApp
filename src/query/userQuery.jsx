import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const getUserDetail = async (userID) => {
    return cDomain.post('user/loadUserDetails', {userID: userID}, header)
}



export {
    getUserDetail
}