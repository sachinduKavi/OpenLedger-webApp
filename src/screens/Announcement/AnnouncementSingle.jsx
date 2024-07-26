import React, {useState} from 'react'
import '../../styles/announcement-single.css'
import {AnimatePresence} from 'framer-motion'

import HeartIcon from '../../assets/icons/heart.png'
import CommentsIcon from '../../assets/icons/comments.png'
import Comment from '../../components/Comment'

import SimpleDP from '../../components/SimpleDP'


export default function AnnouncementSingle(props) {
  const announcement = props.announcement

  const [commentView, setCommentView] = useState(false) // Comment state of the post 

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
        {commentView && <Comment/>}
      </AnimatePresence>
      

    </div>
  )
}

