import React from 'react'
import DeleteIcon from '../assets/icons/delete.png'
import toast from 'react-hot-toast'
import ToastCustom from './ToastCustom'

import '../styles/single-comment.css'


export default function SingleComment(props) {
    const comment = props.comment
    const update = props.update

    const deleteComment = async () => {
        if(window.confirm("Are your sure you want to delete a comment ?") && await comment.deleteComment()) {
            // Comment deletion success
            toast.custom(<ToastCustom type='info' header='Comment Deleted'>Your comment deleted successfully.</ToastCustom>);
            update.setCommentUpdate(!update.commentUpdate)
        } else {
            // Comment deletion unsuccessful
            toast.custom(<ToastCustom type='warnning' header='Deletion Canceled'>Comment deletion was unsuccessful.</ToastCustom>);
        }
    }

  return (
    <div className='single-comment'>
        <div className="row"> 
            <h4>{comment.getUserName()}</h4>
            {
                (props.activeUser.getUserId() === comment.getUserID())
                && <img src={DeleteIcon} alt="delete-icon" width='10px' onClick={deleteComment}/>
            }
            
        </div>
        
        <p>{comment.getContent()}</p>
    </div>
  )
}
