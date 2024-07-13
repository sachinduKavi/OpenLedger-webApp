import React from 'react'

import '../../styles/payment-receipt.css'

export default function PaymentReceipt(props) {
  const payment = props.payment
  console.log(payment.getEvidence())
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
            !payment.getOnlinePayment() &&
            <div className="row state-btn">
            <h4 style={{cursor: 'pointer',color: "green"}}>APPROVE</h4>
            <h4 style={{cursor: 'pointer',color: "#EA4335"}}>REJECT</h4>
          </div>}

        </div>

      </div>

    </div>
  )
}
