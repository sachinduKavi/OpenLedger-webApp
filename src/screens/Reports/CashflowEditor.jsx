import React, {useState} from 'react'

import {DatePicker, Switch} from 'antd'
import PDFicon from '../../assets/icons/pdfDownload.png'
import CashflowReportModel from '../../dataModels/CashflowReportModel'

import '../../styles/cashflow-editor.css'

import BackIcon from '../../assets/icons/leftback.png'
import PrimaryBorder from '../../components/PrimaryBorder'


export default function CashflowEditor(props) {

  const cashflow = props.cashFlow.cashflow
  const setCashflow = props.cashFlow.setCashflow
 
  const [documentType, setDocumentType] = useState(true)

  // User click on update button
  // This will update the existing record or create new record
  const updateCashflow = async () => {
    cashflow.setDocumentType(documentType ? 'DETAILED': 'SUMMARY')
    const res = await cashflow.saveCashflowRecord() // Update backend
    console.log('response', res)
    if(res) {
      if(res.process) {
        // Data proceed successfully
        setCashflow(new CashflowReportModel(res.content)) // Set values from the database
      } else {
        // Function not proceed
        console.log('Server error', res.errorMessage) 
      }
    } else {    
      // Connection Error ** notify user
      throw "Network Error"
    }
  }


  return (
    <div className='estimate-editor-border cashflow'>
      <div className="row">
        <img src={BackIcon} alt="back-icon" />
        <h2>CASHFLOW STATEMENT REPORT EDITOR</h2>
      </div>

      <label htmlFor="">Insurance Date</label>
      <PrimaryBorder borderRadius='6px' width='fit-content'>
        <DatePicker onChange={(e, stringDate) => {
          cashflow.setInsuranceDate(stringDate)
        }}/>
      </PrimaryBorder>
      

      <div className="row" style={{marginTop: '15px'}}>
        <label htmlFor="" style={{margin: '0 40px 0 0'}}>Document Type</label>
        <Switch
        value={documentType}
          onChange={(e) => {
            setDocumentType(e)
          }}
        />

        <h4 style={{marginLeft: '15px'}}>{documentType?'DETAILED': 'SUMMARY'}</h4>
      </div>

      <div className="row">
        <div className="column">
          <label htmlFor="">Staring Date</label>
          <PrimaryBorder borderRadius='6px' width='fit-content'>
          <DatePicker onChange={(e, stringDate) => {
          cashflow.setRangeStart(stringDate)
        }}/>
          </PrimaryBorder>
        </div>

        <div className="column" style={{marginLeft: '30px'}}>
          <label htmlFor="">Ending Date</label>
          <PrimaryBorder borderRadius='6px' width='fit-content'>
          <DatePicker onChange={(e, stringDate) => {
          cashflow.setRangeEnd(stringDate)
        }}/>
          </PrimaryBorder>
        </div>
      </div>

      <div className="column">
          <div className="row">
            <PrimaryBorder borderRadius='10px'>
              <button onClick={updateCashflow}>UPDATE</button>
            </PrimaryBorder>

            <PrimaryBorder borderRadius='10px' margin='0 0 0 10px'>
              <button style={{backgroundColor: 'red'}}>DISCARD</button>
            </PrimaryBorder>
          </div>

          <div className="row" style={{marginTop: '10px'}}>
            <PrimaryBorder borderRadius='10px'>
              <button>PUBLISH</button>
            </PrimaryBorder>

            <PrimaryBorder borderRadius='10px' margin='0 0 0 10px'>
              <button style={{padding: '2px 5px'}}><img src={PDFicon} alt="" width='25' /></button>
            </PrimaryBorder>


            <PrimaryBorder borderRadius='10px' margin='0 0 0 10px'>
              <button>SIGNATURE</button>
            </PrimaryBorder>


          </div>
      </div>

      
        
    </div>
  )
}
