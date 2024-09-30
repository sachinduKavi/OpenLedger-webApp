import React, {useContext} from 'react'

import SimpleDP from '../SimpleDP'

export default function RequestParticipant(props) {
  const user = props.user


  

  return (
    <div className='single-participant-border' style={{width: '70%'}}>

        <div className="counter">
          <h2>{(props.indexNumber + 1).toString().padStart(2, '0')}</h2>
          <div className='user-image'>
          <SimpleDP imageLink={user.link}
              imageScale={{x:0, y:0, scale: 1}} size={50}
          />
          </div>
          
        </div>

        

        <div className="user-details">
            <h4>{user.user_name}</h4>
            <p>{user.user_ID}</p>
        </div>

        <div className="email">
            <h4>{user.user_email}</h4>
        </div>

    
        
    </div>
  )
}
