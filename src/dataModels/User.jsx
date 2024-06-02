
class User {
    static position = 'User'

    getPosition() {
        return User.position
    }

    // Returns user level 
    getUserLevel() {
        return 0
    }

    #userID = null
    #userName = null
    #userEmail = null
    #passwordHash = null
    #dpLink = null
    #pictureScale = null


    constructor({userID = null, userName = null, userEmail = null, password = null, dpLink = null, pictureScale = null}) {
        // Creating new user Instant
        this.#userID = userID
        this.#userName = userName
        this.#userEmail = userEmail
        this.#passwordHash = password
        this.#dpLink = dpLink
        this.#pictureScale = pictureScale
    }

    // Update Database with current data
    async createNewUer() {
        
    }

    setUserID(userID) {
        this.#userID = userID
    }

    setUserName(userName) {
        this.#userName = userName
    }

    setUserEmail(userEmail) {
        this.#userEmail = userEmail
    }

    setPasswordHash(passwordHash) {
        this.#passwordHash = passwordHash
    }

    setDisplayPictureID(dpLink){
        this.#dpLink = dpLink
    }

    getUserId() {
        return this.#userID
    }

    getUserName() {
        return this.#userName
    }

    getUserEmail() {
        return this.#userEmail
    }

    getPassword() {
        return this.#passwordHash
    }

    getDisplayPictureId() {
        return this.#dpLink
    }

    getAll() {
        return [
            this.getUserId(),
            this.getUserName(),
            this.getPassword(),
            this.getUserEmail(),
            this.getDisplayPictureId(),
        ]
    }

    setAll(userID, userName, passwordHash, userEmail, displayPictureID) {
        this.setUserID(userID)
        this.setUserName(userName)
        this.setPasswordHash(passwordHash)
        this.setUserEmail(userEmail)
        this.setDisplayPictureID(displayPictureID)
    }
}

export default User