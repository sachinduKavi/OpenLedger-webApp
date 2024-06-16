const {isClassObject} = require('../middleware/auth')
const Expense = require('./Expense')

class EstimateReport {
    #name
    #description
    #expenseArray
    #signatureArray

    constructor({name = '', description = '', expenseArray = [], signatureArray = []}) {
        this.#name = name
        this.#description = description
        this.#expenseArray = expenseArray
        this.#signatureArray = signatureArray

        if(this.#expenseArray.length > 0 && !isClassObject(this.#expenseArray[0])) this.#convertToExpenseObject()
    }

    #convertToExpenseObject() {
        this.#expenseArray = this.#expenseArray.map((element) => {
            return new Expense({itemOfWork: element.itemOfWork, quantity: element.quantity, unit: element.unit, rate: element.rate})
        })
    }

    extractJSON() {
        return {
            name: this.#name,
            description: this.#description,
            expenseArray:  this.#expenseArray,
            signatureArray: this.#signatureArray
        }
    }

    // Getters and Setters
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

module.exports = EstimateReport