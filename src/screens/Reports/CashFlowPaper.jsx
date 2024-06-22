import React from 'react'

import '../../styles/cashflow-paper.css'

export default function CashFlowPaper() {
  return (
    <div className='cashflow-paper-border'>
        <h2>CASHFLOW STATEMENT REPORT</h2>

        <h2 className='treasury-name'>AISEC: Your leader ship development partnear</h2>



        <div className="report-details">
            <div className="row">
                <div className="column">
                    <p>CFSR Vote</p>
                </div>

                <div className="column">
                    <p>: CF0000000000000001</p>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>Treasury ID</p>
                </div>

                <div className="column">
                    <p>: CF0000000000000001</p>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>Insurance Date</p>
                </div>

                <div className="column">
                    <p>: 2024-06-24</p>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>Document Type</p>
                </div>

                <div className="column">
                    <p>: Detailed</p>
                </div>
            </div>
        </div>
    </div>
  )
}
