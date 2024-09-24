import { generateCurrentDate } from "../middleware/GenerateCurrentDateTime"

class Vote {
    #voteID
    #publisherID
    #publishDate
    #title
    #multiple
    #choices

    constructor({voteID = null, publisherID = null, publishDate = generateCurrentDate(), title = null, multiple = false, choices = []}) {
        this.#voteID = voteID
        this.#publisherID = publisherID
        this.#publishDate = publishDate
        this.#title = title
        this.#multiple = multiple
        this.#choices = choices
    }

    extractJSON() {
        return {
            voteID: this.#voteID,
            publisherID: this.#publisherID,
            publishDate: this.#publishDate,
            title: this.#title,
            multiple: this.#multiple,
            choices: this.#choices
        }
    }

    // Create new Poll Submission 
    createPoll() {
        console.log(JSON.stringify(this.extractJSON()))
    }


    getChoices() {
        return this.#choices
    }

    setChoices(choices) {
        this.#choices = choices
    }

    // Getter for voteID
    getVoteID() {
        return this.#voteID;
    }

    // Setter for voteID
    setVoteID(voteID) {
        this.#voteID = voteID;
    }

    // Getter for publisherID
    getPublisherID() {
        return this.#publisherID;
    }

    // Setter for publisherID
    setPublisherID(publisherID) {
        this.#publisherID = publisherID;
    }

    // Getter for publishDate
    getPublishDate() {
        return this.#publishDate;
    }

    // Setter for publishDate
    setPublishDate(publishDate) {
        this.#publishDate = publishDate;
    }

    // Getter for title
    getTitle() {
        return this.#title;
    }

    // Setter for title
    setTitle(title) {
        this.#title = title;
    }

    // Getter for multiple
    getMultiple() {
        return this.#multiple;
    }

    // Setter for multiple
    setMultiple(multiple) {
        this.#multiple = multiple;
    }
}


export default Vote