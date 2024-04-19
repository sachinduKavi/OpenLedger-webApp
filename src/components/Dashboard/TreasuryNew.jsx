import React, {useRef, useState} from 'react'

import '../../styles/new-treasury.css'

import {Input, Button} from 'antd'

import PrimaryBorder from '../PrimaryBorder'

import DefaultUpload from '../../assets/icons/upload.png'

export default function TreasuryNew() {

  const coverImageRef = useRef(null)
  const [imageFile, selectImage] = useState(null) // 

  // Input values from the create new treasury form
  const[inputValues, changeInputValues] = useState({
    treasuryName: null,
    description: null,
    memberLimit: null,
    uploadImage: null
  })

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

                <h5 className="input-label">Members Limit:</h5>
                <PrimaryBorder borderRadius='6px'>
                  <Input type='number' className='input-box' style={{minWidth:3}} value={100}/>
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

          <div className="row button-row">
            <Button type='primary' >Create</Button>
          </div>


          

          

         
          
        </div>
    </div>

    
  )
}
