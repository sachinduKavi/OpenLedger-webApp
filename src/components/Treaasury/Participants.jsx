import React, {useEffect, useState} from 'react'

import SingleParticipant from './SingleParticipant'
import {Button} from 'antd'
import RequestParticipant from './RequestParticipant'
import {CheckCircleOutlined, CloseOutlined} from '@ant-design/icons'

import '../../styles/participants.css'
import { acceptRequestQuery, deleteRequestQuery, loadTreasuryRequestsQuery } from '../../query/userQuery'

export default function Participants(props) {
  const treasury = props.treasury.treasury
  // Participant array load from the database and update the UI
  const [participantArray, setParticipantsArray] = useState([])
  const [requestArray, setRequestArray] = useState([])


  const loadParticipants = async () => {
    const tempArray = await treasury.loadTreasuryParticipant()
    setParticipantsArray(tempArray)
  }

  const [listRefresh, setListRefresh] = useState(false)

  // Load treasury request 
  const loadTreasuryRequest = async () => {
    const response = await loadTreasuryRequestsQuery()
    if(response.status === 200 && response.data.proceed) {
      setRequestArray(response.data.content)
    }
  }

  useEffect(() => {
    loadParticipants()
    loadTreasuryRequest()
  }, [listRefresh])


  const deleteRequest = async (requestID) => {
    const response = await deleteRequestQuery(requestID)
    if(response.status === 200 && response.data.proceed) {
      setListRefresh(pre => !pre)
    }
  }


  const acceptRequest = async (requestID) => {
    const response = await acceptRequestQuery(requestID)
    console.log(response)
    if(response.status === 200 && response.data.proceed) {
      setListRefresh(pre => !pre)
    }
  }



  return (
    <div className='inner-screen-border'>
        <div className="participant-free-space" >

            {
              participantArray.map((element, index) => {
                return (<SingleParticipant user={element} key={index} indexNumber={index}/>)
              })
            }


             {
              props.activeUser.getUserLevel() > 2
              && <>
                <h4 className='requests'>Requests</h4>

                {
              requestArray.map((element, index) => {
                return (
                <div className="request-column">
                  <RequestParticipant user={element} indexNumber={index} key={index}/>
                  <div className="accept-reject">
                    <Button icon={<CheckCircleOutlined />} className='accepts' onClick={() => acceptRequest(element.request_ID)}>Accepts</Button>
                    <Button icon={<CloseOutlined/>} className='rejects' onClick={() => deleteRequest(element.request_ID)}>Reject</Button>
                  </div>
                </div>)
              })
            }

                </>
             } 
            

            

            
        </div>


          
    </div>
  )
}
