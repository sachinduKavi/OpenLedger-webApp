import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const saveEstimateReportQuery = async (estimateDetails) => {
    return await cDomain.post('estimation/saveEstimation', estimateDetails, header)
}


export {
    saveEstimateReportQuery
}