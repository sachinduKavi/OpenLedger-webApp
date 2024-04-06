import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'antd'
import { verificationCode } from '../query/UserRegistrationQuery'

import { emailRegex } from '../middleware/FormatChecker'

import OpenledgerLogo from '../assets/OpenLedger.png'
import Agreement from '../components/agreement'

export default class RegisterEmail extends Component {
    constructor(props) {
        super(props)
        this.parentContext = props.parentContext 
        this.state = {
            passwordState: '',
            emailState: '',
            checkBoxState: true,
            email:'',
            password: '',
            rePassword: ''
        }

    }

    stateChangeFn = () => {
        console.log(this.state.error)
        this.setState({
            checkBoxState: !this.state.checkBoxState
        }) 
    }

    formValueChange = (e) => {
        if(e.target.id == 'email') {
            this.setState({email: e.target.value})
        } else if (e.target.id == 'password') {
            this.setState({password: e.target.value})
        } else if (e.target.id == 'password2') {
            this.setState({rePassword: e.target.value})
        }
        
    }

    // Step 02 of user registration
    // Email is send to api
    sendCode = async (user_email) => {
        const res = await verificationCode(user_email)
        const isCodeSend = res.data, statusCode = res.statusCode

        if(statusCode == 200 && isCodeSend) {
            // Email successfully delivered 
            this.parentContext.displayMessage("messageDeliverySuccess")
            this.parentContext.nextReg(1, {email: user_email, password: this.state.password})

        } else {
            // Network Error please check your internet connection !
        }
        // Hide process circle
        this.parentContext.processTrigger(false)
    }


    // Step 01 of registration
    // Email and passwords formats are checked 
    completeRegistration = () => {
        console.log('Complete Registration')
        if(this.state.password === this.state.rePassword) {
            // Passwords match
            if(emailRegex(this.state.email)) {
                // Activating process circle
                this.parentContext.processTrigger(true)

                console.log('email is valid email')
                this.sendCode(this.state.email)
            } else {
                // Email is not a valid email
                this.parentContext.displayMessage("emailFormatInvalid")
                this.setState({emailState: 'error'})
            }

        } else {
            // Passwords dose not match
            this.parentContext.displayMessage("passwordNotMatch")
            this.setState({passwordState: 'error'})
        }
    }

    render() {
        return (
            <div>
                <h2>Register</h2>

                <div className='account-dont'>Already have an account? <Link to='/login'>Login</Link></div>

                <div className='fields'>
                    <Input placeholder='Email'  id='email' value={this.state.email} onChange={this.formValueChange} status={this.state.emailState}/>

                    <Input placeholder='Password' type='password' id='password' value={this.state.password} onChange={this.formValueChange} status={this.state.passwordState}/>

                    <Input placeholder='Re-enter password' type='password' id='password2' value={this.state.rePassword} onChange={this.formValueChange} status={this.state.passwordState}/>

                    <Agreement changeFn={this.stateChangeFn}/>

                    <button disabled={this.state.checkBoxState} onClick={this.completeRegistration}>Register</button>                


                
                </div>
                <img src={OpenledgerLogo} alt="" className='openledger-logo'/>
            </div>
        )
    }
}
