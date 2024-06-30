import React, {useState, useRef} from 'react'
import CashFlowPaper from './CashFlowPaper'
import CashflowEditor from './CashflowEditor'
import CashflowReportModel from '../../dataModels/CashflowReportModel'

import '../../styles/cashflow.css'
import ReportPreviewCashflow from './ReportPreviewCashflow'

export default function CashFlow(props) {

  // Current cashflow values
  const [cashFlow, setCashFlow] = useState(null)
  const documentRef = useRef()

  return (
    <div className='inner-screen-border'>
      <div className="row">

        <div className="column" >

          
          {cashFlow !== null
          ? <CashFlowPaper cashflow={cashFlow} treasury={props.treasury} ref={documentRef}/>
          : <div className="placeholder">
              <h5>Select a report to preview or create new report</h5>
            </div>}
        </div>

        <div className="column" style={{justifyContent: 'flex-start'}}>

          
        
          {
            cashFlow === null || props.activeUser.getUserLevel() < 2
            ? <ReportPreviewCashflow activeUser={props.activeUser} setCashflow={setCashFlow}/>

            : <CashflowEditor cashFlow={{cashflow: cashFlow, setCashflow:setCashFlow}} activeUser={props.activeUser}
            pdfDownloadRef={documentRef}
          />}
        </div>

      </div>
    </div>
  )
}
