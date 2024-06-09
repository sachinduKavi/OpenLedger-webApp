import React, {useState} from 'react'
import {motion} from 'framer-motion'
import MiniNavigation from '../../components/MiniNavigation'
import TreasuryDetails from '../../components/Treaasury/TreasuryDetails'

import '../../styles/treasury-over-view.css'

export default function TreasuryOverview(props) {
  // Navigation variables use states
    const [navigation, setNavigation] = useState({
      details: true,
      participants: false,
      share: false
    })

    const resetNavigation = () => {
      setNavigation({
        details: false,
        participants: false,
        share: false
      })
    }

    

  return (
    <motion.div className='panel-outside-border'
      initial={{x: 1500}}
      animate={{x: 0, transition: {duration: 0.3, delay: 0.2}}}
      exit={{y: 1000, transition: {delay: 0.1}}}
    >

      {/* Mini Navigation bar */}
      <MiniNavigation>
          <li className={navigation.details && 'active'} onClick={() => {
            resetNavigation()
            setNavigation({details: true})
          }}>Details</li>
          <li className={navigation.participants && 'active'} onClick={() => {
            resetNavigation()
            setNavigation({participants: true})
          }}>Participants</li>
          <li className={navigation.share && 'active'} onClick={() => {
            resetNavigation()
            setNavigation({share: true})
          }}>Share</li>
     
      </MiniNavigation>

      {/* Mini Screen display that changes with the mini navigation bar */}
      <div className="mini-screen">
        {navigation.details && <TreasuryDetails activeUser={props.activeUser} treasury={props.treasury}/>}
      </div>
      


    </motion.div>
  )
}
