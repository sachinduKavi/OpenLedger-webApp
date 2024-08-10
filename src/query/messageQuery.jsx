import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const newMessageQuery = async (message) => {
    return cDomain.post('message/newMessage', message, header)
}

const loadMessageBlock = async (block) => {
    return cDomain.post('message/fetchMessage', {block: block}, header)
}

export {
    newMessageQuery,
    loadMessageBlock
}