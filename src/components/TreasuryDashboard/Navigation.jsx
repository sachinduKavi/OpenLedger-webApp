import React from 'react'
import '../../styles/tdashboard-navigation.css'
import Plate from '../Plate'

export default function Navigation() {
  return (
    <div className="navigation">

        <Plate name='Dashboard' imageName='dashboard'/>
        <Plate name='Announcement' imageName='announcement'/>
        <Plate name='Treasury' imageName='treasury'/>
        <Plate name='Transaction' imageName='cash'/>
        <Plate name='LedgerChat' imageName='message'/>
        <Plate name='Complaints' imageName='complaint'/>
        <Plate name='Reports' imageName='graph'/>
        
    </div>
  )
}
