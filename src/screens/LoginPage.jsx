import React, { Component } from 'react'
import {motion} from 'framer-motion'
import {Navigate} from 'react-router-dom'

import '../styles/login-style.css'
import FormComp from '../components/FormComp'
import Process from '../components/process'

export default class LoginPage extends Component {

  constructor() {
    super()
    this.state = {
      loginComplete: false, // Navigate to the app main screen 

      processing: false
    }
  }

  // Processing trigger show processing icon
  processTrigger = (state) => {
    this.setState({
      processing: state
    })
  }
  

  render() {
    if(this.state.loginComplete) return <Navigate to='/select_group'/>
    return (
        // div tag covers the entire page
        <div className='horizontal-page' style={{width:'100%', overflow:'hidden'}}> 
            <FormComp parentContext={this}/>

            {this.state.processing?<Process/>:null}
        </div>
      
    )
  }
}
