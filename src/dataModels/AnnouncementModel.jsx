import {generateCurrentDate} from '../middleware/GenerateCurrentDateTime'
import { createAnnouncementQuery, deleteAnnouncementQuery, fetchALlAnnouncementsQuery, toggleAnnouncementLikeQuery } from '../query/announcementQuery'

class AnnouncementModel {
  #announcementID
  #publishDate
  #treasuryID
  #publisherID
  #publisherName
  #caption
  #imageLink
  #commentArray
  #likeCount
  #publisherDP

  constructor({
    announcementID = 'AUTO',
    publishDate = generateCurrentDate(),
    treasuryID = null,
    publisherID = null,
    publisherName = null,
    caption = '',
    imageLink = null,
    commentArray = [],
    likeCount = null,
    publisherDP = null
  }) {
    this.#announcementID = announcementID
    this.#publishDate = publishDate
    this.#treasuryID = treasuryID
    this.#publisherID = publisherID
    this.#publisherName = publisherName
    this.#caption = caption
    this.#imageLink = imageLink
    this.#commentArray = commentArray
    this.#likeCount = likeCount,
    this.#publisherDP = publisherDP
  }

  extractJSON() {
    return {
      announcementID: this.#announcementID,
      publishDate: this.#publishDate,
      treasuryID: this.#treasuryID,
      publisherName: this.#publisherName,
      caption: this.#caption,
      imageLink: this.#imageLink,
      commentArray: this.#commentArray,
      likeCount: this.#likeCount,
      publisherDP: this.#publisherDP
    }
  }

  // Creating new announcement
  async createNewAnnouncement() {
    const response = await createAnnouncementQuery(this.extractJSON())
    return response.status === 200 
      ? {
        proceed: response.data.proceed,
        errorMessage: response.data.errorMessage
      }
      : false
  }


  // Delete announcement record 
  async deleteAnnouncement() {
    const response = await deleteAnnouncementQuery(this.#announcementID)
    return response.status === 200 && response.data.proceed
  }


  // Toggle announcement post like
  async togglePostLike() {
    const response = await toggleAnnouncementLikeQuery(this.#announcementID)
    return response.status === 200 && response.data.proceed && response.data.content !== 'error'
    ? response.data.content : false
  }

  

  // Loading all the announcements from the backend
  static async fetchAllAnnouncements() {
    const response = await fetchALlAnnouncementsQuery()

    let announcementList = []
    if(response.status === 200 && response.data.proceed) {
      response.data.content.forEach(element => {
        announcementList.push(new AnnouncementModel(element))
      });
    } 

    return announcementList
  }

  // Getters
  getPublisherDP() {
    return this.#publisherDP
  }


  getAnnouncementID() {
    return this.#announcementID
  }

  getPublishDate() {
    return this.#publishDate
  }

  getTreasuryID() {
    return this.#treasuryID
  }

  getPublisherID() {
    return this.#publisherID
  }

  getPublisherName() {
    return this.#publisherName
  }

  getCaption() {
    return this.#caption
  }

  getImageLink() {
    return this.#imageLink
  }

  getCommentArray() {
    return this.#commentArray
  }

  getLikeCount() {
    return this.#likeCount
  }

  // Setters
  setPublisherDP(publisherDP) {
    this.#publisherDP = publisherDP
  }

  setAnnouncementID(announcementID) {
    this.#announcementID = announcementID
  }

  setPublishDate(publishDate) {
    this.#publishDate = publishDate
  }

  setTreasuryID(treasuryID) {
    this.#treasuryID = treasuryID
  }

  setPublisherID(publisherID) {
    this.#publisherID = publisherID
  }

  setPublisherName(publisherName) {
    this.#publisherName = publisherName
  }

  setCaption(caption) {
    this.#caption = caption
  }

  setImageLink(imageLink) {
    this.#imageLink = imageLink
  }

  setCommentArray(commentArray) {
    this.#commentArray = commentArray
  }

  setLikeCount(likeCount) {
    this.#likeCount = likeCount
  }

  
}

export default AnnouncementModel
