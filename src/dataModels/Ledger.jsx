class Ledger {
    #title
    #description
    #amount
    #evidenceArray

    constructor({title= null, description = null, amount = null, evidenceArray = null}) {
        this.#title = title
        this.#description = description
        this.#amount = amount 
        this.#evidenceArray = evidenceArray
    }

    // Getters and Setters
    getTitle() {
        return this.#title;
    }

    setTitle(title) {
        this.#title = title;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }

    getAmount() {
        return this.#amount;
    }

    setAmount(amount) {
        this.#amount = amount;
    }

    getEvidenceArray() {
        return this.#evidenceArray;
    }

    setEvidenceArray(evidenceArray) {
        this.#evidenceArray = evidenceArray;
    }
}