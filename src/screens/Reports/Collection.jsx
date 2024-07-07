import React, {useEffect, useState} from 'react'
import CreateCollection from './CreateCollection'
import PrimaryBorder from '../../components/PrimaryBorder'
import CollectionBanner from './CollectionBanner'

import '../../styles/collection.css'


import CollectionModel from '../../dataModels/CollectionDataModel'

export default function Collection(props) {
  const activeUser = props.activeUser

  const [collectionData, setCollection] = useState(null) // Currently active collection

  const [collectionArray, setCollectionArray] = useState([]) // Collection participants are listed 
  const [loadParticipants, setLoadState] = useState(true)

  const [newCollectionState, setNewCollectionState] = useState(false)

  // Load treasury collections from the database
  const loadTreasuryCollections = async () => {
    const res = await CollectionModel.fetchAllCollections()
    if(res) {
      setCollectionArray(res)
    } else {
      // Display error message
    }
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
        <button className='new-button' onClick={() => {
          setNewCollectionState(!newCollectionState)
          setCollection(new CollectionModel({}))
          }}>New</button>
          

          {/* List collection  */}
          <div className="collection-banner-container">
            {
              collectionArray.map((element, index) => {
                if(activeUser.getUserLevel() > 2 || element.getStatus() !== 'DRAFT')
                return (<CollectionBanner key={index} collection={element} setCollection={setCollection}/>)
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

