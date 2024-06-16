import React, {useState} from 'react'
import '../../styles/estimate.css'

import ReportPaper from './ReportPaper'
import EstimateEditor from './EstimateEditor'

export default function Estimate() {
    const [estimateValues, setEstimateValues] = useState(null)


  return (
    <div className='inner-screen-border'>
        <div className="row">
            <div className="column">

              <ReportPaper/>
                

            </div>

            <div className="editor-column column">
              <EstimateEditor/>
            </div>
        </div>
    </div>
  )
}
