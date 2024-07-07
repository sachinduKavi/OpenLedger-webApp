import React, {useEffect} from 'react'
import '../styles/user-card.css'

import EditIcon from  '../assets/icons/Edit.png'
import DisplayPicture from './DisplayPicture'


export default function UserCardInfo(props) {
const userID = props.userID


// Loading use data from the backend
const loadUserDetails = async () => {
    console.log('loading user details')
}



useEffect(() => {
    loadUserDetails()
}, [])



// Editor mode variable
const EditorMode = props.editorMode ?? false

  return (
    <div className='user-profile-card'>
            <div className="user-content">
                <h1>Nipuni Nawanjana</h1>
                <div className="content-box">
                    <div className="user-profile">
                        
                        {/* DP image component */}
                        <div className="profile-pic">
                            <DisplayPicture width={'100px'}/>
                        </div>
                        

                        <div className="user-about">
                            <h4>About Me<img src={EditIcon} style={{visibility: (EditorMode? 'visible': 'hidden')}} /></h4>
                            <p>Single Room: Designed for one person, typically with one twin or single bed.
                                usually with three twin beds or one double bed and one twin bed.
                            </p>
                        </div>
                    </div>

                    <div className="input-field">
                        <span>User Name : <img src={EditIcon} style={{visibility: (EditorMode? 'visible': 'hidden')}} /></span>
                        <input type="text" />

                        <span>Phone Number : <img src={EditIcon} style={{visibility: (EditorMode? 'visible': 'hidden')}} /></span>
                        <input type="text" />

                        <span>Email Address : <img src={EditIcon} style={{visibility: (EditorMode? 'visible': 'hidden')}} /></span>
                        <input type="email" />

                        <button className='change-psw'>Change Password</button>
                    </div>
                </div>


                <div className="content-box2">
                    <div className="sign">
                        <h3>Signature:<img src={EditIcon} style={{visibility: (EditorMode? 'visible': 'hidden')}} /></h3>
                        <div className="description">
                            <h5>Nipuni Nawanjana</h5>
                            <h5>Senior Software Engineer</h5>
                            <h5>ROOTCODE PVT</h5>
                        </div>
                    </div>


                    <div className="sign">
                        

                        <button className='save'>Save</button>
                    </div>

                </div>
            </div>
        </div>
  )
}
