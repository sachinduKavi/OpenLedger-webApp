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



        <div className="report-content">
        <div className="income">
                <h3>INCOME</h3>

                <h3 className="category"> Transportation </h3>
                <div className="row">
                    <div className="record"><p>Bus Fees</p></div>
                    <div className="amount num"><p> 78545</p></div>
                    <div className="category-total num"><p >45000</p></div>
                    <div className='num'></div>
       
                </div>
                <div className="row">
                    <div className="record"><p >Sunith Sir</p></div>
                    <div className="amount num"><p >78545</p></div>
                    <div className="category-total num"><p >45000</p></div>
                    <div className='num'></div>
          
                </div>
                <div className="row">
                    <div className="record"><p >Sunith Sir</p></div>
                    <div className="amount num"><p >78545</p></div>
                    <div className="category-total num"><p >45000</p></div>
                    <div className='num'></div>
               
                </div>

                <div className='total'>
                    <div className="gross-total-name record"><h4>GROSS TOTAL</h4></div>
                    <div className="num"></div>
                    <div className="num">45822</div>
                    <div className="num"></div>
                </div>
            </div>


            <div className="expense">
                <h3>EXPENSE</h3>

                <h3 className="category"> Transportation </h3>
                <div className="row">
                    <div className="record"><p>Bus Fees</p></div>
                    <div className="amount num"><p> 78545</p></div>
                    <div className="category-total num"><p >45000</p></div>
                    <div className='num'></div>
       
                </div>
                <div className="row">
                    <div className="record"><p >Sunith Sir</p></div>
                    <div className="amount num"><p >78545</p></div>
                    <div className="category-total num"><p >45000</p></div>
                    <div className='num'></div>
          
                </div>
                <div className="row">
                    <div className="record"><p >Sunith Sir</p></div>
                    <div className="amount num"><p >78545</p></div>
                    <div className="category-total num"><p >45000</p></div>
                    <div className='num'></div>
               
                </div>

                <div className='total'>
                    <div className="gross-total-name record"><h4>TOTAL EXPENSE</h4></div>
                    <div className="num"></div>
                    <div className="num">45822</div>
                    <div className="num"></div>
                </div>
            </div>

            <div className="net-balance">
                <div className="net-balance-name"><h4>NET BALANCE</h4></div>
                <div className="num"></div>
                <div className="num"></div>
                <div className="num">458563</div>
            </div>
        </div>

        <p className='signature'>Digital Signature</p>
        <div className="digital-signature">

        </div>
    </div>
  )
}
