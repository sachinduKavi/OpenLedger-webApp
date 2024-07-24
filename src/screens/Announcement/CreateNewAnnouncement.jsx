import React, {useState} from 'react'
import '../../styles/create-announcement.css'


import {Input} from 'antd'

import PrimaryBorder from '../../components/PrimaryBorder'

const {TextArea} = Input

export default function CreateNewAnnouncement() {
  
  const [postImage, setPostImage] = useState(null)

  return (
    <div className='announcement-form'>
      <h2>CREATE NEW ANNOUNCEMENT</h2>

      <div className="zipper">
        <label htmlFor="">Post Caption</label>
        <PrimaryBorder borderRadius='6px'>
          <TextArea type='text' rows='4'/>
        </PrimaryBorder>
        
      </div>

      <div className="zipper">
        <label htmlFor="">Add Image</label>
        <Input type='file' accept='image/*' onChange={(e) => {
          setPostImage(e.target?.files[0] ?? null)
        }}/>
      </div>


      <div className="zipper">
        { postImage !== null &&
        <img src={URL.createObjectURL(postImage)} alt='post-image' width='100%'/>}
      </div>

      <div className="row">
        <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 10px'>
          <button>POST</button>
        </PrimaryBorder>

        <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 10px'>
          <button style={{backgroundColor: 'red'}}>DISCARD</button>
        </PrimaryBorder>
        
      </div>
      
    </div>
  )
}
