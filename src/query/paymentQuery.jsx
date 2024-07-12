import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const generateHashCodeQuery = async (values) => {
    return await cDomain.post('transaction/generateHash', values, header)
}


const createPaymentRecordQuery = async (paymentDetails) => {
    return await cDomain.post('transaction/paymentSuccess', paymentDetails, header)
}

const getAllPaymentsQuery = async () => {
    return await cDomain.get('transaction/loadAllTreasuryTransactions', header)
}


export {
    generateHashCodeQuery,
    createPaymentRecordQuery,
    getAllPaymentsQuery
}