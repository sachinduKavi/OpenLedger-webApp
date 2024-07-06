import { collectionSaveQuery, loadALlTreasuryCollections } from "../query/reportQuery"

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
    #publisherName
    participantArray
    #manualAssigned
    autoAssignCount

    // static autoAssignCount = 0

    constructor({collectionID = 'AUTO', collectionName = null, amount = 0, treasuryAllocation = 0, description = null, publishedDate = new Date(), deadline = new Date(), participantArray = [], manualAssigned = 0, publisher = null, status = 'DRAFT', publisherName = null, autoAssignCount = 0}) {
        this.#collectionID = collectionID
        this.#collectionName = collectionName
        this.#amount = amount
        this.#treasuryAllocation = treasuryAllocation
        this.#dividedAmount = amount - treasuryAllocation - manualAssigned
        this.#description = description
        this.#publishedDate = publishedDate
        this.#deadline = deadline
        this.#publisherName = publisherName
        this.#status = status
        this.#publisher = publisher
        this.autoAssignCount = autoAssignCount
        this.participantArray = participantArray
        this.#manualAssigned = manualAssigned
    }


    extractJSON() {
        // Update manual assign value
        this.calculateManualAssign()
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
            publisherName: this.#publisherName,
            status: this.#status,
            manualAssigned: this.#manualAssigned,
            participantArray: this.participantArray,
            autoAssignCount: this.autoAssignCount
        }
    }


    calculateManualAssign() {
        this.#manualAssigned = 0
        this.participantArray.forEach(element => {
            if(!element.autoAssign)
                this.#manualAssigned += parseFloat(element.amount)
        });

        // console.log('manual assigned', this.#manualAssigned)
    }


    // Save the Collection 
    async saveCollection() {
        const response = await collectionSaveQuery(this.extractJSON())
        console.log(response)
        return (response.status === 200) 
            ? {
                process: response.data.proceed,
                collection: new CollectionModel(response.data.content),
                errorMessage: response.data.errorMessage
            } 
            : false
    }


    // Load all the collections related to treasury ID
    static async fetchAllCollections() {
        
        const response = await loadALlTreasuryCollections()
        if(response.status === 200 && response.data.proceed) {
          
            const collectionArray = response.data.content??[] // Receive to collection array
            

            let collectionObjArray = []
            collectionArray.forEach(element => {
                collectionObjArray.push(new CollectionModel(element))
            })
           
            return collectionObjArray
    
        } 

        return false
    }


    // Calculate the amount for one participant 
    calOneAmount() {
        console.log(this.#dividedAmount, this.autoAssignCount)
        return this.autoAssignCount !== 0 
            ? this.#dividedAmount / this.autoAssignCount
            : 0
    }

    incrementManualAssign(value) {
        this.#manualAssigned += parseFloat(value)
    }

    decrementManualAssign(value) {
        this.#manualAssigned -= value
    }



    // Getters & Setters
    getPublisherName() {
        return this.#publisherName
    }

    setPublisherName(publisherName) {
        this.#publisherName = publisherName
    }

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