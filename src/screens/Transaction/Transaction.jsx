import React from 'react'
import {motion} from 'framer-motion'

import TransactionForm from './TransactionForm'

import '../../styles/transaction.css'


export default function Transaction() {
  return (
    <motion.div className='panel-outside-border transaction'
      initial={{x: 1500}}
      animate={{x: 0, transition: {duration: 0.3, delay: 0.2}}}
      exit={{y: 1000, transition: {delay: 0.1}}}
    >

      <div className="row">

          <div className="column">

            <div className="mini-column">

            </div>

            <div className="mini-column">
                <TransactionForm/>
            </div>

          </div>




          <div className="column">
            
          </div>
      </div>




    </motion.div>
  )
}
