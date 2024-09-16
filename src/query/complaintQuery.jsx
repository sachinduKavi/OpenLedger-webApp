import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const createComplaintQuery = async (evidence) => {
    return await cDomain.post('complaint/createComplaint', evidence, header)
}


export {
    createComplaintQuery
}