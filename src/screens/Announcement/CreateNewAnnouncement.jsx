import React, {useState, useContext} from 'react'
import {capitalize} from '../../middleware/auth'
import {v4} from 'uuid'
import { SessionContext } from '../../Session'
import '../../styles/create-announcement.css'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'


import {Input} from 'antd'

import PrimaryBorder from '../../components/PrimaryBorder'
import AnnouncementModel from '../../dataModels/AnnouncementModel'
import { uploadImageFireStore } from '../../query/firebaseImageUpload'

const {TextArea} = Input

export default function CreateNewAnnouncement(props) {
  const changeSessionData = useContext(SessionContext).changeSessionData

  const annRefresh = props.annUpdate
  
  const [announcement, setAnnouncement] = useState(new AnnouncementModel({}))
  const [postImage, setPostImage] = useState(null)

  // Check whether at least one filed is available before upload
  // Announcement is proceed
  const postAnnouncement = async () => {
    changeSessionData({processing: true}) // Overly processing
    if(postImage !== null || announcement.getCaption().length > 0) {
      // Image upload 
      if(postImage !== null){
        announcement.setImageLink(await uploadImageFireStore(postImage, `announcement/${v4().slice(0, 20)}`))
      }

      const res = await announcement.createNewAnnouncement()
      if(res) {
        if(res.proceed) {
          // Announcement posted 
          toast.custom(<ToastCustom type='success' header='Announcement Posted'>Your announcement posted successfully.</ToastCustom>);
          props.setFormState(false)
        } else {
          // Announcement error
          toast.custom(<ToastCustom type='error' header='Announcement unsuccessful'>Your announcement did not proceed.</ToastCustom>);
        }
      } else {
        // Network error post failed
        toast.custom(<ToastCustom type='error' header='Network Error'>You have encountered a technical error.</ToastCustom>);
      }
        
    } else {
      // Empty announcement form
      toast.custom(<ToastCustom type='warnning' header='Missing values'>Please fill all the missing field.</ToastCustom>);
    }

    annRefresh.setUpdate(!annRefresh.announcementUpdate)
    changeSessionData({processing: false})
  }

  return (
    <div className='announcement-form'>
      <h2>CREATE NEW ANNOUNCEMENT</h2>

      <div className="zipper">
        <label htmlFor="">Post Caption</label>
        <PrimaryBorder borderRadius='6px'>
          <TextArea type='text' rows='4' onChange={(e) => {
            announcement.setCaption(capitalize(e.target.value))
            setAnnouncement(new AnnouncementModel(announcement.extractJSON()))
          }}/>
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
          <button onClick={postAnnouncement}>POST</button>
        </PrimaryBorder>

        <PrimaryBorder borderRadius='10px' width='fit-content' margin='0 10px'>
          <button style={{backgroundColor: 'red'}} onClick={() =>props.setFormState(false)}>DISCARD</button>
        </PrimaryBorder>
        
      </div>
      
    </div>
  )
}
