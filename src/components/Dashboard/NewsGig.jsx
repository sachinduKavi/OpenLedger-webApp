import React from 'react'
import {motion} from 'framer-motion'
import '../../styles/news-gig.css'

export default function NewsGig(props) {
  return (
    <motion.div className='news-container'
        initial={{scale: 0}}
        animate={{scale: 1}}
        transition={{duration: 0.3, delay:props.keyValue*0.14}}
    >
        <h4 className="topic">{props.data.getTitle()}</h4>
        <img src={props.data.getImageURL()} alt="Loading image..." width='100%'/>
        <p>{props.data.getContent()}</p>
    </motion.div>
  )
}
