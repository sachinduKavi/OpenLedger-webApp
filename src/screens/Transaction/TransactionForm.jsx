import React, {useState, useEffect} from 'react'
import {Input, Switch} from 'antd'
const {TextArea} = Input
import PayHerePayment from '../../components/PayHerePayment'
import {capitalize} from '../../middleware/auth'
import PrimaryBorder from '../../components/PrimaryBorder'

import '../../styles/transaction-form.css'
import Payment from '../../dataModels/Payment'

export default function TransactionForm(props) {
    const payment = props.payment.currentPayment
    const setCurrentPayment = props.payment.setCurrentPayment
    const activeUser = props.activeUser


    const [methodState, setMethodState] = useState(true)  // Transaction method

    const [transactionReady, setTransactionReady] = useState(false)

    // const [transactionValues, setValues] = useState({
    //     amount: 0,
    //     reference: "",
    //     transactionMethod: methodState,
    //     note: "",
    //     evidence: null
    // })


    const checkTransactionReady = () => {
        if(payment?.getAmount() > 0 && payment?.getReference().length > 0) 
            setTransactionReady(true)
    }


    // Transaction proceed 
    const transactionProceed = async () => {
        console.log(transactionValues)
    }



  return (
    <div className='transaction-form'>
        <h2>TRANSACTION</h2>

        <div className="mini-row">
            <div className="column" style={{flex: '0 0 calc(35%)'}}>
                <label htmlFor="">Amount</label>
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

            <div className="column service-charge" style={{display: methodState ? 'flex' : 'none'}}>
                <p>+3% Service<br/>Charge</p>
            </div>

            <div className="column">
                <p>= {methodState?Number(payment.getAmount()*1.03).toFixed(2): payment.getAmount()}/-</p>
            </div>
            
        </div>


        <div className="mini-row">
            <div className="column" style={{flex: '0 0 calc(50%)'}}>
                <label htmlFor="">Reference</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input type='text' 
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
                            value={methodState}
                            onChange={(e) => {
                                setMethodState(e)
                                checkTransactionReady()
                            }}
                        />
                    </div>
                    
                    <p className='transaction-method'>{methodState? 'PAYMENT GATEWAY': 'BANK TRANSACTION'}</p>
                </div>

            </div>
        </div>

        <div className="mini-row">
            <div className="column">
                <label htmlFor="">**Note</label>
                <PrimaryBorder borderRadius='6px'>
                    <TextArea rows={3}
                        value={payment.getNote()}
                        onChange={(e) => {
                            payment.setNote(capitalize(e.target.value))
                            setCurrentPayment(new Payment(payment.extractJSON()))
                        }}
                    />
                </PrimaryBorder>
                
            </div>

        </div>


        <div className="mini-row" style={{visibility: methodState ? 'hidden': 'visible'}}>
            <div className="column">
                <label htmlFor="">Evidence</label>
                <Input rows={3} type='file'/>
            </div>

        </div>

        <div className="mini-row">
            <PrimaryBorder borderRadius='6px'>
                {/* <button onClick={transactionProceed}>PROCEED</button> */}
                <PayHerePayment transactionReady={transactionReady} payment={payment} user={activeUser}/>
            </PrimaryBorder>
        </div>
        
    </div>


    
  )
}
