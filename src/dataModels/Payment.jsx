import { generateCurrentDate } from "../middleware/GenerateCurrentDateTime"
import { createPaymentRecordQuery, getAllPaymentsQuery } from "../query/paymentQuery"

class Payment {
    #paymentID
    #treasuryID
    #userID
    #status
    #amount
    #date
    #reference
    #evidence
    #onlinePayment
    #fromCollection
    #note
    #userName


    constructor({paymentID = 'AUTO', treasuryID = null, userID = null, status = null, amount = 0, date = generateCurrentDate(), reference = "", note = null, evidence = null, onlinePayment = true, fromCollection = false, userName = null}) {
        this.#paymentID = paymentID
        this.#treasuryID = treasuryID
        this.#userID = userID
        this.#status = status
        this.#amount = amount
        this.#date = date
        this.#reference = reference
        this.#note = note
        this.#fromCollection = fromCollection
        this.#onlinePayment = onlinePayment
        this.#evidence = evidence
        this.#userName = userName
    }


    extractJSON() {
        return  {
            paymentID: this.#paymentID,
            treasuryID: this.#treasuryID,
            userID: this.#userID,
            status: this.#status,
            amount: this.#amount,
            date: this.#date,
            onlinePayment: this.#onlinePayment,
            reference: this.#reference,
            note: this.#note,
            evidence: this.#evidence,
            fromCollection: this.#fromCollection,
            userName: this.#userName
        }
    }






    // Payment success through payhere
    async successPaymentPayHere() {
        const response = await createPaymentRecordQuery(this.extractJSON())
        return response.status === 200 && response.data.proceed
    }


    // Load all the payments from the backend
    async loadAllPayments() {
        const response = await getAllPaymentsQuery()
        if (response.status === 200 && response.data.proceed) {
            const jsonArray = response.data.content
            let paymentArray = []
            jsonArray.forEach(element => {
                paymentArray.push(new Payment(element))
            });

            return paymentArray
        } else {
            return false
        }
    }





    calAmountWithTax() {
        return this.#amount*1.03
    }


    
    // Getters & Setters
    getUserName() {
        return this.#userName
    }

    setUserName(userName) {
        this.#userName = userName
    }

    getFromCollection() {
        return this.#fromCollection
    }

    setFromCollection(fromCollection) {
        this.#fromCollection = fromCollection
    }

    getOnlinePayment() {
        return this.#onlinePayment
    }

    setOnlinePayment(onlinePayment) {
        this.#onlinePayment = onlinePayment
    }


    getPaymentID() {
        return this.#paymentID
    }

    getTreasuryID() {
        return this.#treasuryID
    }

    getUserID() {
        return this.#userID
    }

    getStatus() {
        return this.#status
    }

    getAmount() {
        return this.#amount
    }

    getDate() {
        return this.#date
    }

    getReference() {
        return this.#reference
    }

    getNote() {
        return this.#note
    }

    // Setters
    setPaymentID(paymentID) {
        this.#paymentID = paymentID
    }

    setTreasuryID(treasuryID) {
        this.#treasuryID = treasuryID
    }

    setUserID(userID) {
        this.#userID = userID
    }

    setStatus(status) {
        this.#status = status
    }

    setAmount(amount) {
        this.#amount = amount
    }

    setDate(date) {
        this.#date = date
    }

    setReference(reference) {
        this.#reference = reference
    }

    setNote(note) {
        this.#note = note
    }
}


export default Payment