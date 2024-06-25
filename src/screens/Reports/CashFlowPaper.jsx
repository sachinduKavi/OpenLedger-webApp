import React, {useRef, forwardRef, useImperativeHandle} from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import '../../styles/cashflow-paper.css'

const CashFlowPaper = forwardRef((props, ref) => {

    // Cashflow instant
    const cashflow = props.cashflow
    let incomeTotal = 0
    let expenseTotal = 0

    const pdfRef = useRef()

     // Converting PDF to canvas
  const downloadPDF = () => {
    console.log('downloading document...')
    const input = pdfRef.current
    html2canvas(input, {
      scale: 7,
      useCORS: true}
    ).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4', true)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgHeight = canvas.height
      const imgWidth = canvas.width

      const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight)
      const imgX = (pdfWidth - imgWidth*ratio)
      const imgY = 0

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio)
      pdf.save(`Estimate Report ${cashflow.getReportID()}`)

    })
}   

    useImperativeHandle(ref, () => ({
        downloadPDF,
    }))


    if(cashflow.getDocumentType() === 'SUMMARY') return(
    
        <div className='cashflow-paper-border' ref={pdfRef}>
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
                        let categoryLen = cashflow.getIncomeArray()[category].length - 1
                        return (
                            <div key={index}>
                            
                                {
                                    cashflow.getIncomeArray()[category].map((element01, index01) => {
                                        categoryTotal += element01.amount
                                        incomeTotal += element01.amount
                                        if(categoryLen === index01)
                                        return (<div className="row" key={index01} >
                                    
                                            <div className="record"><p style={{lineHeight: 1}}>{category.replace('_', ' ')} </p></div>
                                            <div className="amount num"></div>
                                            <div className="category-total num"><p >{categoryTotal}</p></div>
                                            <div className='num'></div>
                        
                                        </div>)
                                    })
                                }
                            </div>
                        )
                    })
                }

                <div className='total row'>
                    <div className="gross-total-name record"><h4>GROSS INCOME</h4></div>
                    <div className="num"></div>
                    <div className="num"><p>{incomeTotal}</p></div>
                    <div className="num"><p>{incomeTotal}</p></div>
                </div>

            </div>


            <div className="expense">
                <h3>EXPENSE</h3>

                {   

                    Object.keys(cashflow.getExpenseArray()).map((category, index) => {
                        let categoryTotal = 0
                        
                        let categoryLen = cashflow.getExpenseArray()[category].length - 1
                        return (
                            <div key={index}>
                            
                                {
                                    cashflow.getExpenseArray()[category].map((element01, index01) => {
                                        categoryTotal += element01.amount
                                        expenseTotal += element01.amount
                                        if(categoryLen === index01)
                                        return (<div className="row" key={index01} >
                                    
                                            <div className="record"><p style={{lineHeight: 1}}>{category.replace('_', ' ')} </p></div>
                                            <div className="amount num"></div>
                                            <div className="category-total num"><p >{categoryTotal}</p></div>
                                            <div className='num'></div>
                        
                                        </div>)
                                    })
                                }
                            </div>
                        )
                    })
                }

                <div className='total row'>
                    <div className="gross-total-name record"><h4>GROSS INCOME</h4></div>
                    <div className="num"></div>
                    <div className="num"><p>{expenseTotal}</p></div>
                    <div className="num"><p>{expenseTotal}</p></div>
                </div>

            </div>

            <div className="net-balance row">
                <div className="net-balance-name"><h4>NET BALANCE</h4></div>
                <div className="num"></div>
                <div className="num"></div>
                <div className="num"><p>{incomeTotal+expenseTotal}</p></div>
            </div>
        </div>

        <p className='signature'>Digital Signature</p>
        <div className="digital-signature"   style={{ whiteSpace: 'pre-wrap', fontSize: 13}}>
                {
                    cashflow.getSignatureArray().map((element, index) => <p key={index}>{element}</p>)
                }
        </div>
    </div>
    )

  return (
    <div className='cashflow-paper-border' ref={pdfRef}>
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
                        let categoryLen = cashflow.getIncomeArray()[category].length - 1
                        return (
                            <div key={index}>
                                <h3 className="category"> {category.replace('_', ' ')} </h3>
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

                <div className='total row'>
                    <div className="gross-total-name record"><h4>GROSS INCOME</h4></div>
                    <div className="num"></div>
                    <div className="num"><p>{incomeTotal}</p></div>
                    <div className="num"><p>{incomeTotal}</p></div>
                </div>

            </div>


            <div className="expense">
                <h3>EXPENSE</h3>

                {   

                    Object.keys(cashflow.getExpenseArray()).map((category, index) => {
                        let categoryTotal = 0
                        
                        let categoryLen = cashflow.getExpenseArray()[category].length - 1
                        return (
                            <div key={index}>
                                <h3 className="category"> {category.replace('_', ' ')} </h3>
                                {
                                    
                                    cashflow.getExpenseArray()[category].map((element01, index01) => {
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

                <div className='total row'>
                    <div className="gross-total-name record"><h4>GROSS INCOME</h4></div>
                    <div className="num"></div>
                    <div className="num"><p>{expenseTotal}</p></div>
                    <div className="num"><p>{expenseTotal}</p></div>
                </div>

            </div>

            <div className="net-balance row">
                <div className="net-balance-name"><h4>NET BALANCE</h4></div>
                <div className="num"></div>
                <div className="num"></div>
                <div className="num"><p>{incomeTotal+expenseTotal}</p></div>
            </div>
        </div>

        <p className='signature'>Digital Signature</p>
        <div className="digital-signature"   style={{ whiteSpace: 'pre-wrap', fontSize: 13}}>
                {
                    cashflow.getSignatureArray().map((element, index) => <p key={index}>{element}</p>)
                }
        </div>
    </div>
  )
})

export default CashFlowPaper
