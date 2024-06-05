import React from 'react'
import {motion} from 'framer-motion'

export default function SingleLedger(props) {
  const ledgerRecord = props.ledgerRecord

  return (
    <motion.div className='single-ledger-border'
      initial={{scale: 0}}
      animate={{scale: 1, transition: {delay: props.keyIndex*0.1, duration: 0.4}}}
    >
        <div className="background"></div>
        <div className="content">
            <div className="row">
                <div className="column">
                    <h2>{ledgerRecord.getTitle()}</h2>
                    <p>{ledgerRecord.getDescription()}</p>
                </div>

                <div className="column">
                  <p className="amount">LKR 54, 4052</p>
                  <p className="date-time">11.56PM 2024/05/26</p>
                </div>
            </div>
        </div>
    </motion.div>
  )
}
