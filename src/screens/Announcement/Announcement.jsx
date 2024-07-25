import React, {useState} from 'react'
import {motion} from 'framer-motion'
import CreateNewAnnouncement from './CreateNewAnnouncement'
import AnnouncementModel from '../../dataModels/AnnouncementModel'


import '../../styles/announcement.css'

import AnnouncementSingle from './AnnouncementSingle'
import PrimaryBorder from '../../components/PrimaryBorder'



export default function Announcement() {

  const [newFormState, setFormState] = useState(false)

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
            <PrimaryBorder borderRadius='10px' width='fit-content' margin='5px'>
              <button onClick={() => setFormState(true)}>New Announcement</button>
            </PrimaryBorder>

          {
            newFormState &&
            <CreateNewAnnouncement setFormState={setFormState}/>
          }
        </div>

      </div>



    </motion.div>
  )
}
