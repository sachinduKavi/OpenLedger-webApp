import {uploadImageFireStore} from '../query/firebaseImageUpload'
import {v4} from 'uuid'

class LedgerRecordModel {
    #title
    #description
    #amount
    #treasuryID
    #evidenceArray

    constructor({title= null, description = null, amount = null, treasuryID = null, evidenceArray = null}) {
        this.#title = title
        this.#description = description
        this.#amount = amount 
        this.#evidenceArray = evidenceArray
        this.#treasuryID = treasuryID
    }
    
    // Upload evidence images to firebase and creating evidenceLink array
    async uploadEvidenceImages() {
        if(this.#evidenceArray !== null) {
            // Clear to proceed
            await this.#evidenceArray.forEach(async (element) => {
                // Images are uploaded to the firebase to their relevant repository 
                // New image link is generated and assigned it to the Evidence object
                const imageLink = await uploadImageFireStore(element.getImageFile(), `evidence/${this.#treasuryID}/${v4()}`)
                element.setImageLink(imageLink)
            })
        } else {
            // Evidence array is not set
            console.log('Evidence array is null')
        }
        console.log('Evidence array', this.#evidenceArray)
    }


    // Getters and Setters
    getTreasuryID() {
        return this.#treasuryID
    }

    setTreasuryID(treasuryID) {
        this.#treasuryID = treasuryID
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