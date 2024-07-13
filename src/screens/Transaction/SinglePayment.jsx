import React, {useState} from 'react'
import {motion} from 'framer-motion'
import Payment from '../../dataModels/Payment'

export default function SinglePayment(props) {
    const payment = props.payment
    const [delayTime, setDelay] = useState(props.delay)
  return (
    // Fix this issue
    <motion.div className='single-payment'
        initial={{scale: 0}}
        animate={{scale: 1, transition: {delay: 0.1 + delayTime*0.2, duration: 0.5}}}
        whileTap={{scale: 0.95, transition: {duration: 0.1, delay: 0}}}
        transition={{delay: 0, duration: 0.1}}
        onClick={() => {
            props.setPayment(new Payment(payment.extractJSON()))
            props.setReceiptState(true)
        }}
    >
        <div className="column column-1">
            <h2 className='reference'>{payment.getReference()}</h2>
            <h4 className='payee'>{payment.getUserName()}</h4>
            <h5 className='date'>{payment.getDate()}</h5>
        </div>


        <div className="column status-column">
            <h3 className="status" style={{color: payment.getStatus() === 'VERIFIED' 
            ? '#27EEBE'
            : payment.getStatus() === 'REJECTED' ? '#EA4335' : '#FFA43C'
            }}>{payment.getStatus()}</h3>

            {
                payment.getOnlinePayment() 
                ? <h5 className='payment-method'>ONLINE PAYMENT</h5>
                : <h5 className='payment-method'>BANK TRANSFER</h5>
            }
            
        </div>

        <div className="column amount-column">
            <h3 className='amount'>LKR {payment.getAmount().toLocaleString('en-US')}</h3>
        </div>
    </motion.div>
  )
}
