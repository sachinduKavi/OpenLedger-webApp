import {mainDomain, temp_domain, header} from '../middleware/API'

const cDomain = temp_domain

// Send backend post request to create new treasury group
const createNewTreasuryQuery = async (treasury) => {
    return await cDomain.post('treasury/createTreasury', treasury, header)
}

// Retrieve all the treasury data form the backend which is relevant to the user_ID
const getAllTreasuryParticipantData = async () => {
    return await cDomain.get('treasury/getParticipant', header)
}

const verifyTreasury =  async (treasuryID) => {
    return await cDomain.post('treasury/verifyTreasury', {treasury_ID: treasuryID, setHeader: true}, header)
}

const getTreasuryDetails = async (treasuryID) => {
    return await cDomain.post('treasury/getTreasuryData', {treasuryID: treasuryID}, header)
}

const updateTreasuryDetailQuery = async (columnName, newValue) => {
    return await cDomain.post('treasury/updateTreasurySettings', {columnName: columnName, newValue: newValue}, header)
}

const getAllTreasuryParticipants = async () => {
    return await cDomain.get('treasury/getAllTreasuryParticipants', header)
}


export {
    createNewTreasuryQuery,
    getAllTreasuryParticipantData,
    verifyTreasury,
    getTreasuryDetails,
    updateTreasuryDetailQuery,
    getAllTreasuryParticipants
}