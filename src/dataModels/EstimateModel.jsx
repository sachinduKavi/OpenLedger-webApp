import {isClassObject} from '../middleware/auth'
import Expense from './Expense'
import {saveEstimateReportQuery, getAllEstimationsQuery, deleteEstimationQuery} from '../query/reportQuery'

class EstimateReport {
    #estimationID
    #name
    #description
    #expenseArray
    #signatureArray
    #overseerages
    #insuranceDate
    #status
    #publisher


    constructor({name = null, description = null, expenseArray = [], signatureArray = [], estimationID = 'AUTO', overseerages = 0, insuranceDate = null, status = 'DRAFT', publisher = null}) {
        this.#name = name
        this.#description = description
        this.#expenseArray = expenseArray
        this.#signatureArray = signatureArray
        this.#estimationID = estimationID 
        this.#overseerages = overseerages
        this.#insuranceDate = insuranceDate
        this.#status = status
        this.#publisher = publisher
 

        if(this.#expenseArray.length > 0 && !isClassObject(this.#expenseArray[0])) this.#convertToExpenseObject()
    }

    #convertToExpenseObject() {
        this.#expenseArray = this.#expenseArray.map((element) => {
            return new Expense({itemOfWork: element.itemOfWork, quantity: element.quantity, unit: element.unit, rate: element.rate})
        })
    }

    extractJSON() {
        return {
            estimationID: this.#estimationID,
            name: this.#name,
            description: this.#description,
            overseerages: this.#overseerages,
            expenseArray:  this.#expenseArray.map((element) => {
                return element.extractJSON()
            }),
            signatureArray: this.#signatureArray,
            insuranceDate: this.#insuranceDate,
            status: this.#status,
            publisher: this.#publisher
        }
    }

    // Save the estimate report in the database 
    async saveEstimate() {
        const response = await saveEstimateReportQuery(this.extractJSON())

        if(response.status === 200){
            this.#estimationID = response.data.estimationID
            return {
                process: response.data.process,
                errorMessage: response.data.errorMessage}
        } else return false

    }

    // Load all the estimate records from the backend 
    static async fetchAllEstimations() {
        const response = await getAllEstimationsQuery()

        // Converting response data into estimate instants 
        const estimateArray = response.data.content.map(element => {
            return new EstimateReport(element)
        })

        return (response.status === 200) 
            ? {
                process: response.data.process,
                errorMessage: response.data.errorMessage,
                estimateArray: estimateArray
            }
            : false;
    } 


    // User wants to delete the record 
    async deleteRecord() {
        console.log('delete record', this.#estimationID)
        const response = await deleteEstimationQuery(this.#estimationID)
        return (response.status === 200)
            ? {
                proceed: response.data.proceed,
                errorMessage: response.data.errorMessage
            }
            : false
    }



    // Getters and Setters
    getPublisher() { 
        return this.#publisher
    }

    setPublisher(publisher) {
        this.#publisher = publisher
    }

    getStatus(){
        return this.#status
    }

    setStatus(status) {
        this.#status = status
    }

    getInsuranceDate() {
        return this.#insuranceDate
    }

    setInsuranceDate(insuranceDate) {
        this.#insuranceDate = insuranceDate
    }

    getOverseerages() {
        return this.#overseerages
    }

    setOverseerages(overseerages) {
        this.#overseerages = overseerages
    }

    getEstimationID() {
        return this.#estimationID
    }

    setEstimationID(estimationID) {
        this.#estimationID = estimationID
    }


    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }

    getExpenseArray() {
        return this.#expenseArray;
    }

    setExpenseArray(expenseArray) {
        this.#expenseArray = expenseArray;
        if (expenseArray.length > 0 && !isClassObject(expenseArray[0])) {
            this.#convertToExpenseObject();
        }
    }

    getSignatureArray() {
        return this.#signatureArray;
    }

    setSignatureArray(signatureArray) {
        this.#signatureArray = signatureArray;
    }

}

export default EstimateReport