
import CoTreasurer from "./CoTreasurer"

class Treasurer extends CoTreasurer {
    static position = 'Treasurer' 

    getPosition() {
        return Treasurer.position
    }

    // Returns user level 
    getUserLevel() {
        return 4
    }

    constructor(params) {
        console.log('Creating treasurer instant')
        super(params)
    }

    
}

export default Treasurer