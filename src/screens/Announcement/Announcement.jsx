import React from 'react'
import {motion} from 'framer-motion'



export default function Announcement() {
  return (
    <motion.div className='panel-outside-border'
      initial={{x: 1500}}
      animate={{x: 0, transition: {duration: 0.3, delay: 0.2}}}
      exit={{y: 1000, transition: {delay: 0.1}}}
    >




    </motion.div>
  )
}
