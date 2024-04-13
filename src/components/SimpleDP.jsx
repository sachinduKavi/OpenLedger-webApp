import React from 'react'
import {motion} from 'framer-motion'

import '../styles/simpleDP.css'

export default function SimpleDP(props) {
  console.log('dp' , props.imageLink, props.imageScale)
  return (
    <div>
        <div className="display-picture" style={{width:props.size}}>
          {(props.imageLink != null) && <motion.img src={props.imageLink} width='100%' animate={props.imageScale}/>}
        </div>
    </div>
  )
}
