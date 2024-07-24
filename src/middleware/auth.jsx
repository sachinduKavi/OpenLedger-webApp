import Treasurer from "../dataModels/Treasurer"
import CoTreasurer from "../dataModels/CoTreasurer"
import Chair from "../dataModels/Chair"
import Member from "../dataModels/Member"


const isClassObject = (obj) => {
    try{
        return obj.constructor && obj.constructor !== Object
    } catch (e) {
        return true // No evidence record is present 
    }
    
} 

const userCategorize = (userRole, userDetails) => {
    switch(userRole) {
        case 'Treasurer':
            return new Treasurer(userDetails)
        case 'CoTreasurer':
            return new CoTreasurer(userDetails)
        case 'Chair':
            return new Chair(userDetails)
        case 'Member':
            return new Member(userDetails)

    }
}

const capitalize = (value) => {
    return value !== null? value.charAt(0).toUpperCase() + value.slice(1): ''
}

export {isClassObject, userCategorize, capitalize}