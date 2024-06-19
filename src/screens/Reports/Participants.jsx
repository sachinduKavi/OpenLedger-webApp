import React from 'react'

import PrimaryBorder from '../../components/PrimaryBorder'
import {Checkbox, Input} from 'antd'
import '../../styles/estimate-participants.css'

export default function Participants(props) {
  const user = props.user
  

  return (
    <div className='participant-border'>
        <div className="column">
          <h4>{user.getUserName()}</h4>

          <h6>{user.getUserId()}</h6>
        </div>

        <div className="column" style={{alignItems: 'flex-end'}}>
 
        </div>
        
          <div className="column">
            <Checkbox value={true}/>
          </div>
        

        
    </div>
  )
}
