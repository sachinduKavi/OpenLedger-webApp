import React, {useEffect, useState, useContext} from 'react'
import CreateCollection from './CreateCollection'
import PrimaryBorder from '../../components/PrimaryBorder'
import CollectionBanner from './CollectionBanner'
import { SessionContext } from '../../Session'

import '../../styles/collection.css'


import CollectionModel from '../../dataModels/CollectionDataModel'

export default function Collection(props) {
  const changeSessionData = useContext(SessionContext).changeSessionData
  const activeUser = props.activeUser

  const [collectionData, setCollection] = useState(null) // Currently active collection

  const [collectionArray, setCollectionArray] = useState([]) // Collection participants are listed 
  const [loadParticipants, setLoadState] = useState(true)

  const [newCollectionState, setNewCollectionState] = useState(false)

  // Load treasury collections from the database
  const loadTreasuryCollections = async () => {
    changeSessionData({processing: true})
    const res = await CollectionModel.fetchAllCollections()
    if(res) {
      setCollectionArray(res)
    } else {
      // Display error message
    }
    changeSessionData({processing: false})
  }

  useEffect(() => {
    if(loadParticipants) {
      loadTreasuryCollections()
      setLoadState(false)
    }
    
  }, [collectionData])

  return (
    <div className='collection-area'>

      <div className="row">
        <div className="column">

          {activeUser.getUserLevel() > 2 &&
          <button className='new-button' onClick={() => {
          setNewCollectionState(!newCollectionState)
          setCollection(new CollectionModel({}))
          }}>New</button>}
          

          {/* List collection  */}
          <div className="collection-banner-container">
            {
              collectionArray.map((element, index) => {
                if(activeUser.getUserLevel() > 2 || element.getStatus() !== 'DRAFT')
                return (<CollectionBanner key={index} collection={element} setCollection={setCollection} index={index}
                  activeUser={activeUser}
                />)
              })
            }
        
          </div>

          

        </div>
        

        <div className="column">
          
          { (collectionData !== null) &&
            <CreateCollection treasury={props.treasury} collection={collectionData} setCollection={setCollection} setLoadState={setLoadState}
              activeUser={activeUser}
              newCollectionState={newCollectionState}
            />}
        </div>
      </div>      




    </div>
  )
}

