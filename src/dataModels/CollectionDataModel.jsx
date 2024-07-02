class CollectionModel {
    #collectionID
    #collectionName
    #amount
    #treasuryAllocation
    #dividedAmount
    #description
    #publishedDate
    #deadline
    #participantArray
    #manualAssigned

    static autoAssignCount = 0

    constructor({collectionID = null, collectionName = null, amount = 0, treasuryAllocation = 0, description = null, publishedDate = null, deadline = null, participantArray = []}, manualAssigned = 0) {
        this.#collectionID = collectionID
        this.#collectionName = collectionName
        this.#amount = amount
        this.#treasuryAllocation = treasuryAllocation
        this.#dividedAmount = amount - treasuryAllocation
        this.#description = description
        this.#publishedDate = publishedDate
        this.#deadline = deadline
        this.#participantArray = participantArray
        this.#manualAssigned = manualAssigned
    }


    extractJSON() {
        return {
            collectionID: this.#collectionID,
            collectionName: this.#collectionName,
            amount: this.#amount,
            treasuryAllocation: this.#treasuryAllocation,
            dividedAmount: this.#dividedAmount,
            description: this.#description,
            publishedDate: this.#publishedDate,
            deadline: this.#deadline,
            participantArray: this.#participantArray
        }
    }


    // Calculate the amount for one participant 
    calOneAmount(length) {
        return CollectionModel.autoAssignCount !== 0 
            ? this.#dividedAmount / CollectionModel.autoAssignCount
            : 0
    }



    // Getters & Setters
    setManualAssigned(manualAssigned) {
        this.#manualAssigned = manualAssigned
    }

    getManualAssigned() {
        return this.#manualAssigned
    }

    getCollectionID() {
        return this.#collectionID;
    }

    setCollectionID(collectionID) {
        this.#collectionID = collectionID;
    }

    getCollectionName() {
        return this.#collectionName;
    }

    setCollectionName(collectionName) {
        this.#collectionName = collectionName;
    }

    getAmount() {
        return this.#amount;
    }

    setAmount(amount) {
        this.#amount = amount;
    }

    getTreasuryAllocation() {
        return this.#treasuryAllocation;
    }

    setTreasuryAllocation(treasuryAllocation) {
        this.#treasuryAllocation = treasuryAllocation;
    }

    getDividedAmount() {
        return this.#dividedAmount;
    }

    calculateDividedAmount() {
        this.#dividedAmount = this.#amount - this.#treasuryAllocation - this.#manualAssigned
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }

    getPublishedDate() {
        return this.#publishedDate;
    }

    setPublishedDate(publishedDate) {
        this.#publishedDate = publishedDate;
    }

    getDeadline() {
        return this.#deadline;
    }

    setDeadline(deadline) {
        this.#deadline = deadline;
    }

    getParticipantArray() {
        return this.#participantArray;
    }

    setParticipantArray(participantArray) {
        this.#participantArray = participantArray;
    }


}

export default CollectionModel