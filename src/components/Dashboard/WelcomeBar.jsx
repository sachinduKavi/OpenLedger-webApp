import React from 'react'
import {motion} from 'framer-motion'

import SimpleDP from '../SimpleDP'


import '../../styles/welcomeComp.css'

import MenuImage from '../../assets/logos/olLogo.png'

export default function WelcomeBar(props) {
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
                    
                    <p><a>Welcome,</a><br/>{props.userName}</p>
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

            
            <SimpleDP imageLink={props.imageLink} size={45} imageScale={props.imageScale}/>
            
        
        </div>
    </motion.div>
  )
}
