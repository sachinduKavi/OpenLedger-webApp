import React, {useState} from 'react'
import '../../styles/ledger-record.css'

import MenuImage from '../../assets/icons/3dots.png'
import SingleLedger from './SingleLedger'
import { Button } from 'antd'


export default function Ledger() {
  const [options, setOptions] = useState(false) // Display overlay options

  return (
   
      
      <div className='ledger-border'>
     
        <div className="row"> 
          <h2>LEDGER RECORDS</h2>

          <div className="icon-menu" onClick={() => {
            setOptions(!options)
            console.log('option state', options)
          }}>


            <img src={MenuImage} alt="menu-icon" />
          </div>
          
          {options && <div className="menu-options">
            <button>New Record</button>
            <button>Refresh</button>
          </div>}
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
