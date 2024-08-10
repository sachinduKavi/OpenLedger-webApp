import { generateCurrentDate } from "../middleware/GenerateCurrentDateTime"
import { loadMessageBlock, newMessageQuery } from "../query/messageQuery"


class Message {
    #chatID
    #treasuryID
    #senderID
    #date
    #message
    #senderName

    constructor({chatID = 'AUTO', treasuryID = null, senderID = null, date = generateCurrentDate(), message = null, senderName = null}) {
        this.#chatID = chatID
        this.#treasuryID = treasuryID,
        this.#senderID = senderID
        this.#date = date
        this.#message = message
        this.#senderName = senderName
    }


    extractJSON() {
        return {
            chatID: this.#chatID,
            treasuryID: this.#treasuryID,
            senderID: this.#senderID,
            date: this.#date,
            message: this.#message,
            senderName: this.#senderName
        }
    }

    // Create new message
    async createNewMessage() {
        const response = await newMessageQuery(this.extractJSON())
        return response.status === 200 && response.data.proceed
    }


    // Load message block of 50 messages
    static async messageBlock(n) {
        const response = await loadMessageBlock(n)
        return response.status === 200 && response.data.proceed 
            ? {
                messages: response.data.content.map(element => {
                    return new Message(element)
                })
            }
            : false
    }


    // getters and setters
    getSenderName() {
        return this.#senderName
    }

    setSenderName(senderName) {
        this.#senderName = senderName
    }

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