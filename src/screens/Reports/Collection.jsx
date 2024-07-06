import React, {useEffect, useState} from 'react'
import CreateCollection from './CreateCollection'
import PrimaryBorder from '../../components/PrimaryBorder'
import CollectionBanner from './CollectionBanner'

import '../../styles/collection.css'


import CollectionModel from '../../dataModels/CollectionDataModel'

export default function Collection(props) {

  const [collectionData, setCollection] = useState(new CollectionModel({})) // Currently active collection

  const [collectionArray, setCollectionArray] = useState([]) // Collection participants are listed 
  const [loadParticipants, setLoadState] = useState(true)

  // Load treasury collections from the database
  const loadTreasuryCollections = async () => {
    const res = await CollectionModel.fetchAllCollections()
    console.log('in load teasury', res)
    if(res) {
      setCollectionArray(res)
    } else {
      // Display error message
    }
  }

  useEffect(() => {
    
    if(loadParticipants) {
      console.log('update', collectionData)
      loadTreasuryCollections()
      setLoadState(false)
    }
    
  }, [collectionData])

  return (
    <div className='collection-area'>

      
        

      <div className="row">
        <div className="column">
        <button className='new-button'>New</button>
          

          {/* List collection  */}
          <div className="collection-banner-container">
            {
              collectionArray.map((element, index) => {
                return (<CollectionBanner key={index} collection={element} setCollection={setCollection}/>)
              })
            }
        
          </div>

          

        </div>
        

        <div className="column">
          <CreateCollection treasury={props.treasury} collection={collectionData} setCollection={setCollection} setLoadState={setLoadState}/>
        </div>
      </div>      




    </div>
  )
}

