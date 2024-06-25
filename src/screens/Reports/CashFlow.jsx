import React, {useState, useRef} from 'react'
import CashFlowPaper from './CashFlowPaper'
import CashflowEditor from './CashflowEditor'
import CashflowReportModel from '../../dataModels/CashflowReportModel'

import '../../styles/cashflow.css'
import ReportPreviewCashflow from './ReportPreviewCashflow'

export default function CashFlow(props) {
  // Current cashflow values
  const [cashFlow, setCashFlow] = useState(new CashflowReportModel({}))
  const documentRef = useRef()

  return (
    <div className='inner-screen-border'>
      <div className="row">

        <div className="column" >

          

          <CashFlowPaper cashflow={cashFlow} treasury={props.treasury} ref={documentRef}/>
        </div>

        <div className="column" style={{justifyContent: 'flex-start'}}>
        
          <ReportPreviewCashflow activeUser={props.activeUser}/>
          {/* <CashflowEditor cashFlow={{cashflow: cashFlow, setCashflow:setCashFlow}} activeUser={props.activeUser}
            pdfDownloadRef={documentRef}
          /> */}
        </div>

      </div>
    </div>
  )
}
