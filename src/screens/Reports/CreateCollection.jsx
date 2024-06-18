import React from 'react'
import '../../styles/collection-new.css'

import {Input, Checkbox} from 'antd'
import PrimaryBorder from '../../components/PrimaryBorder'

export default function CreateCollection(props) {
  return (
    <div className='collection-border'>
        <div className="background-blur" style={{borderRadius: '20px', zIndex: 20}}></div>

        <div className="collection-container">
            <h2>CREATE COLLECTION</h2>
            
            <div className="row">
                <div className="column">
                <label htmlFor="">Allocation Fund</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input type='number'/>
                </PrimaryBorder>
                
                </div>

                <div className="column" style={{alignItems: 'flex-end'}}>
                    <label htmlFor="">Remaining amount: LKR 27 500</label>
                    <Checkbox/>
                </div>
            </div>


            {/* Participant container */}
            <div className="participant-container">

                
            </div>

        </div>
    </div>
  )
}
