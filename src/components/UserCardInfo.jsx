import React, { useEffect, useState, useRef } from 'react'
import '../styles/user-card.css'

import { getUserDetail, updateUserQuery } from '../query/userQuery'
import {Input} from 'antd'
import EditIcon from '../assets/icons/Edit.png'
import DisplayPicture from './DisplayPicture'
import SimpleDP from './SimpleDP'
import ChangePassword from './changePassword'
import toast from 'react-hot-toast'
import ToastCustom from './ToastCustom'


export default function UserCardInfo(props) {
    const userID = props.userID || 'US00000000000000'
    const activeUser = props.activeUser

    const localUserDetails = JSON.parse(localStorage.getItem('userDetails'))
    

    const [changePassForm, setChangePassState] = useState(false) // Form state
    const [userDetails, setUserDetails] = useState({
        userName: "",
        dpLink: "",
        userID: "",
        userEmail: "",
        aboutMe: "",
        mobileNumber: "",
        userSignature: "",

    })

    // Loading use data from the backend
    const loadUserDetails = async () => {
        const response = await getUserDetail(userID)
        console.log(response)
        if(response.status === 200 && response.data.proceed) {
            setUserDetails(response.data.content)
        }
    }


    // Finalize and submit updated user details
    const updateSubmission = async () => {
        console.log(JSON.stringify(userDetails))
        const response = await updateUserQuery(userDetails)
        if(response.status === 200 && response.data.proceed) {
            console.log('success')
            toast.custom(<ToastCustom type='success' header='Account updated'>Your account updated successfully.</ToastCustom>);
        } else {
            // Request failed
            toast.custom(<ToastCustom type='error' header='Something went wrong'>Update was unsuccessful, please try again later.</ToastCustom>);
        }
    }

    // Component did mount ?
    useEffect(() => {
        loadUserDetails()
    }, [])

    
    const changePassRef = useRef()
    // Receipt will disappear when user click outside the container
    const receiptContainer = (e) => {
        console.log(e)
        console.log(changePassRef.current)
    }


    useEffect(() => {
        document.addEventListener("mousedown", receiptContainer)
    
        return(()=> {
          document.removeEventListener("mousedown", receiptContainer)
        })
    }, [])



    // Editor mode variable
    const editorMode = localUserDetails.userID === userDetails.userID

    return (
        <div className='user-profile-card' ref={changePassRef}>
            
            <div className="user-content">
            <div className="whole-container">
                <div className="user-content-header">
                    <div className="user-content-header-name">
                        <h3 className='user-name'>{userDetails.userName}</h3>
                        {/* <img src={EditIcon} alt="" /> */}
                    </div>

                    <div className='user-content-header-btn'>
                        {
                            editorMode && <button onClick={updateSubmission}>SAVE</button>
                        }
                        
                    </div>
                </div>


                <div className="user-content-details">
                    <div className="user-content-profile">
                        {/* DP image component */}
                        {/* <div className="profile-pic"> */}
                            {/* <DisplayPicture width={'100%'} imageRef={userDetails.dpLink}/> */}
                            <SimpleDP imageLink={userDetails.dpLink} imageScale={{x:0, y: 0, scale: 1}} size='80%'/>
                        {/* </div> */}
                        <div className="profile-email">
                            <p>{userDetails.userEmail}</p>
                        </div>

                        <div className="profile-content">
                            <p className='mobile-num'> Mobile Number</p>
                            <Input type="number" value={userDetails.mobileNumber} 
                            disabled={!editorMode}
                            onChange={(e) => {
                                setUserDetails({...userDetails, mobileNumber: e.target.value})
                        
                            }}/>
                        </div>

                        <div className="profile-btn">
                            {
                                editorMode && <button onClick={() => setChangePassState(true)}>CHANGE PASSWORD</button>
                            }
                            
                        </div>
                    </div>

                    <div className="user-content-description">
                        <div className="user-content-description-about">
                            <h3>About Me</h3>
                           
                                <textarea name="" id="" rows={10} style={{width: '100%', padding: '5px'}}
                                disabled={!editorMode}
                                value={userDetails.aboutMe} onChange={(e) => {
                                    setUserDetails({...userDetails, aboutMe: e.target.value})
                                }}>
                                 
                                </textarea>
                  
                        </div>

                        <div className="user-content-description-signature">
                            <h5>Signature:</h5>
                            <div className="signature-box"  style={{width: '100%'}}>
                                <textarea 
                                disabled={!editorMode}
                                onChange={(e) => {
                                    setUserDetails({...userDetails, userSignature: e.target.value})
                                }}
                                rows={5} style={{backgroundColor: 'transparent', border: 0, color: 'black', fontSize: '13px', width: '100%'}} value={userDetails.userSignature}>
                                    
                                </textarea>
                                    
                                
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
