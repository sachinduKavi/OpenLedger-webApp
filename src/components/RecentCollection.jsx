import React from 'react'
import PollBar from './PollBar'

import '../styles/recent-collection.css'

export default function RecentCollection() {
  return (
    <div className='recent-collection-border'>
        <div className="collection-container">
            <div className="blur"></div>

            <div className="col-content">
                <h2>COLLECTION</h2>

                <p className='content-fonts'>This is a small description about the the collection</p>
                <p className='content-fonts'>Deadline: 2024-10-26</p>

                <PollBar process={60} height='5px' margin='4px 0 4px 0'/>

                <div className="row">
                    <div className="content-fonts">LKR 5780 / 25000</div>

                    <div className="content-fonts">25%</div>
                </div>
            </div>
        </div>
    </div>
  )
}
