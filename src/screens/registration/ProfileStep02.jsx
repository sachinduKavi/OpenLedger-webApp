import React, { useState, useRef } from 'react'
import {v4} from 'uuid'

import OpenledgerLogo from '../../assets/OpenLedger.png'
import DisplayPicture from '../../components/DisplayPicture'
import Orcomp from '../../components/Orcomp'
import {Input} from 'antd'
import {profilePictureUpload} from '../../query/UserRegistrationQuery'

import '../../styles/profile-setup.css'


export default function ProfileStep02(props) {
    const parentContext = props.parentContext
    const imageInput = useRef(null)

    const [userName, setUserName] = useState('user')
    const [imageFile, setImageUpload] = useState(null)



    // Image selection form the local device 
    const finalizeProfile = async () => {
      parentContext.processTrigger(true)
      parentContext.state.userName = userName
      // Generates a image ID for the user
      const userImageID = v4().slice(0, 20)
      const pictureName = (userName.toString().replace(" ", "_")) + userImageID

      // Setting up image scale 
      if(parentContext.state.pictureScale == null) parentContext.state.pictureScale = {x: 0, y: 0, scale: 1}

      // Uploading the image to the firebase
      if(imageFile != null) {
        const pictureLink = await profilePictureUpload(imageFile, pictureName)
        parentContext.state.userImageLink = pictureLink
      }

      // Handing over to the main Registration function
      parentContext.createNewUser()
    }

    return (
      <div style={{justifyContent:'flex-start'}}>
        <div className="container-profile">
            
            <DisplayPicture imageFile={imageFile} imageRef={imageInput} width='200px' parentContext={parentContext} editable={true} />

            {/* This allows user to select their profile picture */}
            <input type="file" style={{padding:'20px', visibility:'hidden'}} ref={imageInput} accept="image/*" onChange={(e) => {setImageUpload(e.target.files[0])}}/>

            <Orcomp>SETUP YOUR PROFILE</Orcomp>

            <div className="name">
              <Input id='profile_name' placeholder='User Name' onChange={(e) => {setUserName(e.target.value)}}/>

              <button className='classic-btn' style={{marginTop:'20px'}} onClick={finalizeProfile}>Finish Setup</button>
            </div>
        </div>
        <img src={OpenledgerLogo} alt="" className='openledger-logo' style={{visibility: 'hidden'}}/>
      </div>
    )

}
