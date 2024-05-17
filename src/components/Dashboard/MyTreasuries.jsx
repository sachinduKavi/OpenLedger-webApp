import React, {useState, useEffect} from 'react'

import {getAllTreasuryParticipantData} from '../../query/treasuryQuery'

import '../../styles/my-treasuries.css'
import TreasuryGig from './TreasuryGig'



export default function MyTreasuries(props) {

  // Component did mount ?
  useEffect(() => {

    // await getAllTreasuryParticipantData()
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
