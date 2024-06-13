import React, {useEffect, useState} from 'react'

import SingleParticipant from './SingleParticipant'

import '../../styles/participants.css'

export default function Participants(props) {
  const treasury = props.treasury
  // Participant array load from the database and update the UI
  const [participantArray, setParticipantsArray] = useState([])


  const loadParticipants = async () => {
    await treasury.loadTreasuryParticipant()
  }

  useEffect(() => {
    loadParticipants()
  }, [])

  return (
    <div className='inner-screen-border'>
        <div className="participant-free-space">

            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
            <SingleParticipant/>
        </div>
    </div>
  )
}
