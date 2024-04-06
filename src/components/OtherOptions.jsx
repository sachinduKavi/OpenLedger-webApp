import React from 'react'

import googleImage from '../assets/googleIcon.png'
import appleIcon from '../assets/appleicon.png'

import '../styles/other-options.css'

export default function 
() {
  return (
    <div className='other-options'>
        <button id='google-btn'>
            <img src={googleImage} alt="" width={25}/>
        </button>

        <button id='apple-icon'>
            <img src={appleIcon} alt="" width={25}/>
        </button>
        
    </div>
  )
}
