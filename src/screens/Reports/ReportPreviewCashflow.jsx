import React, {useEffect, useState} from 'react'

import { getAllCashflow } from '../../query/reportQuery'

import '../../styles/report-preview.css'
import ReportBannerCashflow from '../../components/Report/ReportBannerCashflow'
import CashflowReportModel from '../../dataModels/CashflowReportModel'


export default function ReportPreviewCashflow(props) {
  const [cashflowArray, setCashflowArray] = useState([]) // Stores the estimate list

  // Load all the estimation reports publish on the database
  const loadReports = async () => {
    const response = await getAllCashflow()
    if(response.status === 200) {
      // No connection error

      if(response.data.proceed) {
        // Processed executed successfully
        setCashflowArray(response.data.content) // Setting cashflow list
      } else {
        // Backend process error
      }
    } else {
      // Network error
    }
  } 

  // Component did mount ?
  useEffect(() => {
    loadReports()
  }, [])


  return (
    <div className='report-preview-border'>
        <div className="row">
            <h2>CASHFLOW REPORT PREVIEW</h2>

            <button style={{backgroundColor: '#32AF4E', 
              visibility: props.activeUser.getUserLevel() > 1 
              && props.activeUser.getPosition() !== 'Chair' ? 'visible': 'hidden'}}
              onClick={() => {
                props.setCashflow(new CashflowReportModel({}))
              }}
              >NEW</button>

        </div>

        <div className="content">
          
          {
            cashflowArray.map((element, index) => {
              if(props.activeUser.getUserLevel() > 1 || element.status === 'PUBLISHED')
                return(<ReportBannerCashflow key={index} cashflow={element} setCashflow={props.setCashflow}/>)
            })
          }
        </div>

    </div>
  )
}
