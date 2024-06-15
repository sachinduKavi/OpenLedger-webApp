import {header, mainDomain, temp_domain} from '../middleware/API'
import LedgerRecordModel from '../dataModels/LedgerRecordModel'
const cDomain = temp_domain

const createLedgerRecord = async (record) => {
    return await cDomain.post('ledger/createLedgerRecord', record, header)
} 


// Request to backend to fetch all the records from the database
const fetchAllLedgerRecords = async () => {
    const res = await cDomain.get('ledger/allLedgerRecords', header)
    let ledgerArray = null
    if(res.data.procedure) {
        const content = res.data.content
        ledgerArray = []
        content.forEach(element => {
            ledgerArray.push(new LedgerRecordModel(element))
        })
    }

    return {
        procedure: res.data.procedure,
        errorMessage: res.data.errorMessage,
        ledgerRecords: ledgerArray
    }
}


const getLegerCategories = async () => {
    return await cDomain.get('ledger/loadCategories', header)
}

export {
    createLedgerRecord,
    fetchAllLedgerRecords,
    getLegerCategories
}