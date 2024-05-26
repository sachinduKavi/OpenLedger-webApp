import React, {useContext} from 'react'
import {useLocation} from 'react-router-dom'

import { SessionContext } from '../Session'
import '../styles/treasury-dashboard.css'


export default function TreasuryDashboard() {
  const {sessionData, changeSessionData} = useContext(SessionContext)
  const treasury = sessionData.treasury
  return (
    <div className='container'>

    </div>
  )
}
