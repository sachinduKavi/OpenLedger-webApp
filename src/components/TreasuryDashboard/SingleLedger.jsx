import React from 'react'
import {motion} from 'framer-motion'

export default function SingleLedger(props) {
  const ledgerRecord = props.ledgerRecord
  const amount = ledgerRecord.getAmount()
  const dateTime = ledgerRecord.getCreatedDate().split('#')

  const time = dateTime[1].slice(0, 2)


  return (
    <motion.div className='single-ledger-border'
      whileTap={{scale: 0.98, transition: {duration: 0.1}}}
      style={{boxShadow: (amount < 0) ?'0 0 5px #CD5C5C': '0 0 5px #6CDB9A', cursor: 'pointer'}}
      initial={{scale: 0}}
      animate={{scale: 1, transition: {delay: props.keyIndex*0.1, duration: 0.4}}}
    >
        <div className="background"></div>
        <div className="content">
            <div className="row">
                <div className="column content-column">
                    <h2>{ledgerRecord.getTitle()}</h2>
                    <p className='description'>{ledgerRecord.getDescription()}</p>
                </div>

                <div className="column">
                  <h3 className="amount">LKR {amount.toLocaleString('en-US')}</h3>
                  <p className="date-time">{dateTime[0]}</p>
                  <p className="date-time">{dateTime[1]} {(time > 12)? 'PM': 'AM'}</p>
                </div>
            </div>
        </div>
    </motion.div>
  )
}
