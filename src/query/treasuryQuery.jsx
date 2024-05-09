import {mainDomain, temp_domain, header} from '../middleware/API'

const cDomain = temp_domain

// Send backend post request to create new treasury group
const createNewTreasuryQuery = async (treasury) => {
    const response = await cDomain.post('treasury/createTreasury', treasury, header)
    return response
}


export {
    createNewTreasuryQuery
}