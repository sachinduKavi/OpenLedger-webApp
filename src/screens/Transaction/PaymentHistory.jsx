import React, {useEffect, useState} from 'react'
import SinglePayment from './SinglePayment'
import Payment from '../../dataModels/Payment'
import toast from 'react-hot-toast'
import ToastCustom from '../../components/ToastCustom'

import '../../styles/payment-history.css'

export default function PaymentHistory(props) {

    const [paymentArray, setPaymentArray] = useState([])

    // Load payment history of the treasury
    const loadPayment = async () => {
        const payment = new Payment({})
        const res = await payment.loadAllPayments()
        if(res) {
            setPaymentArray(res)
        } else {
            // Error is encounter
            toast.custom(<ToastCustom type='warnning' header='Network Error'>Unable to load payment history.</ToastCustom>);
        }
    }

    useEffect(() => {
        loadPayment()
    }, [props.update])


  return (
    <div className='payment-history'>
        
        {
            paymentArray.map((element, index) => {
                return (<SinglePayment key={index} payment={element} delay={index}
                    setReceiptState={props.setReceiptState} setPayment={props.setPayment}
                />)
            })
        }
    </div>
  )
}
