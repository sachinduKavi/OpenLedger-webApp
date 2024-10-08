import React, {useContext, useEffect} from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import SimpleDP from '../SimpleDP'
import { SessionContext } from '../../Session'


import '../../styles/welcomeComp.css'

import MenuImage from '../../assets/logos/olLogo.png'

export default function WelcomeBar(props) {
    const userDetails = props.userDetails
    const userID = userDetails.userID
    const setUserCard = useContext(SessionContext).setUserCardState
    const navigate = useNavigate()

    // Logout proceed
    const logoutUser = () => {
        console.log('hello user')
        navigate('/login')
    }

   
  return (
    <motion.div className="welcome-container"
        initial={{y:-110}}
        animate={{y:0}}
        transition={{duration: 0.3}}
    >
        <div className="welcome">
            <div className="welcome-inner">
                <div>
                    <div>
                    <div className="image-div"><img src={MenuImage} alt="menu button"  width={50}/></div>
                    
                    <p><a>Welcome,</a><br/>{userDetails.userName}</p>
                    </div>
                    

                    <h4>{props.position}</h4>
                </div>
                
            </div>
        </div>

  
        <div className="account">
            <div className="support">
                <div className="icon" style={{margin:5}}>

                </div>

                <p>Support</p>

                
            </div>

            <div onClick={() => {setUserCard({
                userCardState: true,
                userID: userID,
                logoutFunction: logoutUser
            })}}>
                <div className="user-dp">
                <SimpleDP imageLink={props.imageLink} size={45} imageScale={props.imageScale}/>
                </div>
                
            </div>
            
            
        
        </div>
    </motion.div>
  )
}
