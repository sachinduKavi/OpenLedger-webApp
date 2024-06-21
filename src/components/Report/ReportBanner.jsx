import React, {useState} from 'react'
import EditIcon from '../../assets/icons/boxEdit.png'
import {animate, motion} from 'framer-motion'


import '../../styles/report-banner.css'
import EstimateReport from '../../dataModels/EstimateModel'


export default function ReportBanner(props) {
    const estimate = props.estimate

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
            <h4 style={{color: '#32AF4E'}}>PUBLISHED</h4>
            <h5>{estimate.getPublisher()}</h5>
            <h6>2024/06/20</h6>
        </div>

        
    </motion.div>
  )
}
