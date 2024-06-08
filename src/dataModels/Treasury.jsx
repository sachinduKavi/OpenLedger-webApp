import {createNewTreasuryQuery, getTreasuryDetails} from '../query/treasuryQuery'

class Treasury {
    // Private Treasury variables
    #treasuryID
    #treasuryName
    #description
    #memberLimit
    #createdDate
    #coverImageID
    #treasuryLink
    #globalVisibility
    #publicTreasury
    #ownerID
    #currentBalance
    #userRole

    // Creating new treasury instant
    constructor({treasuryID = null, treasuryName = null, description = null, memberLimit = null, coverImageID = null, treasuryLink = null, publicTreasury = null, ownerID = null, globalVisibility = null, createdDate = null, currentBalance = null, userRole = null}) {
        this.#treasuryID = treasuryID
        this.#treasuryName = treasuryName
        this.#description = description
        this.#memberLimit = memberLimit
        this.#coverImageID = coverImageID
        this.#createdDate = createdDate?.toString().slice(0, 10)?? null
        this.#treasuryLink = treasuryLink
        this.#publicTreasury = publicTreasury
        this.#ownerID = ownerID
        this.#globalVisibility = globalVisibility
        this.#currentBalance = currentBalance
        this.#userRole = userRole

        console.log('treasury constructor is running')
    }

    // Reset all the instant variables ....
    setAllValues({treasuryID = null, treasuryName = null, description = null, memberLimit = null, coverImageID = null, treasuryLink = null, publicTreasury = null, ownerID = null, globalVisibility = null, createdDate = null, currentBalance = null, userRole = null}) {
        this.#treasuryID = treasuryID
        this.#treasuryName = treasuryName
        this.#description = description
        this.#memberLimit = memberLimit
        this.#coverImageID = coverImageID
        this.#createdDate = createdDate?.toString().slice(0, 10)?? null
        this.#treasuryLink = treasuryLink
        this.#publicTreasury = publicTreasury
        this.#ownerID = ownerID
        this.#globalVisibility = globalVisibility
        this.#currentBalance = currentBalance
        this.#userRole = userRole

        console.log('treasury running set all function')
    }



    // Refresh data 
    async refreshTreasuryDetails() {
        const treasuryData = await getTreasuryDetails(this.#treasuryID)
        console.log('treasury respond', treasuryData)
        if(treasuryData.data.process)
            this.setAllValues(treasuryData.data.content)
    }

    extractJSON() {
        return {
            treasuryID: this.#treasuryID,
            treasuryName: this.#treasuryName,
            description: this.#description,
            memberLimit: this.#memberLimit,
            createdDate: this.#createdDate,
            coverImageID: this.#coverImageID,
            treasuryLink: this.#treasuryLink,
            globalVisibility: this.#globalVisibility,
            publicTreasury: this.#publicTreasury,
            ownerID: this.#ownerID,
            currentBalance: this.#currentBalance,
            useRole: this.#userRole
        }
    }

    // Call create treasury query to call backend
    async sendDataToBackend() {
        const date = new Date()
        console.log('Creation date',  date)
        // Update treasury database
        return await createNewTreasuryQuery({
            treasury_name: this.#treasuryName,
            created_date: date,
            description: this.#description,
            member_limit: this.#memberLimit,
            cover_image_link: this.#coverImageID,
            public_treasury: this.#publicTreasury,
            owner_id: this.#ownerID
        })
    }

    // Display all the values in the instant
    toString() {
        return 'This is treasury object'
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


    getGlobalVisibility() {
        return this.#globalVisibility
    }

    getPublic() {
        return this.#publicTreasury
    }

    getOwnerID() {
        return this.#ownerID
    }

    getBalance() {
        return this.#currentBalance
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

    setGlobalVisibility(globalVisibility) {
        this.#globalVisibility = globalVisibility
    }

    setPublic(publicTreasury) {
        this.#publicTreasury = publicTreasury
    }

    setOwnerID(ownerID) {
        this.#ownerID = ownerID
    }

    setUserRole(userRole) {
        this.#userRole = userRole
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
