import React from 'react'

export default function SinglePayment() {
  return (
    <div className='single-payment'>
        <div className="column column-1">
            <h2 className='reference'>PAYMENT REFERENCE</h2>
            <h4 className='payee'>Sachindu Kavishka</h4>
            <h5 className='date'>2024-10-07</h5>
        </div>


        <div className="column status-column">
            <h5 className='payment-method'>BANK TRANSFER</h5>
            <h3 className="status">PENDING</h3>
        </div>

        <div className="column amount-column">
            <h3 className='amount'>LKR 27500</h3>
        </div>
    </div>
  )
}
