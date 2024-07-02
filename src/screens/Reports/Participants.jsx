import React, {useState, useEffect} from 'react'

import PrimaryBorder from '../../components/PrimaryBorder'
import {Checkbox, Input} from 'antd'
import SimpleDP from '../../components/SimpleDP'
import CollectionModel from '../../dataModels/CollectionDataModel'

import '../../styles/estimate-participants.css'

export default function Participants(props) {
  const user = props.user
  
  const [selected, setSelected] = useState(true)

  const collection = props.collection.collection
  const setCollection = props.collection.setCollection


  // Component did mount ?
  useEffect(() => {
    setSelected(prev => prev)
  }, [])

  const participantState = (state) => {
    if(state) {
      CollectionModel.autoAssignCount++
    } else {
      CollectionModel.autoAssignCount--
    }
    
    setSelected(state) // Change state of the participant
    setCollection(new CollectionModel(collection.extractJSON()))
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
              value={selected? collection.calOneAmount(2): 0}
            />
          </PrimaryBorder>
        </div>


        <div className="state-column">
          <p className='auto-assign'>AUTO ASSIGN</p>
          <Checkbox
            checked={selected}
            onChange={(e) => {
              participantState(e.target.checked)
            }}
          />
        </div>


       
      
    </div>
  )
}
