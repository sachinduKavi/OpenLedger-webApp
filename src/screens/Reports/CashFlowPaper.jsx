import React from 'react'

import '../../styles/cashflow-paper.css'

export default function CashFlowPaper(props) {

    // Cashflow instant
    const cashflow = props.cashflow
    
  return (
    <div className='cashflow-paper-border'>
        <h2>CASHFLOW STATEMENT REPORT</h2>

        <h2 className='treasury-name'>{props.treasury.getTreasuryName()}</h2>



        <div className="report-details">
            <div className="row">
                <div className="column">
                    <p>CFSR Vote</p>
                </div>

                <div className="column">
                    <p>: {cashflow.getReportID()}</p>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>Treasury ID</p>
                </div>

                <div className="column">
                    <p>: {props.treasury.getTreasuryID()}</p>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>Insurance Date</p>
                </div>

                <div className="column">
                    <p>: {cashflow.getInsuranceDate()}</p>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p>Document Type</p>
                </div>

                <div className="column">
                    <p>: {cashflow.getDocumentType()}</p>
                </div>
            </div>
        </div>



        <div className="report-content">
        <div className="income">
                <h3>INCOME</h3>

                {
                    Object.keys(cashflow.getIncomeArray()).map((category, index) => {
                        console.log(category)
                        let categoryTotal = 0
                        return (
                            <>
                                <h3 className="category"> {category} </h3>
                                {
                                    
                                    cashflow.getIncomeArray()[category].map((element01, index01) => {
                                        categoryTotal += element01.amount
                                        return (<div className="row" key={index01}>
                                    
                                            <div className="record"><p >{element01.title}</p></div>
                                            <div className="amount num"><p >{element01.amount}</p></div>
                                            <div className="category-total num"><p >{categoryTotal}</p></div>
                                            <div className='num'></div>
                        
                                        </div>)
                                    })
                                }
                            </>
                        )
                    })
                }

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
