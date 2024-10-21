import React, {useRef, useContext, forwardRef, useImperativeHandle} from 'react'

import '../../styles/report-paper.css'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { SessionContext } from '../../Session'


import {numberFormat} from '../../middleware/FormatChecker'


const ReportPaper = forwardRef((props, ref) => {
  


  const pdfRef = useRef()
  const sessionData = useContext(SessionContext)
  const changeSessionData = sessionData.changeSessionData
  const estimateValues = props.estimate.estimateValues
  const setEstimate = props.estimate.setEstimateValues

  const expenseArray = estimateValues.getExpenseArray()
  let netTotal = 0


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
      pdf.save(`Estimate Report ${estimateValues.getEstimationID()}`)

    })

    
  }

  useImperativeHandle(ref, () => ({
    downloadPDF,
  }))


  return (
    <div className='report-paper-border' ref={pdfRef}>
      <h2 className='estimate-report'>ESTIMATE REPORT</h2>

      <h2 className='treasury-name'>{props.treasury.getTreasuryName()}</h2>

      <p className='estimate-name'>{estimateValues.getName()}</p>


      <div className="report-content">
          <div className="row">
            <div className="column">
              <p>Subject:</p>

            </div>

            <div className="column" style={{flexGrow: '5'}}>
              <p>{estimateValues.getDescription()}</p>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <p>Estimation vote</p>
            </div>

            <div className="column"><p>: {estimateValues.getEstimationID()}</p></div>
          </div>

          <div className="row">
            <div className="column">
              <p>Treasury ID</p>
            </div>

            <div className="column"><p>: {props.treasury.getTreasuryID()}</p></div>
          </div>

          <div className="row">
            <div className="column">
              <p>Issuance Date</p>
            </div>

            <div className="column"><p>: {estimateValues.getInsuranceDate()}</p></div>
          </div>

      </div>


      <div className="transaction-table">
        <table border={1} cellSpacing={0}>
          <thead>
          <tr>
            <th>Item No</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Item Of Work</th>
            <th>Rate (Rs.)</th>
            <th>Amount (Rs.)</th>
          </tr>
          </thead>
          

          {/* Dynamic number of rows are added */}
          <tbody>

            {expenseArray.map((element, index) => {
              netTotal += element.calculateExpense()
              return(<tr key={index}>
                    <td>{index+1}</td>
                    <td>{element.getQuantity()}</td>
                    <td>{element.getUnit()}</td>
                    <td>{element.getItemOfWork()}</td>
                    <td className='rupee-format'>{numberFormat(element.getRate() ?? 0)}</td>
                    <td className='rupee-format'>{numberFormat(element.calculateExpense() ?? 0)}</td>
                  </tr>)
            })
              
            }


            <tr>
              <th colSpan={5}>Overseerages & Contingencies</th>
              <th className='rupee-format'>{estimateValues.getOverseerages()}</th>
            </tr>

            <tr>
              <th colSpan={5}>Total Amount</th>
              <th className='rupee-format'>{netTotal + parseFloat(estimateValues.getOverseerages())}</th>
            </tr>
          </tbody>

          
        </table>
      </div>


      <div className="report-content">
      <p style={{textAlign: "center", marginBottom: '20px'}}>Estimate for the {estimateValues.getName()} event is LKR {netTotal + parseFloat(estimateValues.getOverseerages())} and submitted it for approval. </p>

      <p>Digital Signature</p>
      </div>

      <div className="digital-signature"  style={{ whiteSpace: 'pre-wrap', fontSize: 13}}>
            {
              estimateValues.getSignatureArray().map((element, index) => <p key={index}>
                {element}
              </p>)
            }
      </div>

    </div>
  )
})

export default ReportPaper


