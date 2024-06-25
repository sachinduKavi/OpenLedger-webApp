import React, {useEffect, useState} from 'react'

import '../../styles/report-preview.css'
import ReportBanner from '../../components/Report/ReportBanner'
import EstimateReport from '../../dataModels/EstimateModel'

export default function ReportPreviewCashflow(props) {
  const [cashflowArray, setCashflowArray] = useState([]) // Stores the estimate list

  // Load all the estimation reports publish on the database
  const loadReports = async () => {
    
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
                props.setCashflowArray(new EstimateReport({}))
              }}
              >NEW</button>

        </div>

        <div className="content">
          
          {
            cashflowArray.map((element, index) => {
              return(<ReportBanner key={index} estimate={element} setEstimateValues={props.setEstimateValues} activeUser={props.activeUser}/>)
            })
          }
        </div>

    </div>
  )
}
