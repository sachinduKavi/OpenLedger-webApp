import {header, mainDomain, temp_domain} from '../middleware/API'
const cDomain = temp_domain


const createAnnouncementQuery = async (announcementDetails) => {
    return await cDomain.post('announcement/createAnnouncement', announcementDetails, header)
}


const fetchALlAnnouncementsQuery = async () => {
    return await cDomain.get('announcement/loadAllAnnouncements', header)
}

const deleteAnnouncementQuery = async (announcementID) => {
    return await cDomain.post('announcement/deleteAnnouncement', {announcementID: announcementID}, header)
}

const toggleAnnouncementLikeQuery =  async (announcementID) => {
    return await cDomain.post('announcement/toggleLike', {announcementID: announcementID}, header)
}


export {
    createAnnouncementQuery,
    fetchALlAnnouncementsQuery,
    deleteAnnouncementQuery,
    toggleAnnouncementLikeQuery
}