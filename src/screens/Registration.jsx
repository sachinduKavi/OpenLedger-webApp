import '../styles/login-style.css'
import '../styles/register.css'

import React, { Component } from 'react'
import {Navigate} from 'react-router-dom'
import {motion, AnimatePresence} from 'framer-motion'

import {userRegistration} from '../query/UserRegistrationQuery'

import RegisterEmail from './registration/RegisterEmail'
import TimeMessage from '../components/TimeMessage'
import Process from '../components/process'
import EmailCode from './registration/RegStep02'
import ProfileStep02 from './registration/ProfileStep02'

export default class Registration extends Component {

    constructor(props) {
        super(props)
        this.state = {
            registration: 0,
            registerProcess: false,

            passwordMissmatchError: false,
            messageDeliverySuccess: false,
            emailFormatInvalid: false,
            passwordNotMatch: false,
            codeNotMatch: false,
            setUpProfile: false,
            accountAlreadyExists: false,

            typeOfError: 'none',

            // User Details
            userName: null,
            userPictureID: null,
            pictureScale: null,
            currentUserEmail: null,
            currentUserPassword: null,

            processing: false
        }
    }

    // Kill currently active message
    messageKiller = () => {
        this.setState({
            passwordMissmatchError: false,
            messageDeliverySuccess: false,
            emailFormatInvalid: false,
            passwordNotMatch: false,
            codeNotMatch: false,
            setUpProfile: false,
            accountAlreadyExists: false
        })
          console.log('messagekill')
    }

    // Display message
    displayMessage = async (messageID) => {
        console.log(messageID, 'activate')
        switch(messageID) {
            case 'passwordMissmatchError':
                this.setState({passwordMissmatchError: true})
                break
            case 'messageDeliverySuccess':
                this.setState({messageDeliverySuccess: true})
                break
            case 'emailFormatInvalid':
                this.setState({emailFormatInvalid: true})
                break
            case 'passwordNotMatch':
                this.setState({passwordNotMatch: true})
                break
            case 'codeNotMatch':
                this.setState({codeNotMatch: true})
                break
            case 'setUpProfile':
                this.setState({setUpProfile: true})
                break
            case 'accountAlreadyExists':
                this.setState({accountAlreadyExists: true})
                break
                
          }
        
        setTimeout(this.messageKiller, 16000)
    }

    // Process overlay
    processTrigger(trigger) {
        this.setState({processing: trigger})
    }

    // Moving to the next step in registration process 
    nextReg = (regStep, attributes) => {
        console.log('In main', attributes)
        if(regStep == 1) {
            this.setState({registration: regStep, currentUserEmail: attributes.email, currentUserPassword: attributes.password})
        } else {
            this.setState({registration: regStep})
        }
        
    }

    // Creating new user account 
    createNewUser = async () => {
        console.log('Inside the create user function...')

        // Sending a request to the backend with data
        const userDetails = {
            user_name: this.state.userName,
            user_email: this.state.currentUserEmail,
            user_password: this.state.currentUserPassword,
            user_image_id: this.state.userPictureID,
            picture_scale: this.state.pictureScale
        } 
        this.setState({registerProcess: await userRegistration(userDetails)})

        this.processTrigger(false)
        
    }

  render() {
    if(this.state.registerProcess) return <Navigate to='/select_group'/>
    return (
        <div className='horizontal-page'>
            <motion.div className='formComp'
                initial={{x: 300}}
                animate={{x: 0}}
            >
                
                
                {(this.state.registration == 0) && <RegisterEmail parentContext={this}/>}
                {(this.state.registration == 1) && <EmailCode parentContext={this}/>}
                {(this.state.registration == 2) && <ProfileStep02 parentContext={this}/>}
                
                
            
            </motion.div>

            <div className='formComp' id='reg-background-img'>
                
            </div>

            <AnimatePresence>
                {/* Initiate messages */}
                {/* MissMatched password error */}
                {(this.state.passwordMissmatchError)?<TimeMessage header='Mismatched Password' type='error' killFn={this.messageKiller}>The password you enetered dose not match please try again.</TimeMessage>:null}
                {/* Message Delivered Succesfully */}
                {(this.state.messageDeliverySuccess)?<TimeMessage header='Verification Code Sent' type='success' messageID='messageDeliverySuccess'  killFn={this.messageKiller}>We have sent email with verification code, please check your email.</TimeMessage>:null}
                {/* User enters invalid email */}
                {(this.state.emailFormatInvalid)?<TimeMessage header='Invalid Email' type='warnning' messageID='emailFormatInvalid'  killFn={this.messageKiller}>Email you enter is not a valid email, please enter again.</TimeMessage>:null}
                {/* User passwords dosenot match  */}
                {(this.state.passwordNotMatch)?<TimeMessage header='Passwords Not Match' type='error' messageID='passwordNotMatch'  killFn={this.messageKiller}>Password you entered dose not match, please try again.</TimeMessage>:null}
                {/* Pin dose not match */}
                {(this.state.codeNotMatch)?<TimeMessage header='Invalid Code' type='error' messageID='codeNotMatch'  killFn={this.messageKiller}>Sorry, you have entered invalid pin.</TimeMessage>:null}
                {/* Setup profile  */}
                {(this.state.setUpProfile)?<TimeMessage header='One More Step' type='info' messageID='setUpProfile'  killFn={this.messageKiller}>Now choose a user name and a profile picture.</TimeMessage>:null}
                {/* Email Address already exists   */}
                {(this.state.accountAlreadyExists)?<TimeMessage header='Already Signed Email' type='warnning' messageID='accountAlreadyExists'  killFn={this.messageKiller}>Email address you enter has already existing account, login with that account or use different email address.</TimeMessage>:null}
            
            </AnimatePresence>

            

            {/* Custome made process animation of openledger logo */}
            {this.state.processing && <Process/>}
        </div>
    )
  }
}

