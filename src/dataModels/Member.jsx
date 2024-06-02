import User from "./User";

class Member extends User {
    static position = 'Member'

    getUserLevel() {
        return 1
    }

    constructor(params) {
        super(params)
    }

    getPosition() {
        return Member.position
    }
}

export default Member