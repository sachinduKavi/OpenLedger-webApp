import React, { Component } from 'react'
import {Navigate} from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'

import '../styles/login-style.css'
import FormComp from '../components/FormComp'
import Process from '../components/process'
import TimeMessage from '../components/TimeMessage'

export default class LoginPage extends Component {

  constructor() {
    super()
    this.state = {
      loginComplete: false, // Navigate to the app main screen 

      // Error messages IDs
      passwordError: false,
      emailFormatError: false,
      serverError: false,

      processing: false
    }
  }

  // Discard all the time messages 
  messageKiller = () => {
    this.setState({
      passwordError: false,
      emailFormatError: false,
      serverError: false,
    })
  }


  // Processing trigger show processing icon
  processTrigger = (state) => {
    this.setState({
      processing: state
    })
  }
  

  render() {
    if(this.state.loginComplete) return <Navigate to='/dashboard'/>
    return (
        // div tag covers the entire page
        <div className='horizontal-page' style={{width:'100%', overflow:'hidden'}}> 
            <FormComp parentContext={this}/>

            <AnimatePresence>
              {/* Displays Error messages */}
              {this.state.passwordError&&<TimeMessage header='Incorrect Password' type='error' killFn={this.messageKiller}>You have entered incorrect password, please try it again.</TimeMessage>}
              {/* Invalid email address */}
              {this.state.emailFormatError&&<TimeMessage header='Invalid Email' type='error' killFn={this.messageKiller}>You have entered a invalid email address, please check again and reenter.</TimeMessage>}
              {/* Server error */}
              {this.state.serverError&&<TimeMessage header='Unknown Error Occurred' type='warnning' killFn={this.messageKiller}>Sorry unknown error occurred with our servers, please try again later.</TimeMessage>}
            </AnimatePresence>
      
            
            {/* Processing logo */}
            {this.state.processing&&<Process/>}
        </div>
      
    )
  }
}
