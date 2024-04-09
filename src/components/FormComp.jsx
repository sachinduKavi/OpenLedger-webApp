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
    // Check for email format 
    if(emailRegex(this.state.user.userEmail)) {
      // Extract user email and password 
      const res = await userLogin({user_email: this.state.user.userEmail, user_pass: this.state.user.userPassword})
      if(res.error == null) {
        if(res.accountValidate) {
          // Password match
        } else {
          // Password dose not match
        }
      }
    } else {
      // Email is not according to the format
    }

    
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
              <img src={OpenledgerLogo} alt="" className='openledger-logo'/>
            </div>

            
        </motion.div>
      </>
    )
  }
}

