import React from 'react'

import '../../styles/new-treasury.css'

import {Input} from 'antd'

import PrimaryBorder from '../PrimaryBorder'

export default function TreasuryNew() {
  return (
    <div className='overlay'>

        <div className="blur-page"></div>
      
        <div className='newForm'>


          <h2>CREATE NEW TREASURY</h2>

          
          <div className="row">
            <div className="cell">
                <h5 className='input-label'>Treasury Name: </h5>
                <PrimaryBorder borderRadius='6px'>
                  <Input className='input-box' type='text'/>
                </PrimaryBorder>

                <h5 className="input-label">Description:</h5>
                <PrimaryBorder borderRadius='6px'>
                  <Input.TextArea className='input-box' type='text'
                    rows={6}
                    />
                </PrimaryBorder>

                <h5 className="input-label">Members Limit</h5>
                <PrimaryBorder borderRadius='6px'>
                  <Input type='number' className='input-box' style={{width:'5px'}} value={100}/>
                </PrimaryBorder>

            </div>
            
          </div>


          

          

         
          
        </div>
    </div>

    
  )
}
