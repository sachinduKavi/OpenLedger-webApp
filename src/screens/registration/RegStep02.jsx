import React, {useState} from 'react'

import {motion} from 'framer-motion'
import {Input} from 'antd'
import {emailValidation} from '../../query/UserRegistrationQuery'

import {verificationCode} from '../../query/UserRegistrationQuery'

import '../../styles/enter-code.css'
import MobileImage from '../../assets/images/verify.png'
import OpenledgerLogo from '../../assets/OpenLedger.png'


export default function EmailCode(props) {
  const parentContext = props.parentContext

  // Input values 
  const [para01, setpara01] = useState('')
  const [para02, setpara02] = useState('')
  const [para03, setpara03] = useState('')
  const [para04, setpara04] = useState('')

  // Resend email to the email address
  async function resendCode(user_email) {
    parentContext.processTrigger(true) // Processing screen
    const res = await verificationCode(user_email)
    const isCodeSend = res.data, statusCode = res.statusCode

    if(statusCode == 200 && isCodeSend) {
        // Email successfully delivered 
        parentContext.displayMessage("messageDeliverySuccess")
        // parentContext.state.currentUserEmail 
    } else {
        // Network Error please check your internet connection !
    }
    // Hide process circle
    parentContext.processTrigger(false)
  }

  function numberChnage(e) {
    switch(e.target.id) {
      case 'pin0':
        setpara01(e.target.value)
        break
      case 'pin1':
        setpara02(e.target.value)
        break
      case 'pin2':
        setpara03(e.target.value)
        break
      case 'pin3':
        setpara04(e.target.value)
        break
    }
  }

  // check pin number
  async function onPinSubmission() {
    parentContext.messageKiller()
    parentContext.processTrigger(true)
    const enteredPin = para01.toString() + para02.toString() + para03.toString() + para04.toString()
    console.log(enteredPin)
    const res = await emailValidation(parentContext.state.currentUserEmail, enteredPin)
    parentContext.processTrigger(false)
    if(res.validity && res.statusCode == 200) {
      // Code match & no errors
      parentContext.displayMessage('setUpProfile')
      parentContext.nextReg(2)
    } else {
      // Code dose not match
      parentContext.displayMessage('codeNotMatch')
    }
  }


  return (
    <div>
    <div className='container2'>

      <div className="inside">
        <h2>Verify Email</h2>

        <div className='image-border'>
          <motion.img src={MobileImage} alt="mobile pic" width={130}
            whileHover={{scale: 1.2}}
            transition={{ duration: 0.2, yoyo:10}}      
          />
        </div>

        

        <h3>Enter your OTP code</h3>

        <div className='para-border'>
          <p>We sent a verification code to {parentContext.state.currentUserEmail}</p>
        </div>
        

        <div className="pin-border">
          <Input className='input-pin' id='pin0' maxLength={1} onChange={numberChnage} value={para01}/>
          <Input className='input-pin' id='pin1' maxLength={1} onChange={numberChnage} value={para02}/>
          <Input className='input-pin' id='pin2' maxLength={1} onChange={numberChnage} value={para03}/>
          <Input className='input-pin' id='pin3' maxLength={1} onChange={numberChnage} value={para04}/>
          
        </div>

        <p className='di-receive'>Didn't receive? <a onClick={() => {resendCode(parentContext.state.currentUserEmail)}}>Resend OTP</a></p>

      </div>

      <button className='classic-btn' onClick={onPinSubmission}>Verify</button>
      
    </div>
    <img src={OpenledgerLogo} alt="" className='openledger-logo'/>
    </div>
  )
}
