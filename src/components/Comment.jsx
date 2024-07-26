import React, {useEffect} from 'react'
import {motion} from 'framer-motion'
import {Input} from 'antd'
import '../styles/comment.css'

export default function Comment(props) {


    useEffect(() => {

    }, [])
    
  return (

    <motion.div className="comment-base"
    initial={{height: 0}}
    animate={{height:  200, transition: {duration: 0.3}}}
    exit={{height: 0, transition: {duration: 0.3}}}
    >
        <div className="loaded-comments"></div>
        
        <div className="new-comment">
            <Input/>
        </div>
    </motion.div>
  )
}
