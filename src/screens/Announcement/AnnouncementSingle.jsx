import React from 'react'
import '../../styles/announcement-single.css'

import HeartIcon from '../../assets/icons/heart.png'
import CommentsIcon from '../../assets/icons/comments.png'

import SimpleDP from '../../components/SimpleDP'


export default function AnnouncementSingle() {
  return (
    <div className='single-announcement-border'>

      <div className="publisher-details">
        
        <div className="profile">
          <SimpleDP imageScale={{x: 0, y: 0, scale: 1}} size='50px'/>
        </div>

        <div className="user-column">
            <h2 className="user-name">Nipuni Nawanjala</h2>
            <h5 className='date' style={{fontSize: '0.9vw'}}>2024-10-26</h5>
        </div>
      </div>


      <div className="caption">
        <p className="caption-content">Are you ready to embark on an exhilarating journey?
        We're calling all enthusiastic volunteers to join our Organizing Committee and be a part of something extraordinary.</p>
      </div>

      <div className="uploaded-img">


      </div>

      <div className="announcement-footer">
        <img src={HeartIcon} alt="" className='announcement-icons'/>
        <p>Likes</p>

        <img src={CommentsIcon} alt="" className='announcement-icons'/>
        <p>Comments</p>
      </div>

      {/* For future development */}
      <div className="comment-base">

      </div>

    </div>
  )
}

