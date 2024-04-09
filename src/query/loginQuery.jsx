import {mainDomain, temp_domain, header} from '../middleware/API'

const cDomain = temp_domain

// Call API to check whether the user credentials are correct
const userLogin = async (user) => {
    const res = await cDomain.post('user/checkLogin', user, header)
    return res.data
}

export {userLogin}