import React, {useState, useEffect} from 'react'

import '../../styles/my-treasuries.css'
import TreasuryGig from './TreasuryGig'



export default function MyTreasuries() {

  // Component did mount ?
  useEffect(() => {
    
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
