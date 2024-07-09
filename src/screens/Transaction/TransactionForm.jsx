import React, {useState, useEffect} from 'react'
import {Input, Switch} from 'antd'
const {TextArea} = Input

import PrimaryBorder from '../../components/PrimaryBorder'

import '../../styles/transaction-form.css'

export default function TransactionForm() {

    const [methodState, setMethodState] = useState(true)  // Transaction method

    const [transactionValues, setValues] = useState({
        amount: 0,
        reference: "",
        transactionMethod: methodState,
        note: "",
        evidence: null
    })



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
                    <Input type='number' onChange={(e) => {
                        setValues({...transactionValues, amount: e.target.value})
                    }}/>
                </PrimaryBorder>                
            </div>

            <div className="column service-charge" style={{display: methodState ? 'flex' : 'none'}}>
                <p>+3% Service<br/>Charge</p>
            </div>

            <div className="column">
                <p>= {methodState?Number(transactionValues.amount*1.03).toFixed(2): transactionValues.amount}/-</p>
            </div>
            
        </div>


        <div className="mini-row">
            <div className="column" style={{flex: '0 0 calc(50%)'}}>
                <label htmlFor="">Reference</label>
                <PrimaryBorder borderRadius='6px'>
                    <Input type='text' 
                    value={transactionValues.reference}
                    onChange={(e) => {
                        setValues({...transactionValues, reference: e.target.value.toUpperCase()})
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
                            }}
                        />
                    </div>
                    
                    <p className='transaction-method'>{methodState? 'PAYMENT GATEWAY': 'BANK TRANSACTION'}</p>
                </div>

            </div>
        </div>

        <div className="mini-row">
            <div className="column">
                <PrimaryBorder borderRadius='6px'>
                    <TextArea rows={3}
                        onChange={(e) => {
                            setValues({...transactionValues, note: e.target.value})
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
                <button onClick={transactionProceed}>PROCEED</button>
            </PrimaryBorder>
        </div>
        
    </div>


    
  )
}
