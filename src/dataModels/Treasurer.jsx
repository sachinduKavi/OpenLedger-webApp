import {updateTreasuryDetailQuery} from '../query/treasuryQuery'
import CoTreasurer from "./CoTreasurer"
import Treasury from './Treasury'

class Treasurer extends CoTreasurer {
    static position = 'Treasurer' 

    getPosition() {
        return Treasurer.position
    }

    // Returns user level 
    getUserLevel() {
        return super.getUserLevel() + 1
    }

    constructor(params) {
        console.log('Creating treasurer instant')
        super(params)
    }

    // Treasurers can update the group settings and data 
    async updateTreasurySettings(columnName, newValue) {
        const response = await updateTreasuryDetailQuery(columnName, newValue)
       
        // Treasury instant will be created and returned 
        // IF request failed it will return false
        return (response.status === 200 && response.data.procedure) 
                ? new Treasury(response.data.updatedTreasury)
                : false
    }

    
}

export default Treasurer