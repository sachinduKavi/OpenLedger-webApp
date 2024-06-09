import { border } from '@cloudinary/url-gen/qualifiers/background'
import React from 'react'
import {Switch, InputNumber} from 'antd'

import '../../styles/treasury-details.css'

import PrimaryBorder from '../PrimaryBorder'
import EditIcon from '../../assets/icons/Edit.png'

export default function TreasuryDetails(props) {

  // Get instants from the parent 
  const treasury = props.treasury.treasury
  const treasuryUpdate = props.treasury.treasuryUpdate
  const activeUser = props.activeUser

  return (
    <div className="inner-screen-border">
        <div className="row">
          <div className="column">

            <PrimaryBorder width='100%' borderRadius='26px'>
              <div className="card" style={{background: `url('${treasury.getCoverImageID()}')`, backgroundSize: 'cover'}}></div>
            </PrimaryBorder>  
      
          </div>

          <div className="column">
            <h1>Treasury Details</h1>

            <div className="editable-row">
              <h2>{treasury.getTreasuryName()}</h2>
              <img src={EditIcon} alt="edit-icon" />
            </div>

            <div className="editable-row">
              <h2>{treasury.getTreasuryID()}</h2>
              <img src={EditIcon} alt="edit-icon" />
            </div>
            
            
          </div>

        </div>


        <div className="row">
          <div className="column" style={{padding: '50px'}}>
            <div className="editable-row">
              <h3>Member Limit</h3>
              <InputNumber value={treasury.getMemberLimit()}/>
            </div>


            <div className="editable-row">
              <h3>Group Visibility</h3>
              <Switch value={treasury.getGlobalVisibility()}/>
            </div>


            <div className="editable-row">
              <h3>Public Availability</h3>
              <Switch value={treasury.getPublic()}/>
            </div>

            <h4>Created Date: {treasury.getCreatedDate()}</h4>
          </div>

          <div className="column">
            <h2>Description</h2>

            <div className="editable-row"  style={{marginTop: '5px'}}>
              <h4 style={{textAlign: 'justify', marginRight: '10px'}}>{treasury.getDescription()}</h4>
              <img src={EditIcon} alt="edit-icon" />
            </div>


          </div>
        </div>
    </div>
  )
}
