import React, {useState, useRef} from 'react'
import '../../styles/estimate.css'

import ReportPaper from './ReportPaper'
import EstimateEditor from './EstimateEditor'
import EstimateReport from '../../dataModels/EstimateModel'
import ReportPreview from './ReportPreview'

export default function Estimate(props) {
    const reportDocumentRef = useRef()
    const [estimateValues, setEstimateValues] = useState(null)


  return (
    <div className='inner-screen-border'>
        <div className="row">
            <div className="column">

              {
                (estimateValues !== null)
                ? <ReportPaper estimate={{estimateValues: estimateValues, setEstimateValues: setEstimateValues}} treasury={props.treasury} ref={reportDocumentRef}/>
                : <div className="placeholder">
                    <h5>Select a report to preview or create new report</h5>
                  </div>
              }
                

            </div>

            <div className="column" style={{justifyContent: 'start'}}>

                {(estimateValues === null || props.activeUser.getUserLevel() < 2)

                ? <ReportPreview setEstimateValues={setEstimateValues} activeUser={props.activeUser}/>
           
                : <EstimateEditor estimate={{estimateValues: estimateValues, setEstimateValues: setEstimateValues}} treasury={props.treasury}
                  activeUser={props.activeUser}
                  pdfDownloadReference={reportDocumentRef}
                />  }
  
              
            </div>
        </div>
    </div>
  )
}
