import React from 'react'

import PrimaryBorder from '../../components/PrimaryBorder'
import {Checkbox, Input} from 'antd'
import SimpleDP from '../../components/SimpleDP'

import '../../styles/estimate-participants.css'

export default function Participants(props) {
  const user = props.user
  

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
            <Input type='number'/>
          </PrimaryBorder>
        </div>


        <div className="state-column">
          <p className='auto-assign'>AUTO ASSIGN</p>
          <Checkbox/>
        </div>


       
      
    </div>
  )
}
