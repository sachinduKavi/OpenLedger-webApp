import React, {useState, useEffect} from 'react'
import {AnimatePresence} from 'framer-motion'

import Comment from '../../components/Comment'
import CommentsIcon from '../../assets/icons/comments.png'

import SimpleDP from '../../components/SimpleDP'
import '../../styles/single-complaint.css'

export default function SingleComplaint(props) {

    const complaint = props.complaint
    const evidenceList = complaint.getEvidenceArray()
    const [commentUpdate, setCommentUpdate] = useState(false)
    const [commentView, setCommentView] = useState(false)

    
    const [galleryWidth, setGalleryWidth] = useState(0)
    useEffect(() => {
        setGalleryWidth(document.getElementsByClassName('image-gallery')[0].clientWidth)
    }, [])

  return (
    <div className='single-complaint-border'>
        <div className="complaint-col">
            <SimpleDP imageScale={{x: 0, y: 0, scale: 1.2}} size={40} imageLink={complaint.getAnonymous()? null: complaint.getDpLink()}/>
        </div>

        <div className="complaint-col content-complaint">
            <h4 className='complaint-date'>{complaint.getPublishedDate()}</h4>
            <h3 className='complaint-text'>{complaint.getSubject()} ({complaint.getAnonymous()? "Anonymous": complaint.getPublisher()})</h3>

            <p className='caption complaint-text'>{complaint.getCaption()}</p>

            <div className="image-gallery">
                {
                    evidenceList.map((element, index) => {
                        return (<div className="evidence" style={{width: (galleryWidth / 2)-5 }} key={index}>
                                    <img src={element.getImageLink()} alt="" width='100%'/>
                                </div>)
                    })
                }
                
            </div>

            <div className="complaint-footer">
                <img src={CommentsIcon} alt="" className='announcement-icons'/>
                <p onClick={() => setCommentView(!commentView)} className='controllers'> Comments</p>
            </div>



            <AnimatePresence>
                {
                    commentView &&
                    <Comment recordID={complaint.getComplaintID()} activeUser={props.activeUser} commentUpdate={commentUpdate} setCommentUpdate={setCommentUpdate}/>
                }
                
            </AnimatePresence>
            
        </div>
    </div>
  )
}
