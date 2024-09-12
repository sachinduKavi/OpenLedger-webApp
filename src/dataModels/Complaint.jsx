import Evidence from "./Evidence"
import { isClassObject } from "../middleware/auth"

class Complaint {
    #complaintID
    #publishedDate
    #treasuryID
    #publisherID
    #anonymous
    #caption
    #subject
    #status
    #evidenceArray

    constructor({complaintID = null, publishedDate = null, treasuryID = null, publisherID = null, anonymous = true, caption = null, subject = null, status = null, evidenceArray = []}) {
        this.#complaintID = complaintID
        this.#publishedDate = publishedDate
        this.#treasuryID = treasuryID
        this.#publisherID = publisherID
        this.#anonymous = anonymous
        this.#caption = caption
        this.#subject = subject
        this.#status = status
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


    // Upload evidence images to firebase and creating evidenceLink array
    async uploadEvidenceImages() {
        if(this.#evidenceArray !== null) {
            // Clear to proceed
            for(let i = 0; i < this.#evidenceArray.length; i++) {
                // Images are uploaded to the firebase to their relevant repository 
                // New image link is generated and assigned it to the Evidence object
                this.#evidenceArray[i].setImageName(v4()) // set evidence image name for random string 
                const imageLink = await uploadImageFireStore(this.#evidenceArray[i].getImageFile(), `evidence/${this.#treasuryID}/${this.#evidenceArray[i].getImageName()}`)
                this.#evidenceArray[i].setImageLink(imageLink)
            }
        } else {
            // Evidence array is not set
            console.log('Evidence array is null')
        }
    }

    extractJSON() {
        return {
            complaintID: this.#complaintID,
            publishedDate: this.#publishedDate,
            treasuryID: this.#treasuryID,
            publishedDate: this.#publishedDate,
            publisherID: this.#publisherID,
            anonymous: this.#anonymous,
            caption: this.#caption,
            subject: this.#subject,
            status: this.#status
        }
    }



    // Getters
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