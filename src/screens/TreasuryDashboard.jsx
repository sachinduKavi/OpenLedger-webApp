import React, { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Treasury from '../dataModels/Treasury'
import '../styles/treasury-dashboard.css'
import { verifyTreasury } from '../query/treasuryQuery'
import WelcomeBar from '../components/Dashboard/WelcomeBar'
import Navigation from '../components/TreasuryDashboard/Navigation'
import Dashboard from './DashboardT/Dashboard'
import User from '../dataModels/User'
import {AnimatePresence} from 'framer-motion'
import Process from '../components/process'
import Treasurer from '../dataModels/Treasurer'
import Member from '../dataModels/Member'
import TreasuryOverview from './DashboardT/TreasuryOverview'


export default function TreasuryDashboard(){
  // Extracting the object from the local storage
  const [treasury, setTreasury] = useState(new Treasury(JSON.parse(localStorage.getItem('treasury_obj')))) // Creating new class object using local storage data
  // Get user details from the local storage
  const userDetails = JSON.parse(localStorage.getItem('userDetails')) // User details
  const [activeUser, setUser] = useState(null) // For user object with their user level
  const [isProcessing, toggleProcessing] = useState(true)

  const [panelSwitch, setPanelSwitch] = useState({
    dashboard: true,
    announcement: false,
    treasury: false,
    transaction: false,
    ledgerChat: false,
    complaints: false,
    reports: false
  })

  const navigate = useNavigate()

  // validate whether user belongs to the treasury group
  // If validate success back end create new treasury token
  const validateTreasury = async (treasury) => {
    const response = await verifyTreasury(treasury.getTreasuryID())
    console.log(response)
    if(response.data.process) {
      // Treasury is validated
      const treasuryRole = response.data.user_role // Role in the treasury
      treasury.setUserRole(treasuryRole) // Update user role
      console.log(treasuryRole)
      // Creating member, treasurer, co-treasurer, chair instant
      if(treasuryRole === 'Treasurer') {
        // User role is treasurer
        setUser(new Treasurer(userDetails)) // Creating treasurer instant 
        
      } else if (treasuryRole === 'CoTreasurer') {
        // User role is co treasurer

      } else if (treasuryRole === 'Chair') {
        // User role is Chair
      } else if (treasuryRole === 'Member') {
        // User role is Member
      } else {
        // Undefined user role
      }

    } else {
      // Treasury login is unauthorized
      navigate('/dashboard') // Navigate back to the dashboard
    }
    toggleProcessing(false)
  }

  // Refresh treasury data 
  // Dead function ...
  // const treasuryRefresh = async () => {
  //   console.log('treasury refresh')
  //   await treasury.refreshTreasuryDetails()

  //   setTreasury(new Treasury(treasury.extractJSON()))

  //   console.log('treasury details in refresh', treasury)
  // }

  // Component did mount ?
  useEffect(() => {
    console.log('treasury obj', treasury.getTreasuryID())
    // Check user and treasury validation in the beginning 
    validateTreasury(treasury)
  }, [treasury])


  
  return (  
    <div className='container'>
      <WelcomeBar userName={userDetails?.userName} imageLink={userDetails?.dpLink} imageScale={userDetails?.pictureScale}/>

      <div className="body-content">
        {/* Navigation bar */}
        <Navigation switch={[panelSwitch, setPanelSwitch]}/>

        {/* Changing screen with responsive for the navigation bar */}
        <div className="screen">
          <AnimatePresence>
            {/* Dashboard */}
            {panelSwitch.dashboard 
            && !isProcessing 
            && <Dashboard treasuryObj={treasury} userObj={activeUser}/>}

            {/* Treasury */}
            {panelSwitch.treasury && <TreasuryOverview/>}

          </AnimatePresence>
          
        </div>


      </div>
      {isProcessing && <Process/>}
    </div>
  )
}
