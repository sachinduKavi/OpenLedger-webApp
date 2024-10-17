import { border } from '@cloudinary/url-gen/qualifiers/background'
import React, {useState, useContext} from 'react'
import {Switch, InputNumber} from 'antd'
import QRCode from 'react-qr-code'

import '../../styles/treasury-details.css'

import PrimaryBorder from '../PrimaryBorder'
import EditIcon from '../../assets/icons/Edit.png'
import EditTreasuryPopup from '../EditTreasuryPopup'

import { SessionContext } from '../../Session'

export default function TreasuryDetails(props) {
  // Editor prompt values
  const sessionData = useContext(SessionContext)

  const [editorState, changeEditor] = useState({
    name: false,
    memberLimit: false,
    description: false
  })
  const resetEditor = () => {
    changeEditor({
      name: false,
      memberLimit: false,
      description: false
    })
  }

  // Get instants from the parent 
  const treasury = props.treasury.treasury
  const treasuryUpdate = props.treasury.treasuryUpdate
  const activeUser = props.activeUser


  // Update the treasury details
  const updateTreasury = async (columnName, newValue) => {
    sessionData.changeSessionData({processing: true}) // Global Processing
    // Trigger to update new value 
    const treasury = await activeUser.updateTreasurySettings(columnName, newValue)
    if(treasury) {
      // Updated successfully
      treasuryUpdate(treasury)
    } else {
      // Update file message
    }
    resetEditor()
    sessionData.changeSessionData({processing: false})
  }

  return (
    <div className="inner-screen-border">
        <div className="row">
          <div className="column">

            <PrimaryBorder width='100%' borderRadius='26px' flex='1'>
              <div className="card" style={{background: `url('${treasury.getCoverImageID()}')`, backgroundSize: 'cover'}}></div>
            </PrimaryBorder>
      
          </div>

          <div className="column main-details">
            <h1>Group Details</h1>

            <div className="editable-row">
              <h2>{treasury.getTreasuryName()}</h2>
              <img src={EditIcon} alt="edit-icon" style={{visibility: activeUser.getUserLevel() > 3? 'visible': 'hidden', cursor: 'pointer'}}
              onClick={() => {
                changeEditor({editorState, name: true})
              }}
              />
            </div>

            <div className="editable-row">
              <h2>{treasury.getTreasuryID()}</h2>
            </div>

            <div className="editable-row">
              <h3>Member Limit</h3>

              <div style={{display: 'flex', flexDirection: 'row', width: '15%', justifyContent: 'space-between'}}>
                <p>{treasury.getMemberLimit()}</p>
                <img src={EditIcon} alt="edit-icon" style={{visibility: activeUser.getUserLevel() > 3? 'visible': 'hidden', cursor: 'pointer'}}
                onClick={() => {
                  changeEditor({editorState, memberLimit: true})
                }}
                />
              </div>
              
            </div>


            <div className="editable-row">
              <h3>Group Visibility</h3>
              <Switch value={treasury.getGlobalVisibility()} onChange={async () => {
                updateTreasury('global_visibility', !treasury.getGlobalVisibility())
              }} disabled={activeUser.getUserLevel() > 3? false: true}/>
            </div>


            <div className="editable-row">
              <h3>Details Publicity</h3>
              <Switch value={treasury.getPublic()} onChange={async () => {
                updateTreasury('public_group', !treasury.getPublic())
              }}  disabled={activeUser.getUserLevel() > 3? false: true}/>
            </div>

            <h4>Created Date: {treasury.getCreatedDate()}</h4>
            
            
          </div>

        </div>


        <div className="row">
  

          <div className="column" style={{width: '100%'}}>
            <h2>Description</h2>

            <div className="editable-row"  style={{marginTop: '5px'}}>
              <h4 style={{textAlign: 'justify', marginRight: '10px'}}>{treasury.getDescription()}</h4>
              <img src={EditIcon} alt="edit-icon" style={{visibility: activeUser.getUserLevel() > 3? 'visible': 'hidden', cursor: 'pointer'}} 
                onClick={() => {
                  changeEditor({editorState, description: true})
                }}
              />
            </div>


          </div>
        </div>

        <div className="row">
          <h2>Treasury Group Link</h2>
        </div>

        <div className="row qr-row">
            <div className="column" style={{width: 'fit-content', backgroundColor: 'white', aspectRatio: 1, alignItems: 'center'}}>


                <QRCode
                  value={treasury.getTreasuryLink()}
    
                  style={{ height: "auto", maxHeight: "100%", aspectRatio: 1 }}
                />
      
              
            </div>

            <div className="column treasury-link">
              <a href={treasury.getTreasuryLink()} target='blank' style={{color: 'white'}}>{treasury.getTreasuryLink()}</a>
            </div>

        </div>
        {/* Description edit */}
        {editorState.description && <EditTreasuryPopup type='textarea' heading='Description' submit={updateTreasury} close={() => changeEditor({...editorState, description: false})}/>}
        {/* Treasury name */}
        {editorState.name && <EditTreasuryPopup type='text' heading='Treasury Name' submit={updateTreasury} close={() => changeEditor({...editorState, name: false})}/>}
        {/* Member Limit */}
        {editorState.memberLimit && <EditTreasuryPopup type='number' heading='Member Limit' submit={updateTreasury} close={() => changeEditor({...editorState, memberLimit: false})}/>}
    </div>
  )
}
