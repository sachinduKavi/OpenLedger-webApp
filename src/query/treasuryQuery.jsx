import {mainDomain, temp_domain, header} from '../middleware/API'

const cDomain = temp_domain

// Send backend post request to create new treasury group
const createNewTreasuryQuery = async (treasury) => {
    return await cDomain.post('treasury/createTreasury', treasury, header)
}


export {
    createNewTreasuryQuery
}