import React from 'react'

import SimpleDP from '../SimpleDP'
import CardIcon from '../../assets/icons/card.png'

export default function SingleParticipant(props) {
  const user = props.user

  return (
    <div className='single-participant-border'>

        <div className="counter">
          <h2>{props.indexNumber + 1}</h2>
          <SimpleDP imageLink={user.getDisplayPictureId()}
              imageScale={user.getPictureScale()} size={50}
          />
        </div>

        

        <div className="user-details">
            <h4>{user.getUserName()}</h4>
            <p>{user.getUserId()}</p>
        </div>

        <div className="email">
            <h4>{user.getUserEmail()}</h4>
        </div>

        <div className="mobile-num">
          <h4>{user.getUserMobile()}</h4>
        </div>
        

        <div className="position">
          <h3>{user.getPosition()}</h3>
        </div>

        
        <div style={{cursor: 'pointer'}}>
          <img src={CardIcon} alt="card-icon" />
        </div>
        
    </div>
  )
}
