import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion'
import '../styles/ComplaintForm.css';
import { capitalize } from '../middleware/auth';
import Complaint from '../dataModels/Complaint';

import PlusIcon from '../assets/icons/plus.png'
import EvidenceTitle from './TreasuryDashboard/EvidenceTitle';



export default function ComplaintForm() {

  const [evidenceState, toggleEvidenceState] = useState(false)
  // Evidence array 
  const [evidenceArray, changeEvidenceArray] = useState([])
  // Complaint values
  const [formValues, setFormValues] = useState(new Complaint({}))


  // Add new evidence to the evidence array and display the evidence prompt function
  const createNewEvidence = (evidenceObj) => {
    // console.log('return object ', evidenceObj)
    if(evidenceObj.getDescription() !== "" || evidenceObj.getImageFile() !== null) {
      // Incrementing evidence array
      changeEvidenceArray([...evidenceArray, evidenceObj])
    }
    
    toggleEvidenceState(false) // Closing evidence pop up window

  }

  return (

    <div className='cmp-row'>
      <div className="cmp-complaint-form">
      <h2>Make a complaint</h2>
      <form>
        
        <label>
          Subject:
          <input type="text" onChange={(e) => {
            formValues.setSubject(capitalize(e.target.value))
            setFormValues(new Complaint(formValues.extractJSON()))
          }} value={formValues.getSubject()??""}/>
        </label>
        <label>
          Description:
          <textarea onChange={(e) => {
            formValues.setCaption(capitalize(e.target.value))
            setFormValues(new Complaint(formValues.extractJSON()))
          }} value={formValues.getCaption()??""}/>
        </label>
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
  
        <label className="identity">
          <input type="checkbox" />
          <span>Anonymous</span>
        </label>
        <div className='btn'>
        <button type="reset">Reset</button>
        <button type="button" >Submit</button>
        
        </div>
      </form>
    </div>

    <AnimatePresence>
              {evidenceState && <EvidenceTitle createNew={createNewEvidence} toggleClose={toggleEvidenceState}/>}
    </AnimatePresence>
  

    </div>
  )
}

