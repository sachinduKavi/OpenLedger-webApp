
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

    // Treasurers can update the group settings and data 
    updateTreasurySettings(settings) {
        console.log('From treasury', settings)
    }

    
}

export default Treasurer