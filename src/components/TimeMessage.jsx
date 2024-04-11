import '../styles/message.css'

import { motion, AnimatePresence, easeOut } from 'framer-motion'

import successIcon from '../assets/icons/check-circle.png'
import closeIcon from '../assets/icons/close.png'
import warnning from '../assets/icons/square-exclamation.png'
import info from '../assets/icons/info.png'
import cross from '../assets/icons/cross.png'


const selectType = (type) => {
  switch(type) {
    case 'error':
      return cross
    case 'success':
      return successIcon
    case 'info':
      return info
    case 'warnning':
      return warnning
  }
}

import React, {useEffect} from 'react'

export default function TimeMessage(props) {
  const type = props.type


  // ComponentDidMount equivalent. runs in the begin
  useEffect(() => {
    setTimeout(()=>{
      props.killFn(props.messageID)
    }, 16)
  })

  return (
    
    <motion.div className='message-box' 
      animate={{x: 0}}
      initial={{x:500}}
      transition={{duration: 0.3, type: 'spring', stiffness: 200}}
      exit={{x:500, transition:{duration:0.3, ease:'easeOut'}}}
      >
          
          <div className='horizontal-comp'>
              <div className={`vertical-line ${type}`}></div>

              <div className="icon">
                <img src={selectType(type)} alt="success-icon" width='40'/>
              </div>

              <div className="content">
                <h3 className='heading'>{props.header}</h3>

                <p>{props.children}</p>

                <div className="time-line"></div>
              
              </div>

              <button className='cross' id='closeBtn' onClick={() => {props.killFn()}}><img src={closeIcon} alt='close'/></button>
          </div>

    </motion.div>
   
    
  )
}

