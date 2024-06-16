import React, {useRef} from 'react'
import '../../styles/report-paper.css'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ReportPaper(props) {
  const pdfRef = useRef()

  return (
    <div className='report-paper-border' ref={pdfRef}>
      <h2 className='estimate-report'>ESTIMATE REPORT</h2>

      <h2 className='treasury-name'>AIESEC: Develop your leadership</h2>

      <p className='estimate-name'>Surasetha 2024</p>


      <div className="report-content">
          <div className="row">
            <div className="column">
              <p>Subject:</p>

            </div>

            <div className="column" style={{flexGrow: '5'}}>
              <p>This report outlines the estimated cost of building materials for the [Project Name] project. It serves as a planning tool to understand the material budget and potential cost fluctuations.</p>
            </div>
          </div>

          <div className="row">
            <div className="column">
              <p>Estimation vote</p>
            </div>

            <div className="column"><p>: TS0000000000000001</p></div>
          </div>

          <div className="row">
            <div className="column">
              <p>Treasury ID</p>
            </div>

            <div className="column"><p>: TS0000000000000001</p></div>
          </div>

          <div className="row">
            <div className="column">
              <p>Issuance Date</p>
            </div>

            <div className="column"><p>: 2024/03/05</p></div>
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
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr>
              <th colSpan={5}>Overseerages & Contingencies</th>
              <th></th>
            </tr>

            <tr>
              <th colSpan={5}>Total Amount</th>
              <th></th>
            </tr>
          </tbody>

          
        </table>
      </div>


      <div className="report-content">
      <p style={{textAlign: "center", marginBottom: '20px'}}>Estimate for the Surasetha event is LKR 27, 500.00 and submitted it for approval. </p>

      <p>Digital Signature</p>
      </div>

      <div className="digital-signature">

      </div>

    </div>
  )
}
