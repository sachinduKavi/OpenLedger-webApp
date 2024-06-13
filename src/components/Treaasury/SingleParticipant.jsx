import React from 'react'

import SimpleDP from '../SimpleDP'
import CardIcon from '../../assets/icons/card.png'

export default function SingleParticipant(props) {
  return (
    <div className='single-participant-border'>

        <div className="counter">
          <h2>1</h2>
          <SimpleDP imageLink='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
              imageScale={{x:0, y:0, scale: 1}} size={50}
          />
        </div>

        

        <div className="user-details">
            <h4>Prathibha Dulakshani</h4>
            <p>US0000000000000001</p>
        </div>

        <div className="email">
            <h4>sachindu38@gmail.com</h4>
        </div>

        <div className="mobile-num">
          <h4>0764314505</h4>
        </div>
        

        <div className="position">
          <h3>Member</h3>
        </div>

        

        <img src={CardIcon} alt="card-icon" />
    </div>
  )
}
