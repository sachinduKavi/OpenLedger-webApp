import React from 'react'

import '../../styles/dashboard-t.css'
import {motion} from 'framer-motion'

import PrimaryBorder from '../../components/PrimaryBorder'

export default function Dashboard(props) {
  return (
    <motion.div className='treasury-dashboard'
        initial={{x: 1500}}
        animate={{x: 0, transition: {duration: 0.3}}}
    >
        <div className="column" style={{flexGrow: 3}}>

            <PrimaryBorder borderRadius={26}>
                <div className="treasury-card" style={{backgroundImage: `url(${props.treasuryObj.getCoverImageID()})`,
                    backgroundSize: 'cover'
                }}></div>
            </PrimaryBorder>

            <div className="overlay"></div>
         
            
    
        </div>

        <div className="column" style={{flexGrow: 2}}>

        </div>
    </motion.div>
  )
}
