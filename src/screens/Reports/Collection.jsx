import React, {useEffect, useState} from 'react'
import CreateCollection from './CreateCollection'
import PrimaryBorder from '../../components/PrimaryBorder'
import CollectionBanner from './CollectionBanner'

import '../../styles/collection.css'


import CollectionModel from '../../dataModels/CollectionDataModel'

export default function Collection(props) {

  const [collectionData, setCollection] = useState(new CollectionModel({}))

  const [collectionArray, setCollectionArray] = useState([])

  const loadTreasuryCollections = async () => {
    const res = await CollectionModel.fetchAllCollections()
    if(res) {
      setCollectionArray(res)
    } else {
      // Display error message
    }
  }

  useEffect(() => {
    console.log('Loading colelction')
    loadTreasuryCollections()
  }, [])

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

          <CreateCollection treasury={props.treasury} collection={collectionData} setCollection={setCollection}/>
        </div>
      </div>      




    </div>
  )
}

