import React, {useState, useRef} from 'react'
import '../../styles/estimate.css'

import ReportPaper from './ReportPaper'
import EstimateEditor from './EstimateEditor'
import EstimateReport from '../../dataModels/EstimateModel'
import ReportPreview from './ReportPreview'

export default function Estimate(props) {
    const reportDocumentRef = useRef()
    const [estimateValues, setEstimateValues] = useState(new EstimateReport({}))


  return (
    <div className='inner-screen-border'>
        <div className="row">
            <div className="column">

              <ReportPaper estimate={{estimateValues: estimateValues, setEstimateValues: setEstimateValues}} treasury={props.treasury} ref={reportDocumentRef}/>
                

            </div>

            <div className="column" style={{justifyContent: 'start'}}>

                <ReportPreview/>
           
                {/* <EstimateEditor estimate={{estimateValues: estimateValues, setEstimateValues: setEstimateValues}} treasury={props.treasury}
                  activeUser={props.activeUser}
                  pdfDownloadReference={reportDocumentRef}
                />  */}
  
              
            </div>
        </div>
    </div>
  )
}
