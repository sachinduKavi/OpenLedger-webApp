import React, {useState} from 'react'
import EditIcon from '../../assets/icons/boxEdit.png'
import {animate, motion} from 'framer-motion'


import '../../styles/report-banner.css'
import EstimateReport from '../../dataModels/EstimateModel'


export default function ReportBanner(props) {
    const estimate = props.estimate
    const user = props.activeUser

    // Returns null if the user level is less or equal to 2
    // Drafts can be accessed by only high rankers 
    if(user.getUserLevel() <= 2 && estimate.getStatus() === 'DRAFT')  return null
  return (
    <motion.div className='report-banner-border'
        whileTap={{scale: 0.95}}
        onClick={() => {
            console.log('click')
            props.setEstimateValues(new EstimateReport(estimate.extractJSON()))
        }}
    >
        <div className="column" style={{flex: '2 2 0'}}>
            <h3>{estimate.getName()}</h3>
            <h4>{estimate.getEstimationID()}</h4>
            
        </div>

 

        <div className="column" style={{alignItems: 'flex-end'}}>
            {estimate.getStatus() === 'PUBLISHED'
                ? <h4 style={{color: '#32AF4E'}}>PUBLISHED</h4>
                : <h4 style={{color: 'red'}}>DRAFT</h4> 
            }
            
            <h5>{estimate.getPublisher()}</h5>
            <h6>{estimate.getInsuranceDate()}</h6>
        </div>

        
    </motion.div>
  )
}
