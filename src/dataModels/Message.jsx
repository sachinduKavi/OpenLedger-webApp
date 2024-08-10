import { generateCurrentDate } from "../middleware/GenerateCurrentDateTime"


class Message {
    #chatID
    #treasuryID
    #senderID
    #date
    #message

    constructor({chatID = 'AUTO', treasuryID = null, senderID = null, date = generateCurrentDate(), message = null}) {
        this.#chatID = chatID
        this.#treasuryID = treasuryID,
        this.#senderID = senderID
        this.#date = date
        this.#message = message
    }


    extractJSON() {
        return {
            chatID: this.#chatID,
            treasuryID: this.#treasuryID,
            senderID: this.#senderID,
            date: this.#date,
            message: this.#message
        }
    }


    // getters and setters
    getChatID() {
        return this.#chatID
    }

    setChatID(chatID) {
        this.#chatID = chatID
    }

    getTreasuryID() {
        return this.#treasuryID
    }

    setTreasuryID(treasuryID) {
        this.#treasuryID = treasuryID
    }

    getSenderID() {
        return this.#senderID
    }

    setSenderID(senderID) {
        this.#senderID = senderID
    }

    getDate() {
        return this.#date
    }

    setDate(date) {
        this.#date = date
    }

    getMessage() {
        return this.#message
    }

    setMessage(message) {
        this.#message = message
    }
}

export default Message