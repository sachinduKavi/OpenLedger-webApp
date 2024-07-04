class CollectionModel {
    #collectionID
    #collectionName
    #amount
    #treasuryAllocation
    #dividedAmount
    #publisher
    #description
    #status
    #publishedDate
    #deadline
    participantArray
    #manualAssigned

    static autoAssignCount = 0

    constructor({collectionID = 'AUTO', collectionName = null, amount = 0, treasuryAllocation = 0, description = null, publishedDate = null, deadline = null, participantArray = [], manualAssigned = 0, publisher = null, status = 'DRAFT'}) {
        this.#collectionID = collectionID
        this.#collectionName = collectionName
        this.#amount = amount
        this.#treasuryAllocation = treasuryAllocation
        this.#dividedAmount = amount - treasuryAllocation - manualAssigned
        this.#description = description
        this.#publishedDate = publishedDate
        this.#deadline = deadline
        this.#status = status
        this.#publisher = publisher
        this.participantArray = participantArray
        this.#manualAssigned = manualAssigned
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
            publisher: this.#publisher,
            status: this.#status,
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


    // Save the Collection 
    saveCollection() {
        console.log('collection values', JSON.stringify(this.extractJSON()))
    }


    // Calculate the amount for one participant 
    calOneAmount() {
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
    getPublisher() {
        return this.#publisher
    }

    setPublisher(publisher) {
        this.#publisher = publisher
    }

    getStatus() {
        return this.#status
    }

    setStatus(status) {
        this.#status = status
    }

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