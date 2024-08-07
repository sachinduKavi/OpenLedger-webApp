import React from 'react'
import {motion} from 'framer-motion'
import Payment from '../../dataModels/Payment'

export default function MyBanner(props) {
    const collection = props.collection
    const userID = props.userID

    // Get user amount
    let participant = null
    for(const element of collection.participantArray) {
        if(element.userID === userID) {
            participant = element
            break
        } 
    }
    console.log(collection.calOneAmount())
    const assignedAmount = !participant.autoAssigned ? participant.amount : collection.calOneAmount()
    // Remove already paid collections
    if((assignedAmount <= participant.paidAmount) || collection.getStatus() === "DRAFT") return null
  return (
    <motion.div className='my-banner-border'
        whileTap={{scale: 0.95}}
        onClick={() => {
            props.setCurrentPayment(new Payment({
                userID: userID,
                amount: assignedAmount - participant.paidAmount,
                reference: collection.getCollectionID(),
                onlinePayment: true,
                fromCollection: true
            }))
        
        }}
    >
        <div className="column">
            <h4>{collection.getCollectionName()}</h4>
            <h6>{collection.getCollectionID()}</h6>
        </div>

        <div className="column" style={{alignItems: 'flex-end'}}>
            <h5>LKR {assignedAmount} {(participant.paidAmount > 0) ?participant.paidAmount/-1: null} = {assignedAmount - participant.paidAmount}| {collection.getAmount()}</h5>
        </div>
    </motion.div>
  )
}
