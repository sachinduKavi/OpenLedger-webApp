const isClassObject = (obj) => {
    try{
        return obj.constructor && obj.constructor !== Object
    } catch (e) {
        return true // No evidence record is present 
    }
    
} 

export {isClassObject}