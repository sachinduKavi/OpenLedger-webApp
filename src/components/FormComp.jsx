import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import {userLogin} from '../query/loginQuery'
import {emailRegex} from '../middleware/FormatChecker'

import { Input } from 'antd'
import Orcomp from './Orcomp'
import OtherOptions from './OtherOptions'
import {motion} from 'framer-motion'

import OpenledgerLogo from '../assets/OpenLedger.png'

export default class FormComp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        userEmail: null,
        userPassword: null
      }
    }

    this.onValueChange = this.onValueChange.bind(this)
  }

  onValueChange(e) {
    if(e.target.id == 'email'){
      this.setState(
        {user:  {...this.state.user, userEmail: e.target.value}}
      )
    } else {
      this.setState(
        {user:  {...this.state.user, userPassword: e.target.value}}
      )
    }
    
  }

  // User name and password submission 
  onDataSubmission = async () => {
    // Trigger processing circle
    this.props.parentContext.processTrigger(true)

    // Check for email format 
    if(emailRegex(this.state.user.userEmail)) {
      // Extract user email and password 
      const reply = await userLogin({user_email: this.state.user.userEmail, user_pass: this.state.user.userPassword})
      if(reply.error == null) {
        if(reply.accountValidate) { // Password match
          const userData = reply.userDetails
          // Set user details in local storage
          localStorage.setItem('userDetails', JSON.stringify({
            userID: userData.user_ID,
            userEmail: userData.user_email,
            userName: userData.user_name,
            dpLink: userData.dp_link,
            pictureScale: userData.picture_scale
          }))
          // Navigate to Dashboard 
          this.props.parentContext.setState({loginComplete: true})
        } else {
          // Password dose not match
          this.props.parentContext.setState({invalidPass: true})
        }
      } else {
        // Error unknown occurred
        if(reply.error == 'invalidEmail') {
          // User entered unregistered email
          this.props.parentContext.setState({invalidEmail: true})
        } else
        this.props.parentContext.setState({serverError: true})
      }
    } else {
      // Email is not according to the format
      this.props.parentContext.setState({emailFormatError:true})
    }
    // Turn off process icon
    this.props.parentContext.processTrigger(false)
    
  }

  render() {
    return (
      <>
        <div className='formComp' id='background-pic'>


        </div>

        <motion.div className='formComp'
          initial={{x:-300}}
          animate={{x:0}}
        >
            <div>
              <h2>Login</h2>

              <div className='account-dont'>Don't have an account? <Link to='/register'>Signup</Link></div>

              <div className='fields'>
                <Input status='' placeholder='Email' value={this.state.userEmail} onChange={this.onValueChange} id='email'/>

                <Input placeholder='Password' type='password' value={this.state.userPassword} id='password' onChange={this.onValueChange}/>

                <div>
                  <Link id='forget-pass'>Forget password?</Link>
                </div>

                <button onClick={this.onDataSubmission}>Login</button>

                {/* or continue with google or apple */}
                <Orcomp>OR CONTINUE WITH</Orcomp>
                
                <OtherOptions/>

                
              </div>
              <img src={OpenledgerLogo} alt="open-ledger-logo" className='openledger-logo'/>
            </div>

            
        </motion.div>
      </>
    )
  }
}

