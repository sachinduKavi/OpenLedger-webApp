import React from 'react'
import CreateCollection from './CreateCollection'
import PrimaryBorder from '../../components/PrimaryBorder'
import CollectionBanner from './CollectionBanner'

import '../../styles/collection.css'


export default function Collection(props) {
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

          <CreateCollection treasury={props.treasury}/>
        </div>
      </div>      




    </div>
  )
}

