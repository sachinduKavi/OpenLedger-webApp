import React, {useEffect, useState} from 'react'
import PollBar from './PollBar'
import CollectionDataModel from '../dataModels/CollectionDataModel'

import '../styles/recent-collection.css'

export default function RecentCollection(props) {

  const [collectionData, setCollection] = useState(null)
  const [participantRecord, setParticipantRecord] = useState(null)

  // Load the recent collection posted by the treasury group
  const loadRecentCollection =  async () => {
    const collection = new CollectionDataModel({})
    if(await collection.LoadSingleRecord()) {
      // Proceed success
      setCollection(collection)
    } 
    collection.calculateCollectedAmount()

    // Set Participant record
    setParticipantRecord(collection.fetchMyRecord(props.activeUser.getUserId()))
  }

  // Component did mount ?
  useEffect(() => {
    loadRecentCollection()
  }, [])

  if(collectionData === null) return null
  return (
    <div className='recent-collection-border'>
        <div className="collection-container">
            <div className="blur"></div>

            <div className="col-content">
                <h2>COLLECTION</h2>

                <h5>{collectionData.getCollectionName().toUpperCase()}</h5>

                <p className='content-fonts'>{collectionData.getDescription()}</p>
                <p className='content-fonts' style={{color: '#FF3A3A'}}>Deadline: {collectionData.getDeadline()}</p>

                <PollBar process={(collectionData.calculateCollectedAmount()/ collectionData.getAmount()) * 100} height='5px' margin='4px 0 4px 0'/>

                <div className="row">
                    <p className="content-fonts">LKR {collectionData.calculateCollectedAmount()} / {collectionData.getAmount()}</p>

                    <p className="content-fonts">{(collectionData.calculateCollectedAmount()/ collectionData.getAmount()) * 100}%</p>
                </div>
            </div>
        </div>

        <div className="payment-container" style={{display: (participantRecord.autoAssigned ? collectionData.calOneAmount() : participantRecord.amount) > participantRecord.paidAmount? 'flex': 'none'}}>
            <div className="blur"></div>


            <div className="col-content">
              <h2 style={{color: '#FF3A3A'}}>PENDING PAYMENT</h2>

              <div className="row">
                <h4>LKR {participantRecord.autoAssigned ? collectionData.calOneAmount() : participantRecord.amount}</h4>

                <button className='action-button'>VIEW</button>
              </div>

            </div>
              
      
            </div>

    </div>
  )
}
