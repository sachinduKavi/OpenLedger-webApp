import React, { useEffect, useState, useRef } from 'react'
import '../styles/user-card.css'

import EditIcon from '../assets/icons/Edit.png'
import DisplayPicture from './DisplayPicture'

import ChangePassword from './changePassword'


export default function UserCardInfo(props) {
    const userID = props.userID

    const [changePassForm, setChangePassState] = useState(false) // Form state


    // Loading use data from the backend
    const loadUserDetails = async () => {
        console.log('loading user details')
    }

    
    const changePassRef = useRef()
    // Receipt will disappear when user click outside the container
    const receiptContainer = (e) => {
        console.log(e, changePassForm && !changePassRef.current?.contains(e.target), changePassForm)
        if(changePassForm && !changePassRef.current?.contains(e.target)) {
            setChangePassState(false)
        }
    }


    useEffect(() => {
    
        document.addEventListener("mousedown", receiptContainer)
    
        return(()=> {
          document.removeEventListener("mousedown", receiptContainer)
        })
    })



    useEffect(() => {
        loadUserDetails()
    }, [])



    // Editor mode variable
    const EditorMode = props.editorMode ?? false

    return (
        <div className='user-profile-card' ref={changePassRef}>
            
            <div className="user-content">
            <div className="whole-container">
                <div className="user-content-header">
                    <div className="user-content-header-name">
                        <h3 className='user-name'>Nipunee Nawanjana</h3>
                        <img src={EditIcon} alt="" />
                    </div>

                    <div className='user-content-header-btn'>
                        <button>SAVE</button>
                    </div>
                </div>


                <div className="user-content-details">
                    <div className="user-content-profile">
                        {/* DP image component */}
                        <div className="profile-pic">
                            <DisplayPicture width={'100px'} />
                        </div>
                        <div className="profile-email">
                            <p>sachindu38@gmail.com</p>
                        </div>

                        <div className="profile-content">
                            <p className='mobile-num'> Mobile Number</p>
                            <p className='number'>076837465  <img src={EditIcon} alt="" /></p>
                        </div>

                        <div className="profile-btn">
                            <button onClick={() => setChangePassState(true)}>CHANGE PASSWORD</button>
                        </div>
                    </div>

                    <div className="user-content-description">
                        <div className="user-content-description-about">
                            <h3>About Me<img src={EditIcon} alt="" /></h3>
                            <p>
                                Computer Science & Technology undergraduate
                                student at Uva Wellassa University with a passion
                                for frontend & backend development. Proficient in
                                React, Node.js, and Flutter. Eager to apply academic
                                knowledge and practical skills to create impactful
                                web & mobile experiences.
                            </p>
                        </div>

                        <div className="user-content-description-signature">
                            <h5>Signature:</h5>
                            <div className="signature-box">
                                <h4>SACHINDU KAVISHKA</h4>
                                <h4>SENIOR SOFTWARE ENGINEER</h4>
                                <h4>ROOTCODE PVT.</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {changePassForm && <ChangePassword/>}

            </div>

            </div>
        </div>


    )
}
