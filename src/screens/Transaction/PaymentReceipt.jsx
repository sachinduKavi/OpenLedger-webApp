import React, {useContext} from 'react'
import {SessionContext} from '../../Session'
import Payment from '../../dataModels/Payment'

import '../../styles/payment-receipt.css'

export default function PaymentReceipt(props) {
  const changeSessionData = useContext(SessionContext).changeSessionData
  const payment = props.payment
  const incrementGate = payment.getStatus() === 'PENDING' || payment.getStatus() === 'REJECTED'
  const decrementGate = payment.getStatus() === 'VERIFIED'

  console.log(payment)

  // Payment state modification 
  const stateModification = async (modiStatus) => {
      changeSessionData({processing: true}) // Processing 
      payment.setStatus(modiStatus)
      let res
      if(decrementGate) {
        // Decrement treasury balance 
        await payment.decrementStatus()
      } else if(incrementGate && modiStatus === 'VERIFIED') {
        // Increment the treasury balance
        console.log('Verified payment', payment.extractJSON())
        await payment.paymentApproved()
      } else if(incrementGate) {
        // Change status treasury balance in neutral 
        await payment.paymentUpdate()
      }

      props.setPayment(new Payment(payment.extractJSON()))
      props.setUpdate(!props.update)
      changeSessionData({processing: false}) // Processing 
  }


  return (
    <div className='payment-receipt-cover'>

      <div className="background-blur"></div>

      <div className="payment-receipt" ref={props.receiptRef}>
        <h2 className='heading'>PAYMENT RECEIPT</h2>

        <div className="scroll-container">
          <div className="row">
            <div className="column col-name">Date</div>
            <div className="column col-data">: {payment.getDate()}</div>
          </div>

          <div className="row">
            <div className="column col-name">Payment ID</div>
            <div className="column col-data">: {payment.getPaymentID()}</div>
          </div>

          <div className="row">
            <div className="column col-name">Name</div>
            <div className="column col-data">: {payment.getUserName()}</div>
          </div>

          <div className="row">
            <div className="column col-name">Reference</div>
            <div className="column col-data">: {payment.getReference()}</div>
          </div>

          <div className="row">
            <div className="column col-name">Payment Status</div>
            <div className="column col-data">: {payment.getStatus()}</div>
          </div>

          <div className="row">
            <div className="column col-name">Payment Method</div>
            <div className="column col-data">: {payment.getOnlinePayment() ? "PAYMENT GATEWAY": "BANK TRANSFER"}</div>
          </div>

          <div className="row">
            <div className="column col-name">Amount</div>
            <div className="column col-data">: LKR {payment.getAmount()}</div>
          </div>

          <div className="amount-detail row">
            <div className="column">Service Charge</div>
            <div className="column">: {(payment.getAmount()*0.033).toFixed(2)}</div>
          </div>

          <div className="amount-detail row">
            <div className="column">Total Amount</div>
            <div className="column">: {(payment.getAmount()*1.033).toFixed(2)}</div>
          </div>

          <div className="row">
            <div className="column col-name">Note**</div>
          </div>

          <div className="row">
            <div className="column col-data">{payment.getNote()}</div>
          </div>

          { !payment.getOnlinePayment() ?
            <div className="payment-proof" >
              <div className="row">
                <div className="column col-name">Payment Proof:</div>
              </div>

              <div className="row img-proof">
                <img src={payment.getEvidence()} alt="payment-proof" width="100%"/>
              </div>
            </div> : null
            }
          
          {
            props.activeUser.getUserLevel() > 2 &&
            <div className="row state-btn">
            {payment.getStatus() !== 'VERIFIED' && <h4 style={{cursor: 'pointer',color: "green"}}
              onClick={() => stateModification("VERIFIED")}
            >APPROVE</h4>}
            {payment.getStatus() !== 'PENDING' && <h4 style={{cursor: 'pointer',color: "#FFA43C"}} 
                onClick={() => stateModification("PENDING")}
            >PENDING</h4>}
            {payment.getStatus() !== 'REJECTED' && <h4 style={{cursor: 'pointer',color: "#EA4335"}}
                onClick={() => stateModification("REJECTED")}
            >REJECT</h4>}
          </div>}

        </div>

      </div>

    </div>
  )
}
