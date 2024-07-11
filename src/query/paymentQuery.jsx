import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const generateHashCodeQuery = async (values) => {
    return await cDomain.post('transaction/generateHash', values, header)
}


const createPaymentRecordQuery = (paymentDetails) => {
    return cDomain.post('transaction/paymentSuccess', paymentDetails, header)
}


export {
    generateHashCodeQuery,
    createPaymentRecordQuery
}