import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import CreateNewAnnouncement from './CreateNewAnnouncement'
import AnnouncementModel from '../../dataModels/AnnouncementModel'
import Poll from './Poll'


import '../../styles/announcement.css'

import AnnouncementSingle from './AnnouncementSingle'
import PrimaryBorder from '../../components/PrimaryBorder'
import CreatePoll from './CreatePoll'
import Vote from '../../dataModels/Vote'
import { delay } from '../../middleware/auth'



export default function Announcement(props) {
  const activeUser = props.activeUser

  const [newFormState, setFormState] = useState(false)
  const [newVoteState, setNewVoteState] = useState(false)

  const [pollRefresh, setPollRefresh] = useState(false)
  const [announcementList, setAnnouncementList] = useState([]) // Announcement list display here
  const [voteList, setVoteList] = useState([]) // Vote list 

  // Loading all announcements published 
  const loadAnnouncements = async () => {
    setAnnouncementList(await AnnouncementModel.fetchAllAnnouncements())
  }

  // Load all the published votes 
  const loadVotes = async () => {
      const response = await Vote.loadVotes()
      setVoteList([])
      await delay(50)
      setVoteList(response)
  }



  // Update variable for announcement list
  const [announcementUpdate, setUpdate] = useState(false)


  // Component did mount ?
  useEffect(() => {
    loadAnnouncements()
  }, [announcementUpdate])

  useEffect(() => {
    console.log('poll refresh console ')
    loadVotes()
  }, [pollRefresh])

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
                <button onClick={() => {
                  setFormState(true)
                  setNewVoteState(false)
                }}>New Announcement</button>
              </PrimaryBorder>

              <PrimaryBorder borderRadius='10px' width='fit-content' margin='5px'>
                <button onClick={() => {
                  setFormState(false)
                  setNewVoteState(true)
                }}>New Vote</button>
              </PrimaryBorder>
            </div>
            

          {
            newFormState &&
            <CreateNewAnnouncement setFormState={setFormState} annUpdate={{announcementUpdate: announcementUpdate, setUpdate: setUpdate}}/>
          }

          {
            newVoteState && <CreatePoll setPollRefresh={setPollRefresh}/>
          }



          {
            voteList.map((element, index) => {
              return (<Poll pollElement={element} key={index} activeUser={props.activeUser} pollRefresh={pollRefresh}  setPollRefresh={setPollRefresh}/>)
            })
          }

          

        </div>

      </div>



    </motion.div>
  )
}
