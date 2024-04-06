import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import { Input } from 'antd'
import Orcomp from './Orcomp'
import OtherOptions from './OtherOptions'
import {motion} from 'framer-motion'

import OpenledgerLogo from '../assets/OpenLedger.png'

export default class FormComp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userEmail: '',
      userPassword: ''
    }

    this.onValueChange = this.onValueChange.bind(this)
  }

  onValueChange(e) {
    if(e.target.id == 'email'){
      this.setState(
        {userEmail:  e.target.value}
      )
    } else {
      this.setState(
        {userPassword: e.target.value}
      )
    }
    
  }

  // User name and password submission 
  onDataSubmission = async () => {
    console.log(this.state.userEmail, this.state.userPassword)
    
    const data = await fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
      console.log(res)
      return res.json()
    }).catch((err) => {
      console.log("Error" + err)
    })

    console.log('data', data)
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

