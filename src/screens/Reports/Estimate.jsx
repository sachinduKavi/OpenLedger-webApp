import React, {useState} from 'react'
import '../../styles/estimate.css'

import ReportPaper from './ReportPaper'
import EstimateEditor from './EstimateEditor'
import EstimateReport from '../../dataModels/EstimateModel'

export default function Estimate(props) {

    const [estimateValues, setEstimateValues] = useState(new EstimateReport({}))


  return (
    <div className='inner-screen-border'>
        <div className="row">
            <div className="column">

              <ReportPaper estimate={{estimateValues: estimateValues, setEstimateValues: setEstimateValues}} treasury={props.treasury}/>
                

            </div>

            <div className="column" style={{justifyContent: 'start'}}>
           
                <EstimateEditor estimate={{estimateValues: estimateValues, setEstimateValues: setEstimateValues}} treasury={props.treasury}/>
  
              
            </div>
        </div>
    </div>
  )
}
