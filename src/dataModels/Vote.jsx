import { generateCurrentDate } from "../middleware/GenerateCurrentDateTime"
import { createVoteQuery, deletePollQuery, loadAllVotesQuery, updatePoll } from "../query/voteQuery"
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


    // Load all the votes and data
    static async loadVotes() {
        const response = await loadAllVotesQuery()
        const voteList = []
        if(response.status === 200 && response.data.proceed) {
            response.data.content.forEach(element => {
                voteList.push(new Vote(element))
            });
        }

        return voteList
        
    }

    // Create new Poll Submission 
    async createPoll() {
        const response = await createVoteQuery(this.extractJSON())
        return response.status === 200 && response.data.proceed
    }


    // Update a poll
    async pollUpdate(optionID, state) {
        const response = await updatePoll(this.#voteID, optionID, state, this.#multiple)
        return response.status === 200 && response.data.proceed 
        ? new Vote(response.data.content)
        : false
    }


    // Deletion of poll
    async deletePoll() {
        const response = await deletePollQuery(this.#voteID)
        return response.status === 200 && response.data.proceed
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