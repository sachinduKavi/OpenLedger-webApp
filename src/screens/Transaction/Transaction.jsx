import React, {useState} from 'react'
import {motion} from 'framer-motion'

import TransactionForm from './TransactionForm'
import Payment from '../../dataModels/Payment'
import MyCollections from './MyCollections'

import '../../styles/transaction.css'


export default function Transaction(props) {
  const [currentPayment, setCurrentPayment] = useState(new Payment({}))


  return (
    <motion.div className='panel-outside-border transaction'
      initial={{x: 1500}}
      animate={{x: 0, transition: {duration: 0.3, delay: 0.2}}}
      exit={{y: 1000, transition: {delay: 0.1}}}
    >

      <div className="row">

          <div className="column">

            <div className="mini-column-pay">
              <MyCollections activeUser={props.activeUser} setCurrentPayment={setCurrentPayment}/>
            </div>

            <div className="mini-column-pay">
              <TransactionForm activeUser={props.activeUser} payment={{currentPayment:currentPayment , setCurrentPayment: setCurrentPayment}}/>
            </div>

          </div>




          <div className="column">
          <a href="https://www.payhere.lk" target="_blank"><img src="https://www.payhere.lk/downloads/images/payhere_long_banner_dark.png" alt="PayHere" width="100%"/></a>
          </div>
      </div>




    </motion.div>
  )
}
