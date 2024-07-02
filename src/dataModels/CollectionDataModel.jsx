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

    constructor({collectionID = null, collectionName = null, amount = null, treasuryAllocation = null, dividedAmount = null, description = null, publishedDate = null, deadline = null, participantArray = []}) {
        this.#collectionID = collectionID
        this.#collectionName = collectionName
        this.#amount = amount
        this.#treasuryAllocation = treasuryAllocation
        this.#dividedAmount = dividedAmount
        this.#description = description
        this.#publishedDate = publishedDate
        this.#deadline = deadline
        this.#participantArray = participantArray
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



    // Getters & Setters
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

    setDividedAmount(dividedAmount) {
        this.#dividedAmount = dividedAmount;
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