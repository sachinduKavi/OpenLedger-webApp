import React, {useState, createRef, useEffect} from 'react'
import '../../styles/announcement-single.css'
import {AnimatePresence} from 'framer-motion'

import HeartIcon from '../../assets/icons/heart.png'
import CommentsIcon from '../../assets/icons/comments.png'
import Comment from '../../components/Comment'
import DeleteIcon from '../../assets/icons/delete.png'

import SimpleDP from '../../components/SimpleDP'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'



export default function AnnouncementSingle(props) {
  const announcement = props.announcement
  const update = props.update
  const activeUser = props.activeUser

  const commentRef = createRef()
  const [commentView, setCommentView] = useState(false) // Comment state of the post 

  const checkMouseLocation = (e) => {
    console.log(e)
  }


  useEffect(() => {
    document.addEventListener('mousedown', checkMouseLocation)

    return (()=> {
      document.removeEventListener('mousedown', checkMouseDownLocation)
    })
  }, [])

  // Delete announcement 
  const deleteAnnouncement = async () => {
    if(window.confirm("Are you sure you want to delete an announcement ?") && await announcement.deleteAnnouncement()) {
      toast.custom(<ToastCustom type='success' header='Announcement Deleted'>You have successfully deleted the announcement.</ToastCustom>);
      props.update.setUpdate(!props.update.announcementUpdate)
    } else {
      toast.custom(<ToastCustom type='warnning' header='Deletion canceled'>Deletion was canceled or something went wrong.</ToastCustom>);
    } 
    
  }


  
  

  return (
    <div className='single-announcement-border'>

      <div className="publisher-details">
        
        <div className="profile">
          <SimpleDP imageScale={{x: 0, y: 0, scale: 1.2}} size='50px' imageLink={announcement.getPublisherDP()}/>
        </div>

        <div className="user-column">
            <h2 className="user-name">{announcement.getPublisherName()}</h2>
            <h5 className='date' style={{fontSize: '0.9vw'}}>{announcement.getPublishDate()}</h5>
        </div>

        {
          (activeUser.getUserId() === announcement.getPublisherID()) &&
          <div className="delete-btn" >
          <img src={DeleteIcon} alt="delete-icon" width='20px' onClick={deleteAnnouncement} style={{cursor: 'pointer'}}/>
        </div>}
      </div>


      <div className="caption">
        <p className="caption-content">{announcement.getCaption()}</p>
      </div>

      <div className="uploaded-img">
        <img src={announcement.getImageLink()} alt="image loading" width='100%'/>

      </div>

      <div className="announcement-footer">
        <img src={HeartIcon} alt="" className='announcement-icons'/>
        <p className='controllers'>Likes</p>

        <img src={CommentsIcon} alt="" className='announcement-icons'/>
        <p onClick={() => setCommentView(!commentView)} className='controllers'>Comments</p>
      </div>

      <AnimatePresence>
        {commentView && <Comment recordID={announcement.getAnnouncementID()} activeUser={props.activeUser} update={update} commentRef={commentRef}/>}
      </AnimatePresence>
      

    </div>
  )
}

