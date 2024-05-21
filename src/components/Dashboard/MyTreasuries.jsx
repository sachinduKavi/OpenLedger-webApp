import React, {useState, useEffect} from 'react'

import {getAllTreasuryParticipantData} from '../../query/treasuryQuery'

import '../../styles/my-treasuries.css'
import TreasuryGig from './TreasuryGig'



export default function MyTreasuries(props) {
  
  const loadTreasuries = async () => {
    const response = await getAllTreasuryParticipantData(props.userID)
    console.log('Treasury participant response', response)
  }

  // Component did mount ?
  useEffect(() => {
    // Loading treasury data
    loadTreasuries()
  })

  return (
    <div className='gigs-container'>
      <TreasuryGig/>
      <TreasuryGig/>
      <TreasuryGig/>
      <TreasuryGig/>
      <TreasuryGig/>
      <TreasuryGig/>
      <TreasuryGig/>
      <TreasuryGig/>
      <TreasuryGig/>
    </div>
  )
}
