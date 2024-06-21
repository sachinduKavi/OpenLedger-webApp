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


export {
    saveEstimateReportQuery,
    getAllEstimationsQuery,
    deleteEstimationQuery
}