import React, {useState} from 'react'
import CreateCollection from './CreateCollection'
import PrimaryBorder from '../../components/PrimaryBorder'
import CollectionBanner from './CollectionBanner'

import '../../styles/collection.css'


import CollectionModel from '../../dataModels/CollectionDataModel'

export default function Collection(props) {

  const [collectionData, setCollection] = useState(new CollectionModel({}))

  return (
    <div className='collection-area'>

      
        

      <div className="row">
        <div className="column">
        <button className='new-button'>New</button>
          <CollectionBanner/>
          <CollectionBanner/>
          <CollectionBanner/>
          <CollectionBanner/>

        </div>
        

        <div className="column">

          <CreateCollection treasury={props.treasury} collection={collectionData} setCollection={setCollection}/>
        </div>
      </div>      




    </div>
  )
}

