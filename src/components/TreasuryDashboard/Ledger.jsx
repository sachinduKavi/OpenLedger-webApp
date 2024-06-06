import React, {useState, useEffect, useContext} from 'react'
import '../../styles/ledger-record.css'

import MenuImage from '../../assets/icons/3dots.png'
import SingleLedger from './SingleLedger'
import { Button } from 'antd'
import { AnimatePresence } from 'framer-motion'
import NewLegerForm from './NewLegerForm'
import {fetchAllLedgerRecords} from '../../query/ledgerQuery'
import { SessionContext } from '../../Session'


export default function Ledger(props) {
  const sessionData = useContext(SessionContext)
  const changeSession = sessionData.changeSessionData
  const [newLegerRecord, toggleNewLegerRecord] = useState(false)
  const [ledgerRecordArray, setLedgerRecordArray] = useState([]) // Ledger record array
  
  // Load every single ledger records related to the the treasury
  const loadLedgers = async () => {
    changeSession({processing: true}) // Global Processing
    console.log('Running load ledgers')
    const response = await fetchAllLedgerRecords()
    console.log(response)
    if(response.procedure) {
      // System responded with no errors
      setLedgerRecordArray(response.ledgerRecords)
    } else {
      // System responded with error
      console.log('Http error occurred')
    }
    changeSession({processing: false}) // Switch off processing
  } 

  // Component did mount ?
  useEffect(() => {
    loadLedgers()
  }, [])

  const [options, setOptions] = useState(false) // Display overlay options
  return (
   
      
      <div className='ledger-border'>
     
        <div className="row"> 
          <h2>LEDGER RECORDS</h2>

          <div className="icon-menu" onClick={() => {
            setOptions(!options)
          }}>


            <img src={MenuImage} alt="menu-icon" />
          </div>
          {/* Only Treasure and CO treasurer has access to add new records */}
          {options && <div className="menu-options">
            <button onClick={loadLedgers}>Refresh</button>
            {props.attributes.user.getUserLevel() > 2 && <button onClick={() => {
              toggleNewLegerRecord(true)
              setOptions(false) // Closing options
            }}>New Record</button>}
          </div>}
        </div>

        {/* Ledger Records fetch from the database */}
        {ledgerRecordArray.map((element, index) => {
          return(<SingleLedger key={index} ledgerRecord={element} keyIndex={index}/>)
        })}

        
        

        {/* New ledger record form */}
        <AnimatePresence>
          {newLegerRecord && <NewLegerForm closeForm={toggleNewLegerRecord} treasury={props.attributes.treasury} loadLedgers={loadLedgers}/>}
        </AnimatePresence>
        
      </div>
      
  
    
  )
}
