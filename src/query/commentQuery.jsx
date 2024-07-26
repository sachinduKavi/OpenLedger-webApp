import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain

const createCommentQuery = async (commentDetails) => {
    return await cDomain.post('comment/createComment', commentDetails, header)
}

const fetchAllCommentsQuery = async (recordID) => {
    return await cDomain.post('comment/fetchAllComment', {recordID: recordID}, header)
}

const deleteCommentQuery = async (commentID) => {
    return await cDomain.post('comment/deleteComment', {commentID: commentID}, header)
}


export {
    createCommentQuery,
    fetchAllCommentsQuery,
    deleteCommentQuery
}