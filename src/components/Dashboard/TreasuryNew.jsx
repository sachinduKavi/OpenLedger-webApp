import React, {useRef, useState} from 'react'

import '../../styles/new-treasury.css'

import {Input, Button} from 'antd'
import {easeIn, motion} from 'framer-motion'

import PrimaryBorder from '../PrimaryBorder'

import DefaultUpload from '../../assets/icons/upload.png'


export default function TreasuryNew(props) {

  const coverImageRef = useRef(null)
  const [imageFile, selectImage] = useState(null) // 

  // Input values from the create new treasury form
  const[inputValues, changeInputValues] = useState({
    treasuryName: null,
    description: null,
    memberLimit: 100 // default member limit of the system is 100
  })

  // On Create treasury group 
  const dataSubmission = () => {
    console.log('values: ', inputValues)
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
            </div>
            
          </div>

          <div className="row button-row" style={{justifyContent:'flex-end', marginTop:'100px'}}>

              <button className='cancel-btn' onClick={props.close}>Cancel</button>
          
              <button type='primary' onClick={dataSubmission} className='create-btn'>Create Treasury</button>
    
            
          </div>

          
        </motion.div>
    </div>

    
  )
}
