import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain

const createVoteQuery = async(vote) => {
    return await cDomain.post('vote/createPoll', vote, header)
}


const loadAllVotesQuery = async () => {
    return await cDomain.get('vote/loadVotes', header)
}


const updatePoll = async (voteID, optionID, state, multiple) => {
    return await cDomain.put('vote/updatePoll', {voteID: voteID, optionID: optionID, state: state, multiple: multiple}, header)
}

const deletePollQuery = async (voteID) => {
    return await cDomain.put('vote/deletePoll', {voteID: voteID}, header)
}

export {
    createVoteQuery,
    loadAllVotesQuery,
    updatePoll,
    deletePollQuery
}