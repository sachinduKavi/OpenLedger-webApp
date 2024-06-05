import {header, mainDomain, temp_domain} from '../middleware/API'

const cDomain = temp_domain

const createLedgerRecord = async (record) => {
    return await cDomain.post('ledger/createLedgerRecord', record, header)
} 


// Request to backend to fetch all the records from the database
const fetchAllLedgerRecords = async () => {
    const res = await cDomain.get('ledger/allLedgerRecords', header)
    console.log(res)
}

export {
    createLedgerRecord,
    fetchAllLedgerRecords
}