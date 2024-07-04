import React, {useState, useContext} from 'react'

import {DatePicker, Switch} from 'antd'
import { generateCurrentDate } from '../../middleware/GenerateCurrentDateTime'
import dayjs from 'dayjs'
import PDFicon from '../../assets/icons/pdfDownload.png'
import CashflowReportModel from '../../dataModels/CashflowReportModel'

import '../../styles/cashflow-editor.css'

import BackIcon from '../../assets/icons/leftback.png'
import PrimaryBorder from '../../components/PrimaryBorder'
import { SessionContext } from '../../Session'

export default function CashflowEditor(props) {
  const sessionData = useContext(SessionContext)
  const changeSessionData = sessionData.changeSessionData

  const cashflow = props.cashFlow.cashflow
  const setCashflow = props.cashFlow.setCashflow
  const activeUser = props.activeUser
 
  const [documentType, setDocumentType] = useState(true)

  const [formChange, setChange] = useState(false) // State of the form whether user made any new changes to the form


  // Assign current data if it is a new cashflow report
  const [dates, setDates] = useState({
    insuranceDate: cashflow.getInsuranceDate()?? generateCurrentDate(),
    rangeStart: cashflow.getRangeStart()?? generateCurrentDate(),
    rangeEnd: cashflow.getRangeEnd()?? generateCurrentDate()
  })

  // User click on update button
  // This will update the existing record or create new record
  const updateCashflow = async () => {
    changeSessionData({processing: true}) // loading screen

    // Setting up date
    cashflow.setInsuranceDate(dates.insuranceDate)
    cashflow.setRangeStart(dates.rangeStart)
    cashflow.setRangeEnd(dates.rangeEnd)

    cashflow.setDocumentType(documentType ? 'DETAILED': 'SUMMARY')
    const res = await cashflow.saveCashflowRecord() // Update backend
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
    setChange(false)
    changeSessionData({processing: false}) // loading screen
  }

  // Change cashflow state 
  const changeCashflowState = (state) => {
    cashflow.setStatus(state)
    updateCashflow()
  }


  // Delete the cashflow report from the database 
  const cashflowReportDiscard = () => {
    if(cashflow.reportDiscard()) {
      // Report deleted successfully
      setCashflow(null) // directing back to report preview
    } else {
      // Record deletion error
    }
  }


  return (
    <div className='estimate-editor-border cashflow'>
      <div className="row">
        <img src={BackIcon} alt="back-icon" onClick={() => {
          setCashflow(null)
        }}/>
        <h2>CASHFLOW STATEMENT REPORT EDITOR</h2>
      </div>

      <label htmlFor="">Insurance Date</label>
      <PrimaryBorder borderRadius='6px' width='fit-content'>
        <DatePicker 
        value={dayjs(dates.insuranceDate)}
        onChange={(e, stringDate) => {
          setChange(true)
          setDates({...dates, insuranceDate: stringDate})
        }}/>
      </PrimaryBorder>
      

      <div className="row" style={{marginTop: '15px'}}>
        <label htmlFor="" style={{margin: '0 40px 0 0'}}>Document Type</label>
        <Switch
        value={documentType}
          onChange={(e) => {
            setChange(true)
            setDocumentType(e)
          }}
        />

        <h4 style={{marginLeft: '15px'}}>{documentType?'DETAILED': 'SUMMARY'}</h4>
      </div>

      <div className="row">
        <div className="column">
          <label htmlFor="">Staring Date</label>
          <PrimaryBorder borderRadius='6px' width='fit-content'>
          <DatePicker 
          value={dayjs(dates.rangeStart)}
          onChange={(e, stringDate) => {
            setChange(true)
            setDates({...dates, rangeStart: stringDate})
        }}/>
          </PrimaryBorder>
        </div>

        <div className="column" style={{marginLeft: '30px'}}>
          <label htmlFor="">Ending Date</label>
          <PrimaryBorder borderRadius='6px' width='fit-content'>
          <DatePicker 
          value={dayjs(dates.rangeEnd)}
          onChange={(e, stringDate) => {
            setChange(true)
            setDates({...dates, rangeEnd: stringDate})
        }}/>
          </PrimaryBorder>
        </div>
      </div>

      <div className="column">
          <div className="row">
            <PrimaryBorder borderRadius='10px'>
              <button onClick={updateCashflow} disabled={!formChange}>UPDATE</button>
            </PrimaryBorder>

            <PrimaryBorder borderRadius='10px' margin='0 0 0 10px'>
              <button style={{backgroundColor: 'red'}} onClick={cashflowReportDiscard}>DISCARD</button>
            </PrimaryBorder>
          </div>

          <div className="row" style={{marginTop: '10px'}}>
            <PrimaryBorder borderRadius='10px'>
                {
                  cashflow.getStatus() === 'PUBLISHED'
                  ? <button onClick={() => changeCashflowState('DRAFT')} disabled={formChange}>UNPUBLISHED</button>
                  : <button onClick={() => changeCashflowState('PUBLISHED')} disabled={formChange}>PUBLISH</button>
                }
            </PrimaryBorder>

            <PrimaryBorder borderRadius='10px' margin='0 0 0 10px'>
              <button style={{padding: '2px 5px'}}><img src={PDFicon} alt="" width='25' 
              onClick={() => {
                props.pdfDownloadRef.current.downloadPDF()
              }}
              /></button>
            </PrimaryBorder>


            {(activeUser.getPosition() === 'Chair' || activeUser.getPosition() === 'Treasurer') &&
              
              <PrimaryBorder borderRadius='10px' margin='0 0 0 10px'>
              {/* Only Chair & Treasurer is able to add signature */}
               
                        <button onClick={() => {
                            setChange(true) // Enable save button
                            //Check whether the signature already exists
                            if(!cashflow.getSignatureArray().includes(activeUser.getUserSignature())) {
                                // Add user signature to the estimate document
                                cashflow.setSignatureArray([...cashflow.getSignatureArray(), activeUser.getUserSignature()])
                            setCashflow(new CashflowReportModel(cashflow.extractJSON()))
                            } else {
                                // Remove the signature from the document
                                let tempSignatureArray = cashflow.getSignatureArray()
                                const index = tempSignatureArray.indexOf(activeUser.getUserSignature())
                                tempSignatureArray.splice(index, 1) // Removing signature from the temp array
                                cashflow.setSignatureArray(tempSignatureArray)
                                setCashflow(new CashflowReportModel(cashflow.extractJSON())) 
                            }
                        }}>SIGNATURE</button>
            </PrimaryBorder>}


          </div>
      </div>

      
        
    </div>
  )
}
