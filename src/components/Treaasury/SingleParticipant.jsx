import React from 'react'

import SimpleDP from '../SimpleDP'
import CardIcon from '../../assets/icons/card.png'

export default function SingleParticipant() {
  return (
    <div className='single-participant-border'>
        <SimpleDP imageLink='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
            imageScale={{x:0, y:0, scale: 1}} size={50}
        />

        <div className="user-details">
            <h4>Prathibha Dulakshani</h4>
            <p>US0000000000000001</p>
        </div>

        <div className="email">
            <h4>sachindu38@gmail.com</h4>
        </div>

        <h4>0764314505</h4>

        <h3>Member</h3>

        <img src={CardIcon} alt="card-icon" />
    </div>
  )
}
