class News {
    #title
    #content
    #imageURL
    #publishAt

    constructor({title = null, content = null, imageURL = null, publishAt = null}) {
        this.#title = title
        this.#content = content
        this.#imageURL = imageURL
        this.#publishAt = publishAt
    }

    getTitle() {
        return this.#title
    }

    getContent() {
        return this.#content
    }

    getImageURL() {
        return this.#imageURL
    }

    getPublishAt() {
        return this.#publishAt
    }
}