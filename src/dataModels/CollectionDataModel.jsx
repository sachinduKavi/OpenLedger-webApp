class CollectionModel {
    #collectionID
    #collectionName
    #amount
    #treasuryAllocation
    #dividedAmount
    #description
    #publishedDate
    #deadline
    participantArray
    #manualAssigned

    static autoAssignCount = 0

    constructor({collectionID = null, collectionName = null, amount = 0, treasuryAllocation = 0, description = null, publishedDate = null, deadline = null, participantArray = [], manualAssigned = 0}) {
        this.#collectionID = collectionID
        this.#collectionName = collectionName
        this.#amount = amount
        this.#treasuryAllocation = treasuryAllocation
        this.#dividedAmount = amount - treasuryAllocation - manualAssigned
        this.#description = description
        this.#publishedDate = publishedDate
        this.#deadline = deadline
        this.participantArray = participantArray
        this.#manualAssigned = manualAssigned

        console.log('manual assigned ', this.#manualAssigned, manualAssigned)
    }


    extractJSON() {
        // Update manual assign value
        this.calculateManualAssign()
        console.log('in extract', this.#manualAssigned)
        return {
            collectionID: this.#collectionID,
            collectionName: this.#collectionName,
            amount: this.#amount,
            treasuryAllocation: this.#treasuryAllocation,
            dividedAmount: this.#dividedAmount,
            description: this.#description,
            publishedDate: this.#publishedDate,
            deadline: this.#deadline,
            manualAssigned: this.#manualAssigned,
            participantArray: this.participantArray
        }
    }


    calculateManualAssign() {
        this.#manualAssigned = 0
        this.participantArray.forEach(element => {
            this.#manualAssigned += parseFloat(element.amount)
        });
    }


    // Calculate the amount for one participant 
    calOneAmount(length) {
        return CollectionModel.autoAssignCount !== 0 
            ? this.#dividedAmount / CollectionModel.autoAssignCount
            : 0
    }

    incrementManualAssign(value) {
        this.#manualAssigned += parseFloat(value)
        console.log('from class', this.#manualAssigned)
    }

    decrementManualAssign(value) {
        this.#manualAssigned -= value
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


}

export default CollectionModel