import React from 'react'
import CashFlowPaper from './CashFlowPaper'
import CashflowEditor from './CashflowEditor'

import '../../styles/cashflow.css'

export default function CashFlow() {
  return (
    <div className='inner-screen-border'>
      <div className="row">

        <div className="column" >
          <CashFlowPaper/>
        </div>

        <div className="column" style={{justifyContent: 'flex-start'}}>
          <CashflowEditor/>
        </div>

      </div>
    </div>
  )
}
