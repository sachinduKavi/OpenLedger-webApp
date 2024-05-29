import React, {useEffect, useState, useContext} from 'react'
import PrimaryBorder from '../PrimaryBorder'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'

import TreasuryDashboard from '../../screens/TreasuryDashboard'
import '../../styles/treasury-gig.css'

import NotificationIcon from '../../assets/icons/notification.png'
import { SessionContext } from '../../Session'
import { contains } from '@cloudinary/url-gen/backwards/utils/legacyBaseUtil'

export default function TreasuryGig(props) {
    const navigate = useNavigate() // Navigate instant 
    const [parentWidth, setParentWidth] = useState(1000)
    const {sessionData, changeSessionData} = useContext(SessionContext) // Fetch global variables

    // Component did mount
    useEffect(() => {
      setParentWidth(document.querySelector('.gigs-container').offsetWidth)
    }, [])

    // Open the relevant treasury group
    const openTreasury = () => {
      console.log('Open treasury', props.treasuryDetails.getTreasuryID())
      changeSessionData({treasury: props.treasuryDetails}) // Update session data
      // Saving treasury instant on local storage
      localStorage.setItem('treasury_obj', JSON.stringify(props.treasuryDetails.extractJSON()))

      navigate('/treasury')
    }

  return (
    <motion.div className="margin" style={{marginBottom:'20px'}}
      initial={{scale: 0}}
      animate={{scale: 1}}
      whileHover={{scale: 0.98, transition: {duration: 0.1}}}
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
