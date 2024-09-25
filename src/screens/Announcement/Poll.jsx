import React from 'react'
import {Checkbox} from 'antd'
import PollBar from '../../components/PollBar'

import '../../styles/vote.css'

export default function Poll() {
  return (
    <div className='vote-border'>
        <h2>Title</h2>

        <>
            <div className="row">
                <h4>01 Option number one</h4>
            </div>
            
            <div className="row">
                <Checkbox className='selection'/>
                <PollBar height='5px' margin='2px 0 5px 0'/>
            </div>
            <div className="row details">
                <h6>votes: 50</h6>
                <h6>69%</h6>
            </div>
        
        </>


        <>
            <div className="row">
                <h4>01 Option number one</h4>
            </div>
            
            <div className="row">
                <Checkbox className='selection'/>
                <PollBar height='5px' margin='2px 0 5px 0'/>
            </div>
            <div className="row details">
                <h6>votes: 50</h6>
                <h6>69%</h6>
            </div>
        
        </>
    </div>
  )
}
