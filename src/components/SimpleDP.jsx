import React, {useContext} from 'react'
import {motion} from 'framer-motion'

import '../styles/simpleDP.css'

export default function SimpleDP(props) {
  const picScale = {
    x: props.imageScale.x * props.size /200,
    y: props.imageScale.y * props.size /200,
    scale: props.imageScale.scale + 0.1
  }
 
  return (


    <div>
        <div className="display-picture" style={{width:props.size}}
        >
          {(props.imageLink != null) && <motion.img src={props.imageLink} width='100%' animate={picScale}/>}
        </div>
    </div>
  )
}
