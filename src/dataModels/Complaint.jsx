class Complaint {
    #complaintID
    #publishedDate
    #treasuryID
    #publisherID
    #anonymous
    #caption
    #subject
    #status

    constructor({complaintID = null, publishedDate = null, treasuryID = null, publisherID = null, anonymous = true, caption = null, subject = null, status = null}) {
        this.#complaintID = complaintID
        this.#publishedDate = publishedDate
        this.#treasuryID = treasuryID
        this.#publisherID = complaintID
        this.#anonymous = anonymous
        this.#caption = caption
        this.#subject = subject
        this.#status = status
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