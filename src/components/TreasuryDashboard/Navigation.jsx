import React, {useState} from 'react'
import '../../styles/tdashboard-navigation.css'
import Plate from '../Plate'
import PrimaryBorder from '../PrimaryBorder'
import {motion} from 'framer-motion'

import announcementImage from '../../assets/icons/dashboard-icons/announcement.png'
import announcementImageDark from '../../assets/icons/dashboard-icons/announcement-dark.png'

import dashboardImage from '../../assets/icons/dashboard-icons/dashboard.png'
import dashboardImageDark from '../../assets/icons/dashboard-icons/dashboard-dark.png'

import cashImage from '../../assets/icons/dashboard-icons/cash.png'
import cashImageDark from '../../assets/icons/dashboard-icons/cash-dark.png'

import complaintImage from '../../assets/icons/dashboard-icons/complaint.png'
import complaintImageDark from '../../assets/icons/dashboard-icons/complaint-dark.png'

import graphImage from '../../assets/icons/dashboard-icons/graph.png'
import graphImageDark from '../../assets/icons/dashboard-icons/graph-dark.png'

import messageImage from '../../assets/icons/dashboard-icons/message.png'
import messageImageDark from '../../assets/icons/dashboard-icons/message-dark.png'

import treasuryImage from '../../assets/icons/dashboard-icons/treasury.png'
import treasuryImageDark from '../../assets/icons/dashboard-icons/treasury-dark.png'
import undoImage from '../../assets/icons/dashboard-icons/undo.png'

export default function Navigation() {
    const [panelSwitch, setPanelSwitch] = useState({
        dashboard: true,
        announcement: false,
        treasury: false,
        transaction: false,
        ledgerChat: false,
        complaints: false,
        reports: false
    })

    const resetPanel = () => {
        // Reset all the panels to false
        setPanelSwitch({dashboard: false, announcement: false, treasury: false, transaction: false, ledgerChat: false, complaints: false, reports: false}) 
    }

    // Change the active panel
    const navigation = async (panelName) => {
        resetPanel()
        switch(panelName) {
            case 'dashboard':
                setPanelSwitch({dashboard: true})
                break
            case 'announcement':
                setPanelSwitch({announcement: true})
                break
            case 'treasury':
                setPanelSwitch({treasury: true})
                break
            case 'transaction':
                setPanelSwitch({transaction: true})
                break
            case 'complaint':
                setPanelSwitch({complaints: true})
                break
            case 'report':
                setPanelSwitch({reports: true})
                break
            case 'message':
                setPanelSwitch({ledgerChat: true})
                break
        }
    }


  return (  
    <div className="navigation">
        {/* Creating back to user dashboard button */}
        <motion.div style={{marginBottom: '30px', cursor: 'pointer'}}
                initial={{x: -1000}}
                animate={{x: 0}}
                whileHover={{scale: 0.9, x: -12}}
            >
            <PrimaryBorder borderRadius='0 25px 25px 0'>
                <motion.div className="back-button"
                    whileHover={{width: 100}}
                
                >
                    <img src={undoImage} alt="back icon" width='30' height='30'/>
                </motion.div>
            </PrimaryBorder>
        </motion.div>
        

        <Plate name='Dashboard' imageName={{light: dashboardImage, dark: dashboardImageDark}} active={panelSwitch.dashboard} onClick={() =>navigation('dashboard')} keyValue={1}/>
        <Plate name='Announcement' imageName={{light: announcementImage, dark: announcementImageDark}} active={panelSwitch.announcement} onClick={() =>navigation('announcement')} keyValue={2}/>
        <Plate name='Treasury' imageName={{light: treasuryImage, dark: treasuryImageDark}} active={panelSwitch.treasury} onClick={() =>navigation('treasury')} keyValue={3}/>
        <Plate name='Transaction' imageName={{light: cashImage, dark: cashImageDark}} active={panelSwitch.transaction} onClick={() =>navigation('transaction')} keyValue={4}/>
        <Plate name='LedgerChat' imageName={{light: messageImage, dark: messageImageDark}} active={panelSwitch.ledgerChat} onClick={() =>navigation('message')} keyValue={5}/>
        <Plate name='Complaints' imageName={{light: complaintImage, dark: complaintImageDark}} active={panelSwitch.complaints} onClick={() =>navigation('complaint')} keyValue={6}/>
        <Plate name='Reports' imageName={{light: graphImage, dark: graphImageDark}} active={panelSwitch.reports} onClick={() =>navigation('report')} keyValue={7}/>

        
    </div>
  )
}
