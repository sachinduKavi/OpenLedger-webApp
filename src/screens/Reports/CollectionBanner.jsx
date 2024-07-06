import React from 'react'
import {motion} from 'framer-motion'

import '../../styles/collection-banner.css'

import PollBar from '../../components/PollBar'
import CollectionModel from '../../dataModels/CollectionDataModel'

export default function CollectionBanner(props) {
    const collection = props.collection

    // Calculate paid amount 
    let totalCollected = 0
    collection.participantArray.forEach(element => {
        totalCollected += element.paidAmount
    })


  return (
    <motion.div className='collection-banner-border'
        whileTap={{scale: 0.98, transition: {duration: 0.1}}}
        onClick={() => {
            // console.log('banner click')
            // console.log('banner', collection.extractJSON())
            props.setCollection(new CollectionModel(collection.extractJSON()))
        }}
    >
        
        <div className="top-heading">
        <h2>{collection.getCollectionName()}</h2>

        <p>LKR {totalCollected}/{collection.getAmount()}</p>
        </div>

        <div className="draft">
            {collection.getStatus() === 'DRAFT' && <h6>DRAFT</h6>}
        </div>

        <PollBar height='7px' margin='4px 0 4px 0' process={(totalCollected/collection.getAmount())*100}/>

        <div className="row">
            <div className="column-collection">
                <p>Publisher: {collection.getPublisherName()}</p> 
                
                <p>Date: {collection.getPublishedDate()}</p>
    
            </div>


            <div className="collection-column end-column">

                <h3 style={{color: '#FF3A3A'}}>PENDING PAYMENT</h3>
                <p className="deadline">
                    Deadline: {collection.getDeadline()}
                </p>
            </div>

        </div>
    </motion.div>
  )
}
