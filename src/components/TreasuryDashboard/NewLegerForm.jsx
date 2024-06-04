import React, {useState} from 'react'
import {Input} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import PlusIcon from '../../assets/icons/plus.png'
import {motion, AnimatePresence} from 'framer-motion'
import Evidence from '../../dataModels/Evidence'
import EvidenceTitle from './EvidenceTitle'
import LedgerRecordModel from '../../dataModels/LedgerRecordModel'


export default function NewLegerForm(props) {
  // Evidence state of the window
  const [evidenceState, toggleEvidenceState] = useState(false)

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


  // User clicks on the create record button 
  const onSubmission = async () => {
    // Creating new LedgerRecord instant
    const ledgerRecord = new LedgerRecordModel({...newRecord, evidenceArray: evidenceArray, treasuryID: props.treasury.getTreasuryID()}) 
    await ledgerRecord.uploadEvidenceImages() // Trigger to upload images to the firebase
    // Now Ledger record is ready to be transfer to the backend
    console.log('hElloo')
    console.log('json Extract', ledgerRecord.extractJSON())
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
                <Input onChange={(e) => {setNewRecord({...newRecord, title: e.target.value})}}/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">
              <label>Description: </label>
              <PrimaryBorder borderRadius='6px' width='100%'>
                <Input onChange={(e) => {setNewRecord({...newRecord, description: e.target.value})}}/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">
              <label>Amount: </label>
              <PrimaryBorder borderRadius='6px' width='140px'>
                <Input type='number' onChange={(e) => {setNewRecord({...newRecord, amount: e.target.value})}}/>
              </PrimaryBorder>
              
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
