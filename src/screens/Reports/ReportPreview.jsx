import React, {useEffect, useState} from 'react'

import '../../styles/report-preview.css'
import ReportBanner from '../../components/Report/ReportBanner'
import EstimateReport from '../../dataModels/EstimateModel'

export default function ReportPreview(props) {
  const [estimateArray, setEstimateArray] = useState([]) // Stores the estimate list

  // Load all the estimation reports publish on the database
  const loadReports = async () => {
    const res = await EstimateReport.fetchAllEstimations()
    if(res.process) {
      // No backend errors
      setEstimateArray(res.estimateArray)
    } else {
      // Backend errors ocurred 
      // ** display error message
    }
  } 

  // Component did mount ?
  useEffect(() => {
    loadReports()
  }, [])


  return (
    <div className='report-preview-border'>
        <div className="row">
            <h2>REPORT PREVIEW</h2>

            <button style={{backgroundColor: '#32AF4E'}}>NEW</button>

        </div>

        <div className="content">
          
          {
            estimateArray.map((element, index) => {
              return(<ReportBanner key={index} estimate={element} setEstimateValues={props.setEstimateValues}/>)
            })
          }
        </div>

    </div>
  )
}
