class Expense {
    #itemOfWork
    #quantity
    #unit
    #rate

    constructor({itemOfWork = '',  quantity = '', unit = null, rate = null}) {
        this.#itemOfWork = itemOfWork
        this.#quantity = quantity
        this.#unit = unit
        this.#rate = rate
    }

    extractJSON() {
        return {
            itemOfWork: this.#itemOfWork,
            quantity: this.#quantity,
            rate: this.#rate,
            unit: this.#unit
        }

    }

    calculateExpense() {
        return this.#quantity * this.#rate
    }

    // Getters and Setters
    getItemOfWork() {
        return this.#itemOfWork
    }
    
    setItemOfWork(itemOfWork) {
        this.#itemOfWork = itemOfWork
    }
    
    getQuantity() {
        return this.#quantity
    }

    setQuantity(quantity) {
        this.#quantity = quantity
    }

    getUnit() {
        return this.#unit
    }

    setUnit(unit) {
        this.#unit = unit
    }

    getRate() {
        return this.#rate
    }

    setRate(rate) {
        this.#rate = rate
    }
}

export default Expense