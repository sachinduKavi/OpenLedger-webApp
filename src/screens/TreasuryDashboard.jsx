import React, { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Treasury from '../dataModels/Treasury'
import '../styles/treasury-dashboard.css'
import { verifyTreasury } from '../query/treasuryQuery'
import WelcomeBar from '../components/Dashboard/WelcomeBar'
import Navigation from '../components/TreasuryDashboard/Navigation'


export default function TreasuryDashboard(){
  // Get user details from the local storage
  const userDetails = JSON.parse(localStorage.getItem('userDetails')) // User details
  const navigate = useNavigate()

  // validate whether user belongs to the treasury group
  // If validate success back end create new treasury token
  const validateTreasury = async (treasury) => {
    const response = await verifyTreasury(treasury.getTreasuryID())
    console.log(response)
    if(response.data.process) {
      // Treasury is validated
      const treasuryRole = response.data.user_role // Role in the treasury
    } else {
      // Treasury login is unauthorized
      navigate('/dashboard') // Navigate back to the dashboard
    }
  }

  // Component did mount ?
  useEffect(() => {
    // Extracting the object from the local storage
    const treasury = new Treasury(JSON.parse(localStorage.getItem('treasury_obj'))) // Creating new class object using local storage data
    console.log('treasury obj', treasury.getTreasuryID())
    // changeUserDetails(userDetail)
    validateTreasury(treasury)
  }, [])


  
  return (  
    <div className='container'>
      <WelcomeBar userName={userDetails?.user_name} imageLink={userDetails?.dp_link} imageScale={userDetails?.picture_scale}/>

      <div className="body-content">

        <Navigation/>

      </div>
    </div>
  )
}
