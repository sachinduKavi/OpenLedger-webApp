import React, {useState} from 'react'
import RedCloseBtn from '../RedCloseBtn'
import {Input} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'
import PlusIcon from '../../assets/icons/plus.png'
import {motion, AnimatePresence} from 'framer-motion'
import Evidence from '../../dataModels/Evidence'
import EvidenceTitle from './EvidenceTitle'


export default function NewLegerForm() {
  const clickOnClose = () => {
    console.log('User click on close')
  }
  // Evidence state of the window
  const [evidenceState, toggleEvidenceState] = useState(false)
  
  // Evidence array 
  const [evidenceArray, changeEvidenceArray] = useState([])
  // Add new evidence to the evidence array and display the evidence prompt function
  const createNewEvidence = (evidenceObj) => {
    // console.log('return object ', evidenceObj)
    if(evidenceObj.getDescription() !== "" || evidenceObj.getImageFile() !== null) {
      // Incrementing evidence array
      changeEvidenceArray([...evidenceArray, evidenceObj])
      console.log('incrementing...')
    }
    toggleEvidenceState(false) // Closing evidence pop up window
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
                <Input/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">
              <label>Description: </label>
              <PrimaryBorder borderRadius='6px' width='100%'>
                <Input/>
              </PrimaryBorder>
              
            </div>

            <div className="ledger-content-new">
              <label>Amount: </label>
              <PrimaryBorder borderRadius='6px' width='140px'>
                <Input/>
              </PrimaryBorder>
              
            </div>

            {/* Add evidence to the ledger record */}
            <label>Add Evidence:</label>
            
            <div className="evidence-container">

                {/* Here user can see the evidence listed by them  */}
                {evidenceArray.map((element, index) => {
                  return(<div className="add-btn" key={index} style={{overflow: 'hidden'}}>
                  <img src={URL.createObjectURL(element.getImageFile())} alt="Loading" height='120%'/>
                </div>)
                })}
      
                <motion.div className="add-btn"
                  whileTap={{scale: 0.8, transition: {duration: 0.1}}}
                  onClick={() => {toggleEvidenceState(!evidenceState)}}
                >
                  <img src={PlusIcon} alt="plus-icon" width='70%'/>
                </motion.div>
           
              
            </div>
            <AnimatePresence>
              {evidenceState && <EvidenceTitle createNew={createNewEvidence} toggleClose={toggleEvidenceState}/>}
            </AnimatePresence>
            
          </div>
      </div>
    </div>
  )
}
