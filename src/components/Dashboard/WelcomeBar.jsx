import React from 'react'
import {motion} from 'framer-motion'

import SimpleDP from '../SimpleDP'


import '../../styles/welcomeComp.css'

import MenuImage from '../../assets/icons/menu.png'

export default function WelcomeBar(props) {
    console.log('image link', props.dp)
  return (
    <motion.div className="welcome-container"
        initial={{y:-110}}
        animate={{y:0}}
        transition={{duration: 0.3}}
    >
        <div className="welcome">
            <div className="welcome-inner">
                <div>

                    <div className="image-div"><img src={MenuImage} alt="menu button"  width={45}/></div>
                    
                    <p><a>Welcome,</a><br/>{props.userName}</p>
                </div>
            </div>
        </div>


        <div className="account">
            <div className="support">
                <div className="icon">

                </div>

                <p>Support</p>

                
            </div>

            
            <SimpleDP imageLink={null} size={50}/>
            
        
        </div>
    </motion.div>
  )
}
