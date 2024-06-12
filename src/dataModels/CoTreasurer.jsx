import Chair from "./Chair"

class CoTreasurer extends Chair {
    static position = 'CoTreasurer'

    getPosition() {
        return CoTreasurer.position
    }

    // Returns user level 
    getUserLevel() {
        return super.getUserLevel() + 1
    }
    constructor(params) {
        super(params)
    }
}


export default CoTreasurer