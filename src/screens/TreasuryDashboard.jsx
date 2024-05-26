import React from 'react'
import {useLocation} from 'react-router-dom'

import '../styles/treasury-dashboard.css'


export default function TreasuryDashboard() {
    const location = useLocation()
    console.log('Use location', location)

  return (
    <div className='container'>

    </div>
  )
}
