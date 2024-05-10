import React, {useRef, useState, useContext} from 'react'

import '../../styles/new-treasury.css'

import {Input, Switch} from 'antd'
import {easeIn, motion} from 'framer-motion'
import {v4} from 'uuid'

import {uploadImageFireStore} from '../../query/firebaseImageUpload'

import PrimaryBorder from '../PrimaryBorder'

import DefaultUpload from '../../assets/icons/upload.png'
import { green } from '@cloudinary/url-gen/actions/adjust'
import Treasury from '../../dataModels/Treasury'
import { SessionContext } from '../../Session'


export default function TreasuryNew(props) {
  const sessionContext = useContext(SessionContext)

  const coverImageRef = useRef(null)
  const [imageFile, selectImage] = useState(null) 

  // Input values from the create new treasury form
  const[inputValues, changeInputValues] = useState({
    treasuryName: null,
    description: null,
    publicTreasury: true,
    memberLimit: 100 // default member limit of the system is 100
  })

  // Toggle the state when user change group public or private
  const toggleChange = (e) => {
    changeInputValues({...inputValues, publicTreasury: e})
  }  

  // Create new treasury step 01 button click
  // User click on data create treasury button
  const createNewTreasurySubmission = async () => {
    props.parentContext.processTrigger(true) // Display process loading

    // Generate a random name for the image
    const treasuryImageID = v4().slice(0, 20)
    const pictureName = (inputValues.treasuryName.toString().replace(" ", "_")) + treasuryImageID
    // Upload image to the fire store
    let imageDownloadLink = null
    if(imageFile != null) imageDownloadLink = await uploadImageFireStore(imageFile, `treasuryCover/${pictureName}`)

    // Create new treasury instant
    const treasury = new Treasury({
        treasuryName: inputValues.treasuryName,
        description: inputValues.description,
        memberLimit: inputValues.memberLimit,
        coverImageLink: imageDownloadLink,
        publicTreasury: inputValues.publicTreasury,
        ownerID: props.parentContext.userDetails.user_ID
      })

    const res = await treasury.sendDataToBackend() // Post data to the backend
    console.log('response', res)
    props.parentContext.processTrigger(false) // Hide process loading
  }
  
  return (
  
    <div className='overlay'>

        <div className="blur-page"></div>
      
        <motion.div className='newForm'
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{duration:0.05, type:easeIn}}
        >


          <h2>CREATE NEW TREASURY</h2>

          
          <div className="row">
            <div className="cell">
                <h5 className='input-label'>Treasury Name: </h5>
                <PrimaryBorder borderRadius='6px'>
                  <Input className='input-box' type='text' onChange={(e) => changeInputValues({...inputValues, treasuryName:e.target.value})}/>
                </PrimaryBorder>

                <h5 className="input-label">Description:</h5>
                <PrimaryBorder borderRadius='6px'>
                  <Input.TextArea className='input-box' type='text'
                    onChange={(e) => changeInputValues({...inputValues, description:e.target.value})}
                    rows={6}
                    />
                </PrimaryBorder>

                <h5 className="input-label">Members Limit:</h5>
                <PrimaryBorder borderRadius='6px'>
                  <Input type='number' className='input-box' style={{minWidth:3}} value={100}
                    onChange={(e) => changeInputValues({...inputValues, memberLimit:e.target.value})}
                  />
                </PrimaryBorder>

            </div>


            <div className="cell">
              <h5 className="input-label">Upload Cover Photo:</h5>
              <PrimaryBorder borderRadius='6px'>
                <div className="upload-cover" onClick={() => {coverImageRef.current.click()}}>
                  {(imageFile == null)
                  ? <img src={DefaultUpload} alt="uploadImage" />
                  : <img src={URL.createObjectURL(imageFile)} alt='uploadImage' width='100%'/>
                }
                </div>
              </PrimaryBorder>

              <input type="file" accept='image/*' ref={coverImageRef} onChange={(e) => selectImage(e.target.files[0])}/>

              <div className="toggle">
                <p className="into">Define whether your treasury is Private or Public organization</p>
                
                {/* Public Private Switch */}
                <div className="switch">
                  <Switch onChange={toggleChange} value={inputValues.publicTreasury}/> 

                  {/* Public Private placeholder */}
                  {inputValues.publicTreasury?<h5 style={{color:'#95F1AF'}}>Public</h5>: <h5 style={{color:'#F45C56'}}>Private</h5>}
                </div>
                
              </div>

              
            </div>
            
          </div>

          <div className="row button-row" style={{justifyContent:'flex-end', marginTop:'100px'}}>

              <button className='cancel-btn' onClick={props.close}>Cancel</button>
          
              <button type='primary' onClick={createNewTreasurySubmission} className='create-btn'>Create Treasury</button>
    
            
          </div>

          
        </motion.div>
    </div>

    
  )
}
