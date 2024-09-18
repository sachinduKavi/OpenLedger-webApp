import Evidence from "./Evidence"
import { v4 } from "uuid"
import {uploadImageFireStore} from '../query/firebaseImageUpload'
import { isClassObject } from "../middleware/auth"
import { generateCurrentDate } from "../middleware/GenerateCurrentDateTime"
import { createComplaintQuery, loadComplaintsQuery } from "../query/complaintQuery"

class Complaint {
    #complaintID
    #publishedDate
    #treasuryID
    #publisherID
    #anonymous
    #caption
    #subject
    #publisher
    #dpLink
    #status
    #evidenceArray
    #evidenceLinkArray

    constructor({complaintID = null, publishedDate = generateCurrentDate(), treasuryID = null, publisherID = null, anonymous = false, caption = null, subject = null, status = null, evidenceArray = [], evidenceLinkArray = [], publisher = null, dpLink = null}) {
        this.#complaintID = complaintID
        this.#publishedDate = publishedDate
        this.#treasuryID = treasuryID
        this.#publisherID = publisherID
        this.#anonymous = anonymous
        this.#caption = caption
        this.#subject = subject
        this.#status = status
        this.#publisher = publisher
        this.#dpLink = dpLink
        this.#evidenceLinkArray = evidenceLinkArray
        this.#evidenceArray = evidenceArray

        if (this.#evidenceArray.length > 0 && !isClassObject(this.#evidenceArray[0])) this.#convertToEvidenceObject()
    }

    // Converting Object array to class object array
    #convertToEvidenceObject() {
        let tempObjectArray = []
        this.#evidenceArray.forEach(element => {
            tempObjectArray.push(new Evidence(element))
        });
        this.#evidenceArray = tempObjectArray
    }


    // Get all the complaints
    static async loadAllComplaint() {
        const response = await loadComplaintsQuery()
        return (response.status === 200 && response.data.proceed)
            ? response.data.content.map(element => {return new Complaint(element)})
            : false
    }


    // Upload evidence images to firebase and creating evidenceLink array
    async uploadEvidenceImages() {
        if(this.#evidenceArray !== null) {
            // Clear to proceed
            this.#evidenceLinkArray = [] // Emptying the evidence array
            for(let i = 0; i < this.#evidenceArray.length; i++) {
                // Images are uploaded to the firebase to their relevant repository 
                // New image link is generated and assigned it to the Evidence object
                this.#evidenceArray[i].setImageName(v4()) // set evidence image name for random string 
                const imageLink = await uploadImageFireStore(this.#evidenceArray[i].getImageFile(), `evidence/${this.#treasuryID}/${this.#evidenceArray[i].getImageName()}`)
                this.#evidenceArray[i].setImageLink(imageLink)

                // Setting uploaded image and description 
                this.#evidenceLinkArray.push({
                    description: this.#evidenceArray[i].getDescription(),
                    link: imageLink
                })
            }
        } else {
            // Evidence array is not set
            console.log('Evidence array is null')
        }
    }


    async createNewComplaint() {
        const response = await createComplaintQuery(this.extractJSON())
        return response.status === 200 && response.data.proceed
    }

    extractJSON() {
        return {
            complaintID: this.#complaintID,
            publishedDate: this.#publishedDate,
            treasuryID: this.#treasuryID,
            publisherID: this.#publisherID,
            anonymous: this.#anonymous,
            caption: this.#caption,
            subject: this.#subject,
            status: this.#status,
            publisher: this.#publisher,
            dpLink: this.#dpLink,
            evidenceLinkArray: this.#evidenceLinkArray
        }
    }



    // Getters
    getPublisher() {
        return this.#publisher
    }

    getDpLink() {
        return this.#dpLink
    }

    getEvidenceArray() {
        return this.#evidenceArray
    }


    getComplaintID() {
        return this.#complaintID;
    }

    getPublishedDate() {
        return this.#publishedDate;
    }

    getTreasuryID() {
        return this.#treasuryID;
    }

    getPublisherID() {
        return this.#publisherID;
    }

    getAnonymous() {
        return this.#anonymous;
    }

    getCaption() {
        return this.#caption;
    }

    getSubject() {
        return this.#subject;
    }

    getStatus() {
        return this.#status;
    }

    // Setters
    setEvidenceArray(evidenceArray) {
        this.#evidenceArray = evidenceArray
    }


    setComplaintID(complaintID) {
        this.#complaintID = complaintID;
    }

    setPublishedDate(publishedDate) {
        this.#publishedDate = publishedDate;
    }

    setTreasuryID(treasuryID) {
        this.#treasuryID = treasuryID;
    }

    setPublisherID(publisherID) {
        this.#publisherID = publisherID;
    }

    setAnonymous(anonymous) {
        this.#anonymous = anonymous;
    }

    setCaption(caption) {
        this.#caption = caption;
    }

    setSubject(subject) {
        this.#subject = subject;
    }

    setStatus(status) {
        this.#status = status;
    }



}


export default Complaint