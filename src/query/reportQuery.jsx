import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const saveEstimateReportQuery = async (estimateDetails) => {
    return await cDomain.post('estimation/saveEstimation', estimateDetails, header)
}

const getAllEstimationsQuery = async () => {
    return await cDomain.get('estimation/allEstimation', header)
}

const deleteEstimationQuery = async (estimationID) => {
    return await cDomain.post('estimation/deleteEstimation', {estimationID: estimationID}, header)
}

const saveCashflow = async (cashflowData) => {
    return await cDomain.post('cashflow/saveCashflow', cashflowData, header)
}

const getAllCashflow = async () => {
    return await cDomain.get('cashflow/loadAllCashflow', header)
}

const getCashflowReport = async (reportID) => {
    return await cDomain.post('cashflow/getCashflowReport', {reportID: reportID}, header)
}

const discardCashflowQuery = async (reportID) => {
    return await cDomain.put('cashflow/discard', {reportID: reportID}, header)
}

const collectionSaveQuery = async (collection) => {
    return await cDomain.post('collection/saveCollection', collection, header)
} 

const loadALlTreasuryCollections = async () => {
    return await cDomain.get('collection/getAllCollections', header)
}

const discardCollectionQuery =  async (collectionID) => {
    return await cDomain.put('collection/discardCollection', {collectionID: collectionID}, header)
}

const fetchSingleCollectionQuery = async (collectionID) => {
    return await cDomain.post('collection/fetchSingleRecord', {collectionID: collectionID}, header)
}

const collectionWithdrawQuery = async (collectionID, totalAmount, today) => {
    return await cDomain.post('collection/withdraw', {collectionID: collectionID, totalAmount: totalAmount, today: today}, header)
}
 

export {
    saveEstimateReportQuery,
    getAllEstimationsQuery,
    deleteEstimationQuery,
    saveCashflow,
    getAllCashflow,
    getCashflowReport,
    discardCashflowQuery,
    collectionSaveQuery,
    loadALlTreasuryCollections,
    discardCollectionQuery,
    fetchSingleCollectionQuery,
    collectionWithdrawQuery
}