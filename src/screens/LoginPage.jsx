import React, { Component } from 'react'
import {motion} from 'framer-motion'

import '../styles/login-style.css'
import FormComp from '../components/FormComp'

export default class LoginPage extends Component {
  render() {
    return (
        // div tage covers the entire page
        <div className='horizontal-page' style={{width:'100%', overflow:'hidden'}}> 
            <FormComp/>
        </div>
      
    )
  }
}
