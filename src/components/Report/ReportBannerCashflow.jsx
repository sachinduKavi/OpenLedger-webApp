import React, {useState} from 'react'
import EditIcon from '../../assets/icons/boxEdit.png'
import {animate, motion} from 'framer-motion'

import { getCashflowReport } from '../../query/reportQuery'

import CashflowReportModel from '../../dataModels/CashflowReportModel'


import '../../styles/report-banner.css'


export default function ReportBannerCashflow(props) {
    const cashflow = props.cashflow
    const setCashflow = props.setCashflow

    // Get data from the backend for specific cashflow report
    const getCashflowValues = async () => {
        const response = await getCashflowReport(cashflow.reportID)
        if(response.status === 200) {
            if(response.data.proceed) {
                // Proceed success
                setCashflow(new CashflowReportModel(response.data.content)) // Creating new object 
            } else {
                // Proceed failed
            }
        } else {
            // Network Error
        }
    }

    // Returns null if the user level is less or equal to 2
    // Drafts can be accessed by only high rankers 
   
  return (
    <motion.div className='report-banner-border'
        whileTap={{scale: 0.95}}
        onClick={getCashflowValues}
    >
        <div className="column" style={{flex: '2 2 0'}}>
            <h3>{cashflow.reportID}</h3>
            <h4>{cashflow.publisher}</h4>
            <h4>{cashflow.insuranceDate}</h4>
            
        </div>


 

        <div className="column" style={{alignItems: 'flex-end'}}>
            {cashflow.status === 'PUBLISHED'
                ? <h4 style={{color: '#32AF4E'}}>PUBLISHED</h4>
                : <h4 style={{color: 'red'}}>DRAFT</h4> 
            }
            
            <h6>Start: {cashflow.rangeStart}</h6>
            <h6>End:   {cashflow.rangeEnd}</h6>
        </div>

        
    </motion.div>
  )
}
