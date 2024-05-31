import React from 'react'
import '../../styles/ledger-record.css'

import MenuImage from '../../assets/icons/3dots.png'
import SingleLedger from './SingleLedger'

export default function Ledger() {
  return (
   
      
      <div className='ledger-border'>
     
        <div className="row"> 
          <h2>LEDGER RECORDS</h2>
          <img src={MenuImage} alt="menu-icon" />

        </div>

        {/* Ledger Records fetch from the database */}
        <SingleLedger/>
        <SingleLedger/>
        <SingleLedger/>
        <SingleLedger/>
        <SingleLedger/>
        <SingleLedger/>
        <SingleLedger/>
        <SingleLedger/>
        <SingleLedger/>
        
      </div>
      
  
    
  )
}
