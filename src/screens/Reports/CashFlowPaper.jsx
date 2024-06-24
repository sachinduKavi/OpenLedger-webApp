import React from 'react'

import '../../styles/cashflow-paper.css'

export default function CashFlowPaper(props) {

    // Cashflow instant
    const cashflow = props.cashflow
    let incomeTotal = 0
    let expenseTotal = 0

    console.log('Array', cashflow.getExpenseArray())
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
            
                        let categoryTotal = 0
                        let categoryLen = cashflow.getIncomeArray()[category]?.length??0 - 1
                        return (
                            <div key={index}>
                                <h3 className="category"> {category} </h3>
                                {
                                    cashflow.getIncomeArray()[category].map((element01, index01) => {
                                        categoryTotal += element01.amount
                                        incomeTotal += element01.amount
                                        return (<div className="row" key={index01}>
                                    
                                            <div className="record"><p style={{lineHeight: 1}}>{element01.title} <i style={{fontSize: '10px', margin: '0'}}>({element01.createdDate})</i></p></div>
                                            <div className="amount num"><p >{element01.amount}</p></div>
                                            <div className="category-total num"><p style={{visibility: categoryLen === index01?'visible': 'hidden'}}>{categoryTotal}</p></div>
                                            <div className='num'></div>
                        
                                        </div>)
                                    })
                                }
                            </div>
                        )
                    })
                }

                <div className='total'>
                    <div className="gross-total-name record"><h4>GROSS INCOME</h4></div>
                    <div className="num"></div>
                    <div className="num">{incomeTotal}</div>
                    <div className="num">{incomeTotal}</div>
                </div>

            </div>


            <div className="expense">
                <h3>EXPENSE</h3>

                {   

                    Object.keys(cashflow.getExpenseArray()).map((category, index) => {
                        let categoryTotal = 0
                        
                        let categoryLen = cashflow.getIncomeArray()[category]?.length??0 - 1
                        return (
                            <div key={index}>
                                <h3 className="category"> {category} </h3>
                                {
                                    
                                    cashflow.getIncomeArray()[category].map((element01, index01) => {
                                        categoryTotal += element01.amount
                                        expenseTotal += element01.amount
                                        return (<div className="row" key={index01}>
                                    
                                            <div className="record"><p style={{lineHeight: 1}}>{element01.title} <i style={{fontSize: '10px', margin: '0'}}>({element01.createdDate})</i></p></div>
                                            <div className="amount num"><p >{element01.amount}</p></div>
                                            <div className="category-total num"><p style={{visibility: categoryLen === index01?'visible': 'hidden'}}>{categoryTotal}</p></div>
                                            <div className='num'></div>
                        
                                        </div>)
                                    })
                                }
                            </div>
                        )
                    })
                }

                <div className='total'>
                    <div className="gross-total-name record"><h4>GROSS INCOME</h4></div>
                    <div className="num"></div>
                    <div className="num">{expenseTotal}</div>
                    <div className="num">{expenseTotal}</div>
                </div>

            </div>

            <div className="net-balance">
                <div className="net-balance-name"><h4>NET BALANCE</h4></div>
                <div className="num"></div>
                <div className="num"></div>
                <div className="num">{incomeTotal-expenseTotal}</div>
            </div>
        </div>

        <p className='signature'>Digital Signature</p>
        <div className="digital-signature">

        </div>
    </div>
  )
}
