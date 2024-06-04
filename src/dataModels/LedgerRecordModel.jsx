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
            for(let i = 0; i < this.#evidenceArray.length; i++) {
                // Images are uploaded to the firebase to their relevant repository 
                // New image link is generated and assigned it to the Evidence object
                this.#evidenceArray[i].setImageName(v4()) // set evidence image name for random string 
                const imageLink = await uploadImageFireStore(this.#evidenceArray[i].getImageFile(), `evidence/${this.#treasuryID}/${this.#evidenceArray[i].getImageName()}`)
                this.#evidenceArray[i].setImageLink(imageLink)
            }
        } else {
            // Evidence array is not set
            console.log('Evidence array is null')
        }
    }


    extractJSON() {
        // Implementing array with all the evidence 
        let evidence = []
        this.#evidenceArray.forEach(element => {
            evidence.push(element.extractJSON()) 
          })

        return {
            title: this.#title,
            description: this.#description,
            amount: this.#amount,
            treasuryID: this.#treasuryID,
            evidenceArray: evidence
        }
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