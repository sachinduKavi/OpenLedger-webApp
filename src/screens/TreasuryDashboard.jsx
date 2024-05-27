import React, {useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import Treasury from '../dataModels/Treasury'
import { SessionContext } from '../Session'
import '../styles/treasury-dashboard.css'
import { verifyTreasury } from '../query/treasuryQuery'


export default function TreasuryDashboard(){
  // validate whether user belongs to the treasury group
  // If validate success back end create new treasury token
  const validateTreasury = async (treasury) => {
    const response = await verifyTreasury(treasury.getTreasuryID())
    console.log(response)
  }

  // Component did mount ?
  useEffect(() => {
    // Extracting the object from the local storage
    const extractData = JSON.parse(localStorage.getItem('treasury_obj'))
    const treasury = new Treasury(extractData) // Creating new class object using local storage data
    console.log('treasury obj', treasury.getTreasuryID())

    validateTreasury(treasury)
  }, [])

  return (
    <div className='container'>

    </div>
  )
}
