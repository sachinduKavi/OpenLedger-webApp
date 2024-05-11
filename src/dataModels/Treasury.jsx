import {createNewTreasuryQuery} from '../query/treasuryQuery'

class Treasury {
    // Private Treasury variables
    #treasuryID
    #treasuryName
    #description
    #memberLimit
    #coverImageID
    #treasuryLink
    #qrImageID
    #globalVisibility
    #publicTreasury
    #coverImageLink
    #ownerID

    // Creating new treasury instant
    constructor({treasuryName = null, description = null, memberLimit = null, coverImageLink = null, publicTreasury = null, ownerID = null}) {
        this.#treasuryName = treasuryName
        this.#description = description
        this.#memberLimit = memberLimit
        this.#coverImageLink = coverImageLink
        this.#publicTreasury = publicTreasury
        this.#ownerID = ownerID
    }

    // Call create treasury query to call backend
    async sendDataToBackend() {
        return await createNewTreasuryQuery({
            treasury_name: this.#treasuryName,
            description: this.#description,
            member_limit: this.#memberLimit,
            cover_image_link: this.#coverImageLink,
            public_treasury: this.#publicTreasury,
            owner_id: this.#ownerID
        })
    }

    // Display all the values in the instant
    toString() {
        console.log(this.getAll())
    }
    

    getTreasuryID() {
        return this.#treasuryID
    }

    getTreasuryName() {
        return this.#treasuryName
    }

    getDescription() {
        return this.#description
    }

    getMemberLimit() {
        return this.#memberLimit
    }

    getCoverImageID() {
        return this.#coverImageID
    }

    getTreasuryLink() {
        return this.#treasuryLink
    }

    getQrImageID() {
        return this.#qrImageID
    }

    getGlobalVisibility() {
        return this.#globalVisibility
    }

    getPublic() {
        return this.#publicTreasury
    }

    getOwnerID() {
        return this.#ownerID
    }



    setTreasuryID(treasuryID) {
        this.#treasuryID = treasuryID
    }

    setTreasuryName(treasuryName) {
        this.#treasuryName = treasuryName
    }

    setDescription(description) {
        this.#description = description
    }

    setMemberLimit(memberLimit) {
        this.#memberLimit = memberLimit
    }

    setCoverImageID(coverImageID) {
        this.#coverImageID = coverImageID
    }

    setTreasuryLink(treasuryLink) {
        this.#treasuryLink = treasuryLink
    }

    setQrImageID(qrImageID) {
        this.#qrImageID = qrImageID
    }

    setGlobalVisibility(globalVisibility) {
        this.#globalVisibility = globalVisibility
    }

    setPublic(publicTreasury) {
        this.#publicTreasury = publicTreasury
    }

    setOwnerID(ownerID) {
        this.#ownerID = ownerID
    }

    getAll() {
        return [
            this.getTreasuryID(),
            this.getTreasuryName(),
            this.getDescription(),
            this.getMemberLimit(),
            this.getCoverImageID(),
            this.getTreasuryLink(),
            this.getQrImageID(),
            this.getGlobalVisibility(),
            this.getPublic(),
            this.getOwnerID()
        ]
    }
    setAll(treasuryID, treasuryName, description, memberLimit, coverImageID, treasuryLink, qrImageID, globalVisibility, publicTreasury, ownerID) {
        this.setTreasuryID(treasuryID)
        this.setTreasuryName(treasuryName)
        this.setDescription(description)
        this.setMemberLimit(memberLimit)
        this.setCoverImageID(coverImageID)
        this.setTreasuryLink(treasuryLink)
        this.setQrImageID(qrImageID)
        this.setGlobalVisibility(globalVisibility)
        this.setPublic(publicTreasury)
        this.setOwnerID(ownerID)
    }

    
}

export default Treasury
