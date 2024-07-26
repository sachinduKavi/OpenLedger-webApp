import React, {useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {Input} from 'antd'
import toast from 'react-hot-toast'
import CommentsModel from '../dataModels/CommentModel'
import ToastCustom from './ToastCustom'
import SingleComment from './SingleComment'

import '../styles/comment.css'


import PrimaryBorder from './PrimaryBorder'
import { capitalize } from '../middleware/auth'

export default function Comment(props) {
    const recordID = props.recordID  // Relevant record ID 


    const [newComment, setNewComment] = useState('')
    const [commentList, setCommentList] = useState([]) // Comment list 
    const [commentUpdate, setCommentUpdate] = useState(false)


    // Load current all the comments related to the database 
    const loadComments = async () => {
        setCommentList(await CommentsModel.loadCommentList(recordID))
    }


    useEffect(() => {
        loadComments()
    }, [commentUpdate])


    // Creating a new comment 
    const createComment = async () => {
        // creating comment instant 
        if(newComment.length > 0) {
            const comment = new CommentsModel({content: newComment, recordID: recordID})
            if(await comment.createNewComment()) {
                // Comment created successfully 
                toast.custom(<ToastCustom type='success' header='Comment Shared'>You have successfully shared your comment.</ToastCustom>);
                setCommentUpdate(!commentUpdate)
                setNewComment('')
            } else {
                // Comment creation error
                toast.custom(<ToastCustom type='error' header='Comment failed'>There is something wrong, please try again later.</ToastCustom>);
            }
        } else {
            toast.custom(<ToastCustom type='warnning' header='Missing Field'>You can not post empty comment.</ToastCustom>);
        }
        
     }
    
  return (

    <motion.div className="comment-base"
    initial={{height: 0}}
    animate={{height: 'fit-content', transition: {duration: 0.3}}}
    exit={{height: 0, transition: {duration: 0.3}}}
    >
        <div className="loaded-comments">
            {
                commentList.map((element, index) => {
                    return (<SingleComment comment={element} key={index} activeUser={props.activeUser} update={{commentUpdate: commentUpdate, setCommentUpdate:setCommentUpdate}}/>)
                })
            }
            
        </div>
        
        <div className="new-comment">
            
            <div style={{flexGrow: 1}}>
                <PrimaryBorder borderRadius='6px' margin='0 10px'>
                    <Input placeholder='Your Comment' value={newComment} onChange={(e) => {
                        setNewComment(capitalize(e.target.value))
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
