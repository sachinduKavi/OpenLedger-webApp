import React, {useState, useEffect} from 'react'

import PrimaryBorder from '../../components/PrimaryBorder'
import {Checkbox, Col, Input} from 'antd'
import SimpleDP from '../../components/SimpleDP'
import CollectionModel from '../../dataModels/CollectionDataModel'

import '../../styles/estimate-participants.css'

export default function Participants(props) {
  const user = props.user
  
  // Parent collection state
  const collection = props.collection.collection
  const setCollection = props.collection.setCollection
  
  let participant = null
  // Get participant data from the collection
  for(const element of collection.participantArray) {
    if(user.getUserId() === element.userID) {
      participant = element
      break
    }
  }

  console.log('participant amount', participant.amount, Boolean(participant.autoAssigned), CollectionModel.autoAssignCount)
  
  const [selected, setSelected] = useState(Boolean(participant.autoAssigned))
 

  const [amount, setAmount] = useState(0)


  // Component did mount ?
  useEffect(() => {
    setSelected(prev => prev)
  }, [])


  const participantState = (state) => {
    if(state) {
      collection.autoAssignCount++
    } else {
      collection.autoAssignCount--
    }
    setSelected(state) // Change state of the participant
    // setCollection(new CollectionModel(collection.extractJSON()))
  }


  return (
    <div className='participant-border'>
        <div className="mini-column user-card">
          <div className="row">

            <div className='dp-container mini-column'>
              <SimpleDP size='40px' imageLink={user.getDisplayPictureId()} imageScale={{x: 0, y:0, scale: 1}}/>
            </div>
            

            <div className="mini-column name-card">
              <h5>{user.getUserName()}</h5>
              <h5>{user.getUserId()}</h5>
            </div>
          </div>
        </div>

        <div className="amount-column">
          <label htmlFor="">Individual Amount</label>
          <PrimaryBorder borderRadius='10px'>
            <Input type='number'
              disabled={selected}
              value={selected? Number(collection.calOneAmount().toFixed(2)): amount}
              onChange={(e) => {
                setAmount(e.target.value)
              }}  
              onBlur={(e) => {
                for(let i = 0; i < collection.participantArray.length; i++) {
                  if(collection.participantArray[i].userID === user.getUserId()) {
                    // IF user ID is match update amount
                    collection.participantArray[i].amount = amount
                    break
                  }
                }
                setCollection(new CollectionModel(collection.extractJSON()))
              }}
            />
          </PrimaryBorder>
        </div>


        <div className="state-column">
          <p className='auto-assign'>AUTO ASSIGN</p>
          <Checkbox
            checked={selected}
            onChange={(e) => {
              if(collection.autoAssignCount > 1 || e.target.checked){
                if(e.target.checked) {
                  // Reset the participant array variables
                  for(let i = 0; i < collection.participantArray.length; i++) {
                    if(collection.participantArray[i].userID === user.getUserId()) {
                      // IF user ID is match update amount
                      collection.participantArray[i].amount = 0
                      collection.participantArray[i].autoAssigned = true
                      break
                    } 
                  }
                  setAmount(0)
                
                } else {
                  for(let i = 0; i < collection.participantArray.length; i++) {
                    if(collection.participantArray[i].userID === user.getUserId()) {
                      // IF user ID is match update amount
                      collection.participantArray[i].autoAssigned = false
                      break
                    } 
                  }
                }
                participantState(e.target.checked)
              } else {
                // Warring message should be displayed
                console.log('System should have at least 1 member to balance the account')
              }
              setCollection(new CollectionModel(collection.extractJSON()))
            }}
          />
        </div>


       
      
    </div>
  )
}
