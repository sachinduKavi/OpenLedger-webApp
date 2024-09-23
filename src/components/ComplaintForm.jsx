import React, {useState, useContext} from 'react';
import {motion, AnimatePresence} from 'framer-motion'
import '../styles/ComplaintForm.css';
import { capitalize } from '../middleware/auth';
import ComplaintModel from '../dataModels/ComplaintModel';
import toast from 'react-hot-toast';
import PlusIcon from '../assets/icons/plus.png'
import EvidenceTitle from './TreasuryDashboard/EvidenceTitle';
import { SessionContext } from '../Session';
import ToastCustom from './ToastCustom';



export default function ComplaintForm(props) {
  const {value, refresh} = props.refresh
  const changeSessionData = useContext(SessionContext).changeSessionData

  const [evidenceState, toggleEvidenceState] = useState(false)
  // Evidence array 
  const [evidenceArray, changeEvidenceArray] = useState([])
  // Complaint values
  const [formValues, setFormValues] = useState(new ComplaintModel({}))


  // Add new evidence to the evidence array and display the evidence prompt function
  const createNewEvidence = (evidenceObj) => {
    // console.log('return object ', evidenceObj)
    if(evidenceObj.getDescription() !== "" || evidenceObj.getImageFile() !== null) {
      // Incrementing evidence array
      changeEvidenceArray([...evidenceArray, evidenceObj])
    }
    
    toggleEvidenceState(false) // Closing evidence pop up window

  }

  // Submission of values 
  const onSubmission = async () => {
    changeSessionData({processing: true}) // Processing starts ...
    // Updating evidence values to the object 
    formValues.setEvidenceArray(evidenceArray)
    setFormValues(new ComplaintModel(formValues.extractJSON()))

    // Uploading the evidences
    await formValues.uploadEvidenceImages()
    
    if(await formValues.createNewComplaint()) {
      // Success
      toast.custom(<ToastCustom type='success' header='Complaint Success'>Compliant created successfully. Now you have to wait for a response.</ToastCustom>);
      refresh(!value)
      formRest() // Reset form structure 
    } else {
      // Failed to create complaint 
      toast.custom(<ToastCustom type='error' header='Something went wrong'>We could not create complaint, please try again later.</ToastCustom>);
    }

    changeSessionData({processing: false}) // Processing ends...
  }


  // Reset the whole form
  const formRest = () => {
    setFormValues(new ComplaintModel({}))
    changeEvidenceArray([])
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
            setFormValues(new ComplaintModel(formValues.extractJSON()))
          }} value={formValues.getSubject()??""}/>
        </label>
        <label>
          Description:
          <textarea onChange={(e) => {
            formValues.setCaption(capitalize(e.target.value))
            setFormValues(new ComplaintModel(formValues.extractJSON()))
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
          <input type="checkbox" onChange={(e) => {
            formValues.setAnonymous(e.target.checked)
            setFormValues(new ComplaintModel(formValues.extractJSON()))
          }}/>
          <span>Anonymous</span>
        </label>
        <div className='btn'>
        <button onClick={formRest} type='reset'>Reset</button>
        <button type="button" onClick={onSubmission}>Submit</button>
        
        </div>
      </form>
    </div>

    <AnimatePresence>
              {evidenceState && <EvidenceTitle createNew={createNewEvidence} toggleClose={toggleEvidenceState}/>}
    </AnimatePresence>
  

    </div>
  )
}

