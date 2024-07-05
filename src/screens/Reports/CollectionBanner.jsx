import React from 'react'
import {motion} from 'framer-motion'

import '../../styles/collection-banner.css'

import PollBar from '../../components/PollBar'

export default function CollectionBanner(props) {
    const collection = props.collection

  return (
    <motion.div className='collection-banner-border'
        whileTap={{scale: 0.98, transition: {duration: 0.1}}}
    >
        
        <div className="top-heading">
        <h2>{collection.getCollectionName()}</h2>

        <p>LKR 4800/8000</p>
        </div>

        <div className="draft">
            <h6>DRAFT</h6>
        </div>

        <PollBar height='7px' margin='4px 0 4px 0' process={60}/>

        <div className="row">
            <div className="column-collection">
                <p>Publisher: Sachindu Kavishka</p> 
                
                <p>Date: 2024-10-26</p>
    
            </div>


            <div className="collection-column end-column">
                <h3 style={{color: '#FF3A3A'}}>PENDING PAYMENT</h3>
                <p className="deadline">
                    Deadline: 2024-10-30
                </p>
            </div>

        </div>
    </motion.div>
  )
}
