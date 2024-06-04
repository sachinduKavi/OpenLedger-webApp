class Evidence {
    #imageFile
    #imageLink
    #imageName
    #description
    #recordID

    constructor({imageFile = null, imageLink = null, imageName = null, description = null, recordID = null}) {
        this.#imageFile = imageFile
        this.#imageLink = imageLink
        this.#imageName = imageName
        this.#description = description
        this.#recordID = recordID
    }

    extractJSON() {
        return {
            imageName: this.#imageName,
            imageLink: this.#imageLink,
            description: this.#description,
        }
    }


    // Getters and Setters of the evidence class
    getImageFile() {
        return this.#imageFile;
    }

    setImageFile(imageFile) {
        this.#imageFile = imageFile;
    }

    getImageLink() {
        return this.#imageLink;
    }

    setImageLink(imageLink) {
        this.#imageLink = imageLink;
    }

    getImageName() {
        return this.#imageName;
    }

    setImageName(imageName) {
        this.#imageName = imageName;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
    }

    getRecordID() {
        return this.#recordID;
    }

    setRecordID(recordID) {
        this.#recordID = recordID;
    }
}

export default Evidence