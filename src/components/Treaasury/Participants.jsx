import React, {useEffect, useState} from 'react'

import SingleParticipant from './SingleParticipant'

import '../../styles/participants.css'

export default function Participants(props) {
  const treasury = props.treasury.treasury
  // Participant array load from the database and update the UI
  const [participantArray, setParticipantsArray] = useState([])


  const loadParticipants = async () => {
    const tempArray = await treasury.loadTreasuryParticipant()
    setParticipantsArray(tempArray)
  }

  useEffect(() => {
    loadParticipants()
  }, [])

  return (
    <div className='inner-screen-border'>
        <div className="participant-free-space">

            {
              participantArray.map((element, index) => {
                console.log(element)
                return (<SingleParticipant user={element} key={index} indexNumber={index}/>)
              })
            }
        </div>
    </div>
  )
}
