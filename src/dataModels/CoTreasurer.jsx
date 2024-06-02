import Member from "./Member"

class CoTreasurer extends Member {
    static position = 'CoTreasurer'

    getPosition() {
        return CoTreasurer.position
    }

    // Returns user level 
    getUserLevel() {
        return 3
    }
    constructor(params) {
        super(params)
    }
}


export default CoTreasurer