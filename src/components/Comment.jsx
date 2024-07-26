import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {Input} from 'antd'
import CommentsModel from '../dataModels/CommentModel'

import '../styles/comment.css'

import PrimaryBorder from './PrimaryBorder'
import AnnouncementModel from '../dataModels/AnnouncementModel'

export default function Comment(props) {
    const recordID = props.recordID  // Relevant record ID 

    useEffect(() => {

    }, [])

    const [newComment, setNewComment] = useState('')

    // Creating a new comment 
    const createComment = () => {
        // creating comment instant 
        const announcement = new AnnouncementModel({content: newComment})
        console.log(announcement)
    }
    
  return (

    <motion.div className="comment-base"
    initial={{height: 0}}
    animate={{height:  200, transition: {duration: 0.3}}}
    exit={{height: 0, transition: {duration: 0.3}}}
    >
        <div className="loaded-comments">

        </div>
        
        <div className="new-comment">
            
            <div style={{flexGrow: 1}}>
                <PrimaryBorder borderRadius='6px' margin='0 10px'>
                    <Input placeholder='Your Comment' value={newComment} onChange={(e) => {
                        setNewComment(e.target.value)
                    }}/>
                </PrimaryBorder>
            </div>
            
            
            <PrimaryBorder borderRadius='6px' width='fit-content'>
                <button onClick={createComment}>POST</button>
            </PrimaryBorder>    
            
        </div>
    </motion.div>
  )
}
