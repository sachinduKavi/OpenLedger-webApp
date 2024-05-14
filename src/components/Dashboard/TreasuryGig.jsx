import React, {useEffect, useState} from 'react'
import PrimaryBorder from '../PrimaryBorder'

import '../../styles/treasury-gig.css'

import NotificationIcon from '../../assets/icons/notification.png'

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
            <div className="td">
              <h2 className="topic">
                AIESEC Uva Wellassa University 
              </h2>

              <h3>TR00000000005</h3>
            </div>
            

            {/* Balance  */}
            <div className="balance">
              <h2>Balance : Rs. 45, 045</h2>

              <div className="notification">
                <img src={NotificationIcon} alt="notification"  width='30px' height='30px'/>
                <h2>150</h2>
              </div>
            </div>
          </div>
        </div>
      </PrimaryBorder>
    </div>
    
    
    
  )
}
