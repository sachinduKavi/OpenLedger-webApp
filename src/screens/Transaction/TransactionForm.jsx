import React, {useState, useEffect} from 'react'
import {Input, Switch} from 'antd'
const {TextArea} = Input
import toast, {Toaster} from 'react-hot-toast'
import PayHerePayment from '../../components/PayHerePayment'
import {capitalize} from '../../middleware/auth'
import PrimaryBorder from '../../components/PrimaryBorder'
import ToastCustom from '../../components/ToastCustom'

import '../../styles/transaction-form.css'
import Payment from '../../dataModels/Payment'

export default function TransactionForm(props) {
    const payment = props.payment.currentPayment
    const setCurrentPayment = props.payment.setCurrentPayment
    const activeUser = props.activeUser

    // Transaction state that ready from transaction to proceed
    const [transactionReady, setTransactionReady] = useState(false || payment.getFromCollection())

    const checkTransactionReady = () => {
        if(payment?.getAmount() > 0 && payment?.getReference().length > 0) 
            setTransactionReady(true)
    }



    // Payhere payment success 
    const onPaymentSuccess = async () => { 
        payment.setStatus("VERIFIED") 
        if(await payment.successPaymentPayHere()) {
            // Payment completed successfully 
            setCurrentPayment(new Payment({}))
            // Successful message
            toast.custom(<ToastCustom type='success' header='Payment Success'>Your Payment was Successful.</ToastCustom>);
        } else {
            // Payment error contact your merchant admin
            toast.custom(<ToastCustom type='error' header='Payment Failed'>Sorry, Payment was not successful. Please contact your merchant.</ToastCustom>);
        }

        props.setUpdate(!props.update)
     }



    // Transaction proceed 
    const transactionProceed = async () => {
        // Successful message
        toast.custom(<ToastCustom type='error'>Sorry, Payment was not successful. Please contact your merchant.</ToastCustom>);
        console.log('transaction Proceed', payment.extractJSON())
        props.setUpdate(!props.update)
    }



  return (
    <div className='transaction-form'>
        

        <div className="row">
            <h2>TRANSACTION</h2>


        </div>
        

        <div className="mini-row">
            <div className="column" style={{flex: '0 0 calc(35%)'}}>
                <label htmlFor="">Amount LKR</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input type='number' 
                    value={payment.getAmount()}
                    onChange={(e) => {
                        payment.setAmount(Number(e.target.value))
                        setCurrentPayment(new Payment(payment.extractJSON()))
                        checkTransactionReady()
                    }}/>
                </PrimaryBorder>                
            </div>

            <div className="column service-charge" style={{display: payment.getOnlinePayment() ? 'flex' : 'none'}}>
                <p>+3.3% Service<br/>Charge</p>
            </div>

            <div className="column">
                <p>= {payment.getOnlinePayment()? Number(payment.getAmount()*1.033).toFixed(2): payment.getAmount()}/-</p>
            </div>
            
        </div>


        <div className="mini-row">
            <div className="column" style={{flex: '0 0 calc(50%)'}}>
                <label htmlFor="">Reference</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input type='text' 
                    disabled={payment.getFromCollection()}
                    maxLength={20}
                    value={payment.getReference()}
                    onChange={(e) => {
                        payment.setReference((e.target.value).toUpperCase())
                        setCurrentPayment(new Payment(payment.extractJSON()))
                        checkTransactionReady()
                    }}/>
                </PrimaryBorder>                
            </div>

            <div className="column">
                <label htmlFor="">Transaction Method</label>

                <div className="row">
                    <div>
                        <Switch 
                            value={payment.getOnlinePayment()}
                            onChange={(e) => {
                                payment.setOnlinePayment(e)
                                setCurrentPayment(new Payment(payment.extractJSON()))
                            }}
                        />
                    </div>
                    
                    <p className='transaction-method'>{payment.getOnlinePayment()? 'PAYMENT GATEWAY': 'BANK TRANSACTION'}</p>
                </div>

            </div>
        </div>

        <div className="mini-row">
            <div className="column">
                <label htmlFor="">**Note</label>
                <PrimaryBorder borderRadius='6px'>
                    <TextArea rows={3}
                        maxLength={256}
                        value={payment.getNote()}
                        onChange={(e) => {
                            payment.setNote(capitalize(e.target.value))
                            setCurrentPayment(new Payment(payment.extractJSON()))
                        }}
                    />
                </PrimaryBorder>
                
            </div>

        </div>


        <div className="mini-row" style={{visibility: payment.getOnlinePayment() ? 'hidden': 'visible'}}>
            <div className="column">
                <label htmlFor="">Evidence</label>
                <Input rows={3} type='file'/>
            </div>

        </div>

        <div className="mini-row">
            <PrimaryBorder borderRadius='6px'>
                {/* <button onClick={transactionProceed}>PROCEED</button> */}
                <PayHerePayment transactionReady={transactionReady} payment={payment} user={activeUser}
                    success={onPaymentSuccess}
                />
            </PrimaryBorder>

            <button onClick={transactionProceed}>Test Pay</button>
        </div>

        
        
    </div>


    
  )
}
