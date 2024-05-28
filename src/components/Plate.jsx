import React, {useState} from 'react'

import PrimaryBorder from '../components/PrimaryBorder'
import {delay, motion} from 'framer-motion'
import '../styles/plate.css'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { transition } from '@cloudinary/url-gen/actions/effect'

export default function Plate(props) {
    
  return (
    <motion.div className="margin" onClick={props.onClick} role='button' 
        whileHover={{scale: 0.9, x: -12}}
        onHoverEnd={{scale:1, x: 0, transition: {delay: 0, duration: 0}}}
        initial={{x:-1000}}
        animate={{x:0, transition: {delay: props.keyValue*0.04, duration: 0.5, type: 'spring'}}}
    >
        <PrimaryBorder borderRadius='0 10px 10px 0'>
        <div className={`plate ${props.active?'dark':'light'}`}>
            <img src={props.active?props.imageName.dark: props.imageName.light} alt="icon" width='38' height='38'/>
            <h2>{props.name}</h2>
        </div>
        </PrimaryBorder>
    </motion.div>
    
    
  )
}
