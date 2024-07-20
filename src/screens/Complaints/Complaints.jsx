import React from 'react'
import {motion} from 'framer-motion'
import ComplaintForm from '../../components/ComplaintForm'
import ComplaintList from '../../components/ComplaintList'

import '../../styles/complaint.css'




export default function Complaints() {
  return (
    <motion.div className='panel-outside-border'
      initial={{x: 1500}}
      animate={{x: 0, transition: {duration: 0.3, delay: 0.2}}}
      exit={{y: 1000, transition: {delay: 0.1}}}
    >

      <div className="row">
        <div className="column">
          <ComplaintForm/>
        </div>

      <div className='row1'>
        <h2>Complaints</h2>
        <div className="column1">
        <ComplaintList/>
        </div>
        <div className="column2">
        <ComplaintList/>
        </div>
        </div>
      </div>
      
      
      



    </motion.div>
    
 
    
  )
}
