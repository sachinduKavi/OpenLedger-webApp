import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain

const createVoteQuery = async(vote) => {
    return await cDomain.post('vote/createPoll', vote, header)
}


const loadAllVotes = async () => {
    return await cDomain.get('vote/loadVotes', header)
}

export {
    createVoteQuery,
    loadAllVotes
}