import {isClassObject} from '../middleware/auth'
import Expense from './Expense'
import {saveEstimateReportQuery} from '../query/reportQuery'

class EstimateReport {
    #estimationID
    #name
    #description
    #expenseArray
    #signatureArray
    #overseerages
    #insuranceDate
    #status


    constructor({name = null, description = null, expenseArray = [], signatureArray = [], estimationID = 'AUTO', overseerages = 0, insuranceDate = null, status = 'DRAFT'}) {
        this.#name = name
        this.#description = description
        this.#expenseArray = expenseArray
        this.#signatureArray = signatureArray
        this.#estimationID = estimationID 
        this.#overseerages = overseerages
        this.#insuranceDate = insuranceDate
        this.#status = status
 

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
            status: this.#status
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



    // Getters and Setters
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