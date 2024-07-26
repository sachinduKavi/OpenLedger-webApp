import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain

const createCommentQuery = async (commentDetails) => {
    return await cDomain.post('comment/createComment', commentDetails, header)
}


export {
    createCommentQuery
}