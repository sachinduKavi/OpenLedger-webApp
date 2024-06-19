
class User {
    static position = 'User'

    getPosition() {
        return User.position
    }

    // Returns user level 
    getUserLevel() {
        return 0
    }

    #userID 
    #userName 
    #userEmail
    #passwordHash
    #dpLink 
    #pictureScale 
    #aboutMe
    #mobileNumber
    #userSignature 


    constructor({userID = null, userName = null, userEmail = null, password = null, dpLink = null, pictureScale = null, aboutMe = null, mobileNumber = null, userSignature = null}) {
        // Creating new user Instant
        this.#userID = userID
        this.#userName = userName
        this.#userEmail = userEmail
        this.#passwordHash = password
        this.#dpLink = dpLink
        this.#pictureScale = pictureScale
        this.#aboutMe = aboutMe
        this.#mobileNumber = mobileNumber
        this.#userSignature = userSignature
    }

    extractJSON() {
        return {
            userID: this.#userID,
            userName: this.#userName,
            userEmail: this.#userEmail,
            dpLink: this.#dpLink,
            pictureScale: this.#pictureScale,
            aboutMe: this.#aboutMe,
            mobileNumber: this.#mobileNumber
        }
    }


    // Getter and setters
    getUserSignature(){
        return this.#userSignature
    }

    setUserSignature(userSignature) {
        this.#userSignature = userSignature
    }


    getUserMobile() {
        return this.#mobileNumber
    }

    setUserMobile(mobileNumber) {
        this.#mobileNumber = mobileNumber
    }


    getPictureScale() {
        return this.#pictureScale
    }

    setPictureScale(pictureScale) {
        this.#pictureScale = pictureScale
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