import React from 'react'
import {motion} from 'framer-motion'

export default function SinglePayment(props) {
    const payment = props.payment

  return (
    <motion.div className='single-payment'
        initial={{scale: 0}}
        animate={{scale: 1, transition: {delay: 0.1 + props.delay*0.2, duration: 0.5}}}
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
            <h3 className='amount'>LKR {payment.getAmount()}</h3>
        </div>
    </motion.div>
  )
}
