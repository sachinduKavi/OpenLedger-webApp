import React, {useState} from 'react'
import '../../styles/ledger-record.css'

import MenuImage from '../../assets/icons/3dots.png'
import SingleLedger from './SingleLedger'
import { Button } from 'antd'
import { AnimatePresence } from 'framer-motion'
import NewLegerForm from './NewLegerForm'


export default function Ledger(props) {
  const [newLegerRecord, toggleNewLegerRecord] = useState(false)
  // Load every single ledger records related to the the treasury
  const loadLedgers = () => {

  } 

  const [options, setOptions] = useState(false) // Display overlay options
  console.log('Object pass by ', props.attributes, props.attributes.user)
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
          {/* Only Treasure and CO treasurer has access to add new records */}
          {options && <div className="menu-options">
            <button>Refresh</button>
            {props.attributes.user.getUserLevel() > 2 && <button onClick={() => {
              toggleNewLegerRecord(true)
            }}>New Record</button>}
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

        {/* New ledger record form */}
        <AnimatePresence>
          {newLegerRecord && <NewLegerForm closeForm={toggleNewLegerRecord}/>}
        </AnimatePresence>
        
      </div>
      
  
    
  )
}
