import Member from "./Member";
class Chair extends Member {
    static position = 'Chair'

    constructor(prams) {
        super(prams)
    }

    getUserLevel() {
        return super.getUserLevel() + 1
    }

    getPosition() {
        return Chair.position
    }
}

export default Chair