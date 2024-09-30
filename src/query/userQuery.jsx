import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const getUserDetail = async (userID) => {
    return await cDomain.post('user/loadUserDetails', {userID: userID}, header)
}

const updateUserQuery = async (userDetails) => {
    return await cDomain.put('user/updateUserDetails', userDetails, header)
}

const joinRequestQuery = async (credentials, treasuryID) => {
    return await cDomain.post('user/joinRequest', {...credentials, treasuryID: treasuryID}, header)
}

const loadTreasuryRequestsQuery = async () => {
    return await cDomain.get('treasury/loadJoinRequest', header)
}

const deleteRequestQuery = async (requestID) => {
    return await cDomain.put('treasury/deleteRequest', {requestID: requestID}, header)
}


export {
    getUserDetail,
    updateUserQuery,
    joinRequestQuery,
    loadTreasuryRequestsQuery,
    deleteRequestQuery
}