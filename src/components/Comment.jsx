import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {Input} from 'antd'
import toast from 'react-hot-toast'
import CommentsModel from '../dataModels/CommentModel'
import ToastCustom from './ToastCustom'

import '../styles/comment.css'

import PrimaryBorder from './PrimaryBorder'

export default function Comment(props) {
    const recordID = props.recordID  // Relevant record ID 

    

    const [newComment, setNewComment] = useState('')

    const loadComments = async () => {

    }


    useEffect(() => {
        loadComments()
    })


    // Creating a new comment 
    const createComment = async () => {
        // creating comment instant 
        const comment = new CommentsModel({content: newComment, recordID: recordID})
        if(await comment.createNewComment()) {
            // Comment created successfully 
            toast.custom(<ToastCustom type='success' header='Comment Shared'>You have successfully shared your comment.</ToastCustom>);
        } else {
            // Comment creation error
            toast.custom(<ToastCustom type='error' header='Comment failed'>There is something wrong, please try again later.</ToastCustom>);
        }
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
