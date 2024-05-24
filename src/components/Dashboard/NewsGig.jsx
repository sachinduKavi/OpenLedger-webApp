import React from 'react'
import '../../styles/news-gig.css'

export default function NewsGig(props) {
  return (
    <div className='news-container'>
        <h4 className="topic">{props.data.getTitle()}</h4>
        <img src={props.data.getImageURL()} alt="Loading image..." width='100%'/>
        <p>{props.data.getContent()}</p>
    </div>
  )
}
