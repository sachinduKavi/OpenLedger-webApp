import React, {useState, useContext, useEffect} from 'react'
import {ConfigProvider, Input, InputNumber, Switch} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import PlusIcon from '../../assets/icons/plus.png'
import {motion, AnimatePresence} from 'framer-motion'
import Evidence from '../../dataModels/Evidence'
import EvidenceTitle from './EvidenceTitle'
import LedgerRecordModel from '../../dataModels/LedgerRecordModel'
import { SessionContext } from '../../Session'

export default function NewLegerForm(props) {
  // Include global session data
  const changeSessionData = useContext(SessionContext).changeSessionData
  // Evidence state of the window
  const [evidenceState, toggleEvidenceState] = useState(false)
  const [positiveRecord, changePositiveRecord] = useState(true)

  // error State of the input boxes 
  const [inputErrorState, setInputState] = useState({
    title: false,
    description: false,
    amount: false
  })

  // User entered values 
  const [newRecord, setNewRecord] = useState({
    title: '',
    description: '',
    amount: 0
  })
  
  // Evidence array 
  const [evidenceArray, changeEvidenceArray] = useState([])
  // Add new evidence to the evidence array and display the evidence prompt function
  const createNewEvidence = (evidenceObj) => {
    // console.log('return object ', evidenceObj)
    if(evidenceObj.getDescription() !== "" || evidenceObj.getImageFile() !== null) {
      // Incrementing evidence array
      changeEvidenceArray([...evidenceArray, evidenceObj])
    }
    toggleEvidenceState(false) // Closing evidence pop up window
  }

  // Check whether all the input fields are filled 
  const checkInputValidity = () => {
    if (newRecord.title === '') setInputState({...inputErrorState, title: true}) 
      else setInputState({...inputErrorState, title: false})
    if (newRecord.description === '') setInputState({...inputErrorState, description: true})
      else setInputState({...inputErrorState, description: false})

    if (newRecord.amount === '') setInputState({...inputErrorState, amount: true})
      else setInputState({...inputErrorState, amount: false})

    return !inputErrorState.title && !inputErrorState.description && !inputErrorState.amount
  }

  // User clicks on the create record button 
  const onSubmission = async () => {
    changeSessionData({processing: true}) // Processing effect
    if(checkInputValidity()) { 
      // Creating new LedgerRecord instant
      let signAmount
      if (positiveRecord) // Change the sign of the ledger amount 
        signAmount = newRecord.amount/1
      else 
        signAmount = newRecord.amount/-1
      const ledgerRecord = new LedgerRecordModel({...newRecord, evidenceArray: evidenceArray, treasuryID: props.treasury.getTreasuryID(), amount: signAmount}) 
      await ledgerRecord.uploadEvidenceImages() // Trigger to upload images to the firebase
      // Now Ledger record is ready to be transfer to the backend
      console.log('json Extract', ledgerRecord.extractJSON())
    }
    changeSessionData({processing: false}) // Switch off global processing
  }


  return (
    <div className='ledger-form-overlay'>
      <div className="background-blur"></div>

      <div className="form-content">
          <div className="new-form-ledger">

            <div className='title-row'>
              <h2>CREATE NEW LEDGER RECORD</h2>

      
            </div>


            <div className="ledger-content-new">
              <label>Title: </label>
              <PrimaryBorder borderRadius='6px' width='50%'>
                <Input status={inputErrorState.title? 'error' : ''} onChange={(e) => {setNewRecord({...newRecord, title: e.target.value})}}/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">
              <label>Description: </label>
              <PrimaryBorder borderRadius='6px' width='100%'>
                <Input status={inputErrorState.description? 'error' : ''} onChange={(e) => {setNewRecord({...newRecord, description: e.target.value})}}/>
              </PrimaryBorder>
              
            </div>

            
            <div className="ledger-content-new">
              <label>Amount: </label>
              <div className="amount-container">
                <PrimaryBorder borderRadius='6px' width='140px'>
                  <Input status={inputErrorState.amount? 'error' : ''} onChange={(e) => {setNewRecord({...newRecord, amount: e.target.value})}} />
                </PrimaryBorder>

                <ConfigProvider theme={{
                  token: {
                    handleSize: 20,
                    colorPrimary: positiveRecord ? '#6CDB9A' : 'red'
                  }
                }}>
                  <Switch value={positiveRecord} onChange={() => {changePositiveRecord(!positiveRecord)}}/>

                  {positiveRecord ? <h3 style={{color: '#6CDB9A'}}>DEBIT RECORD</h3>
                                  : <h3 style={{color: 'red'}}>CREDIT RECORD</h3>}
                </ConfigProvider>
                
              </div>
              
            </div>

            {/* Add evidence to the ledger record */}
            <label>Add Evidence:</label>
            
            <div className="evidence-container">

                {/* Here user can see the evidence listed by them  */}
                {evidenceArray.map((element, index) => {
                  return(<div className="add-btn" key={index} style={{overflow: 'hidden'}}>
                  {(element.getImageFile() !== null) && <img src={URL.createObjectURL(element.getImageFile())} alt="Loading" height='120%'/>}
                </div>)
                })}
      
                <motion.div className="add-btn"
                  whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                  onClick={() => {toggleEvidenceState(!evidenceState)}}
                >
                  <img src={PlusIcon} alt="plus-icon" width='70%'/>
                </motion.div>
                
              
            </div>

              <div className="submission">
                <button style={{flexGrow: 1, margin: '5px'}} onClick={onSubmission}>CREATE</button>
                <button style={{border: '2px solid red', flexGrow: 1, margin: '5px'}}
                onClick={() => {props.closeForm(false)}}
                >CANCEL</button>
              </div>

            <AnimatePresence>
              {evidenceState && <EvidenceTitle createNew={createNewEvidence} toggleClose={toggleEvidenceState}/>}
            </AnimatePresence>
            
          </div>
      </div>
    </div>
  )
}
