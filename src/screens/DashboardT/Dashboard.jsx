import React from 'react'

import {Button} from 'antd'
import '../../styles/dashboard-t.css'
import {motion} from 'framer-motion'
import ShareIcon from '../../assets/icons/Share.png'

import PrimaryBorder from '../../components/PrimaryBorder'

export default function Dashboard(props) {
  return (
    <motion.div className='treasury-dashboard'
        initial={{x: 1500}}
        animate={{x: 0, transition: {duration: 0.3}}}
    >
        <div className="column" style={{flexGrow: 3}}>

            <div className="card-container">
                <PrimaryBorder borderRadius={26}>
                    <div className="treasury-card" style={{backgroundImage: `url(${props.treasuryObj.getCoverImageID()})`,
                        backgroundSize: 'cover'
                    }}></div>
                </PrimaryBorder>

                <div className="card-overlay">
                    <h1>{props.treasuryObj.getTreasuryName()}</h1>
                    <p>{props.treasuryObj.getDescription()}</p>

                    <div>
                        <h2>{props.treasuryObj.getTreasuryID()}</h2>

                        <img src={ShareIcon} alt="share-icon" />
                    </div>
                </div>
            </div>

        </div>

        <div className="column" style={{flexGrow: 2}}>

        </div>
    </motion.div>
  )
}
