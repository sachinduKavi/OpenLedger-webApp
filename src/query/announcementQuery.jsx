import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const createAnnouncementQuery = async (announcementDetails) => {
    return await cDomain.post('announcement/createAnnouncement', announcementDetails, header)
}


const fetchALlAnnouncementsQuery = async () => {
    return await cDomain.get('announcement/loadAllAnnouncements', header)
}


export {
    createAnnouncementQuery,
    fetchALlAnnouncementsQuery
}