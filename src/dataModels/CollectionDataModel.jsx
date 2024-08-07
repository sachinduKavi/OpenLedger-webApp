import { generateCurrentDate } from "../middleware/GenerateCurrentDateTime"
import { collectionSaveQuery, loadALlTreasuryCollections, discardCollectionQuery, fetchSingleCollectionQuery, collectionWithdrawQuery} from "../query/reportQuery"

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
    totalCollected = null

    // static autoAssignCount = 0

    constructor({collectionID = 'AUTO', collectionName = null, amount = 0, treasuryAllocation = 0, description = null, publishedDate = generateCurrentDate(), deadline = generateCurrentDate(), participantArray = [], manualAssigned = 0, publisher = null, status = 'DRAFT', publisherName = null, autoAssignCount = 0}) {
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

    assignValues({collectionID = 'AUTO', collectionName = null, amount = 0, treasuryAllocation = 0, description = null, publishedDate = generateCurrentDate(), deadline = generateCurrentDate(), participantArray = [], manualAssigned = 0, publisher = null, status = 'DRAFT', publisherName = null, autoAssignCount = 0}) {
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


    static async filterByUser(userID) {
        let filterList = []
        const collectionArray = await this.fetchAllCollections()
        for(const element of collectionArray) {
            for(const miniElement of element.participantArray) {
                if(miniElement.userID === userID) {
                    filterList.push(element)
                    break
                }
            }
        }

        return filterList
    }

    calculateAutoAssignCount() {
        this.autoAssignCount = 0
        this.participantArray.forEach(element => {
            if(element.autoAssigned) {
                this.autoAssignCount++
            }
        })

        return this.autoAssignCount
    }

    // Load latest collection
    async LoadSingleRecord() {
        if(this.#collectionID === 'AUTO') this.$collectionID = null // Changing collection ID to Null if not provided 

        const response = await fetchSingleCollectionQuery(this.#collectionID)
        if(response.status === 200 && response.data.proceed) {
            this.assignValues(response.data.content) // assign collection values 
            return true
        }

        return false
    }

    // Calculate total collected amount + treasury allocation 
    calculateCollectedAmount() {
        let amount = this.#treasuryAllocation??0
        this.participantArray.forEach(element => {
            amount += element.paidAmount
        })
        return amount
    }

    // Fetch participant record related to UserID
    fetchMyRecord(userID) {
        for(const element of this.participantArray) {
            if(element.userID ===  userID) return element
        }

        return []
    }

    // Collection withdraw
    async withdraw(totalAmount) {
        const response = await collectionWithdrawQuery(this.#collectionID, totalAmount, generateCurrentDate())
        console.log(response)
        return response.status === 200 && response.data.proceed
    }

    // Save the Collection 
    async saveCollection() {
        const response = await collectionSaveQuery(this.extractJSON())
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

    // Remove collection from the database
    async deleteCollection() {
        const response = await discardCollectionQuery(this.#collectionID)
        return response.status === 200 
            ? {
                proceed: response.data.proceed,
                errorMessage: response.data.errorMessage
            }
            : false
    }


    // Calculate the amount for one participant 
    calOneAmount() {
        return this.calculateAutoAssignCount() !== 0 
            ? this.#dividedAmount / this.calculateAutoAssignCount()
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