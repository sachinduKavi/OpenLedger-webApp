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
                <div className="column" style={{flex: '0 0 calc(70%)'}}>
                    <h2 style={{fontSize: '1.5vw'}}>{ledgerRecord.getTitle()}</h2>
                    <h4 className="category" style={{color: '#D3D3D3'}}> {ledgerRecord.getCategory()}</h4>
                </div>

                {/* <div className="column" >
                  
                </div> */}

                <div className="column" >
                  <h3 className="amount" style={{color: (amount < 0) ?'#FF0000': '#6CDB9A'}}>LKR {amount.toLocaleString('en-US')}</h3>
                  <p className="date-time">{dateTime[0]}</p>
                </div>
            </div>

            <div className="row">
              <div className="column" style={{flexBasis: 'calc(100%)'}}>
                <p className='description' style={{color: '#e0e0e0'}}>{ledgerRecord.getDescription()}</p>
              </div>
            
             
            </div>
        </div>
    </motion.div>
  )
}
