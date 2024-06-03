import {uploadImageFireStore} from '../query/firebaseImageUpload'
import {} from 'v8'

class LedgerRecordModel {
    #title
    #description
    #amount
    #evidenceArray
    #evidenceImageLinksArray

    constructor({title= null, description = null, amount = null, evidenceArray = null}) {
        this.#title = title
        this.#description = description
        this.#amount = amount 
        this.#evidenceArray = evidenceArray
    }
    
    // Upload evidence images to firebase and creating evidenceLink array
    async uploadEvidenceImages() {
        if(this.#evidenceArray !== null) {
            // Clear to proceed
            this.#evidenceArray.forEach(element => {
                
            });
        } else {
            // Evidence array is not set
            console.log('Evidence array is null')
        }
    }

    
    // Getters and Setters
    getEvidenceImageLinksArray() {
        return this.#evidenceImageLinksArray
    }

    setEvidenceImageLinksArray(evidenceImageLinksArray) {
        this.#evidenceImageLinksArray = evidenceImageLinksArray
    }


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

export default LedgerRecordModel