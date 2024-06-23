import React, {useState} from 'react'
import CashFlowPaper from './CashFlowPaper'
import CashflowEditor from './CashflowEditor'
import CashflowReportModel from '../../dataModels/CashflowReportModel'

import '../../styles/cashflow.css'

export default function CashFlow(props) {
  // Current cashflow values
  const [cashFlow, setCashFlow] = useState(new CashflowReportModel({}))

  return (
    <div className='inner-screen-border'>
      <div className="row">

        <div className="column" >
          <CashFlowPaper cashflow={cashFlow} treasury={props.treasury}/>
        </div>

        <div className="column" style={{justifyContent: 'flex-start'}}>
          <CashflowEditor cashFlow={{cashflow: cashFlow, setCashflow:setCashFlow}}/>
        </div>

      </div>
    </div>
  )
}
