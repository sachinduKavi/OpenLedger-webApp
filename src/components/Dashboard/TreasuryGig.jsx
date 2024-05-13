import React, {useEffect, useState} from 'react'
import PrimaryBorder from '../PrimaryBorder'

import '../../styles/treasury-gig.css'

export default function TreasuryGig() {
    const [parentWidth, setParentWidth] = useState(1000)

    // Component did mount
    useEffect(() => {
        console.log('Component did mount...')
        setParentWidth(document.querySelector('.gigs-container').offsetWidth)
        console.log('parent Width ', parentWidth)
    }, [])

  return (
    <div className="margin" style={{marginBottom:'20px'}}>
      <PrimaryBorder borderRadius='10px'>
        <div className='gig-border' style={{width: (parentWidth/2 -70).toString() + 'px'}}>
          <div className="background-blur"></div>

          <div className="gig-content">
            {/* Gigs topic */}
            <h2 className="topic">
              AIESEC Uva Wellassa University 
            </h2>

            {/* Balance  */}
            <div className="balance">
              <h2>Balance : Rs. 45, 045</h2>
            </div>
          </div>
        </div>
      </PrimaryBorder>
    </div>
    
    
    
  )
}
