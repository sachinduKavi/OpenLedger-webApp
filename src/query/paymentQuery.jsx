import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const generateHashCodeQuery = async (values) => {
    return await cDomain.post('transaction/generateHash', values, header)
}


export {
    generateHashCodeQuery
}