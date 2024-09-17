import React, {useState} from 'react'
import {AnimatePresence} from 'framer-motion'

import Comment from '../../components/Comment'

import SimpleDP from '../../components/SimpleDP'
import '../../styles/single-complaint.css'

export default function SingleComplaint(props) {

    const complaint = props.complaint
    const [commentUpdate, setCommentUpdate] = useState(false)
  return (
    <div className='single-complaint-border'>
        <div className="complaint-col">
            <SimpleDP imageScale={{x: 0, y: 0, scale: 1.2}} size={40} imageLink={complaint.getAnonymous()? null: complaint.getDpLink()}/>
        </div>

        <div className="complaint-col content-complaint">
            <h4 className='complaint-date'>{complaint.getPublishedDate()}</h4>
            <h3 className='complaint-text'>{complaint.getSubject()} : {complaint.getAnonymous()? "Anonymous": complaint.getPublisher()}</h3>

            <p className='caption complaint-text'>{complaint.getCaption()}</p>

            <AnimatePresence>
                <Comment recordID={complaint.getComplaintID()} activeUser={props.activeUser} commentUpdate={commentUpdate} setCommentUpdate={setCommentUpdate}/>
            </AnimatePresence>
            
        </div>
    </div>
  )
}
