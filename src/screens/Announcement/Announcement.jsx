import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import CreateNewAnnouncement from './CreateNewAnnouncement'
import AnnouncementModel from '../../dataModels/AnnouncementModel'


import '../../styles/announcement.css'

import AnnouncementSingle from './AnnouncementSingle'
import PrimaryBorder from '../../components/PrimaryBorder'
import CreatePoll from './CreatePoll'



export default function Announcement(props) {
  const activeUser = props.activeUser

  const [newFormState, setFormState] = useState(false)
  const [announcementList, setAnnouncementList] = useState([]) // Announcement list display here

  // Loading all announcements published 
  const loadAnnouncements = async () => {
    setAnnouncementList(await AnnouncementModel.fetchAllAnnouncements())
  }

  // Update variable for announcement list
  const [announcementUpdate, setUpdate] = useState(false)


  // Component did mount ?
  useEffect(() => {
    loadAnnouncements()
  }, [announcementUpdate])

  return (
    <motion.div className='panel-outside-border'
      initial={{x: 1500}}
      animate={{x: 0, transition: {duration: 0.3, delay: 0.2}}}
      exit={{y: 1000, transition: {delay: 0.1}}}
    >

      <div className="announcement-border">


        <div className="ans-column">
          <h1 className='ans-title'>ANNOUNCEMENTS</h1>

         
            
            {/* Loading all the announcements */}
            {
              announcementList.map((element, index) => {
                return (<AnnouncementSingle key={index} announcement={element} activeUser={activeUser} update={{announcementUpdate:announcementUpdate, setUpdate:setUpdate}}/>)
              })
            }
        
            

        </div>


        <div className="ans-column">
            <div className="row">
              <PrimaryBorder borderRadius='10px' width='fit-content' margin='5px'>
                <button onClick={() => setFormState(true)}>New Announcement</button>
              </PrimaryBorder>

              <PrimaryBorder borderRadius='10px' width='fit-content' margin='5px'>
                <button onClick={() => {
                  setFormState(false)

                }}>New Vote</button>
              </PrimaryBorder>
            </div>
            

          {
            newFormState &&
            <CreateNewAnnouncement setFormState={setFormState} annUpdate={{announcementUpdate: announcementUpdate, setUpdate: setUpdate}}/>
          }

          <CreatePoll/>

        </div>

      </div>



    </motion.div>
  )
}
