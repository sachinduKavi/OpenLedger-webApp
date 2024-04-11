import React, { Component } from 'react'
import {motion} from 'framer-motion'
import {Navigate} from 'react-router-dom'

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

      processing: false
    }
  }

  // Discard all the time messages 
  messageKiller = () => {
    this.setState({
      passwordError: false
    })
  }


  // Processing trigger show processing icon
  processTrigger = (state) => {
    this.setState({
      processing: state
    })
  }
  

  render() {
    if(this.state.loginComplete) return <Navigate to={`/select_group?userDetails=${new URLSearchParams({userName: 'sachindu', lastName: 'another name'})}`}/>
    return (
        // div tag covers the entire page
        <div className='horizontal-page' style={{width:'100%', overflow:'hidden'}}> 
            <FormComp parentContext={this}/>

            {/* Displays Error messages */}
            {this.state.passwordError&&<TimeMessage header='Incorrect Password' type='error' messageID={this.passwordError} killFn={this.messageKiller}>You have entered incorrect password, please try it again.</TimeMessage>}


            {/* Processing logo */}
            {this.state.processing&&<Process/>}
        </div>
      
    )
  }
}
