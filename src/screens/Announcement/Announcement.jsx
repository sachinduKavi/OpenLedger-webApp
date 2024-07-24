import React from 'react'
import {motion} from 'framer-motion'
import CreateNewAnnouncement from './CreateNewAnnouncement'


import '../../styles/announcement.css'

import AnnouncementSingle from './AnnouncementSingle'



export default function Announcement() {
  return (
    <motion.div className='panel-outside-border'
      initial={{x: 1500}}
      animate={{x: 0, transition: {duration: 0.3, delay: 0.2}}}
      exit={{y: 1000, transition: {delay: 0.1}}}
    >

      <div className="announcement-border">


        <div className="ans-column">
          <h2 className='ans-title'>ANNOUNCEMENTS</h2>

         
            <AnnouncementSingle/>

            <AnnouncementSingle/>
            <AnnouncementSingle/>
            <AnnouncementSingle/>
            <AnnouncementSingle/>
            <AnnouncementSingle/>
            <AnnouncementSingle/>
            <AnnouncementSingle/>
            <AnnouncementSingle/>
            <AnnouncementSingle/>
            <AnnouncementSingle/>
        
          

        </div>


        <div className="ans-column">

            <CreateNewAnnouncement/>
          
        </div>

      </div>



    </motion.div>
  )
}
