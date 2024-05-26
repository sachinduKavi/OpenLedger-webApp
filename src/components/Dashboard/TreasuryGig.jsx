import React, {useEffect, useState} from 'react'
import PrimaryBorder from '../PrimaryBorder'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'

import Treasury from '../../screens/TreasuryDashboard'

import '../../styles/treasury-gig.css'

import NotificationIcon from '../../assets/icons/notification.png'
import { contains } from '@cloudinary/url-gen/backwards/utils/legacyBaseUtil'

export default function TreasuryGig(props) {
    const navigate = useNavigate() // Navigate object 
    const [parentWidth, setParentWidth] = useState(1000)

    // Component did mount
    useEffect(() => {
      console.log('Key', props.keyValue)
        setParentWidth(document.querySelector('.gigs-container').offsetWidth)
    }, [])

    // Open the relevant treasury group
    const openTreasury = () => {
      console.log('Open treasury', props.treasuryDetails)
      navigate('/treasury', { data: props.treasuryDetails })
    }

  return (
    <motion.div className="margin" style={{marginBottom:'20px'}}
      initial={{scale: 0}}
      animate={{scale: 1}}
      transition={{duration: 0.3, delay:props.keyValue*0.14}}
    >
      <PrimaryBorder borderRadius='10px'>
        <div className='gig-border' style={{width: (parentWidth/2 -70).toString() + 'px', background: `url(${props.treasuryDetails.getCoverImageID()??'../assets/images/stockAdobe.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center'}} onClick={openTreasury}>
          <div className="background-blur"></div>

          <div className="gig-content">
            {/* Gigs topic */}
            <div className="td">
              <h2 className="topic">
                {props.treasuryDetails.getTreasuryName()}
              </h2>
              {/* Treasury ID */}
              <h3>{props.treasuryDetails.getTreasuryID()}</h3>
            </div>
            

            {/* Balance  */}
            <div className="balance">
              <h4>Balance : LKR {props.treasuryDetails.getBalance()}</h4>

              {/* Notification count */}
              <div className="notification">
                <img src={NotificationIcon} alt="notification"  width='30px' height='30px'/>
                <h2>150</h2>
              </div>
            </div>
          </div>
        </div>
      </PrimaryBorder>
    </motion.div>
    
    
    
  )
}
