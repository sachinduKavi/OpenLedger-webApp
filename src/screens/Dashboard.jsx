import React, { Component } from 'react'
import {Navigate} from 'react-router-dom'

import '../styles/dashboard.css'
import WelcomeBar from '../components/Dashboard/WelcomeBar'

export default class Dashboard extends Component {

  constructor() {
    super()
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
    console.log(this.userDetails)
  }


  componentDidMount() {
    
  }

  render() {
    if(this.userDetails ==  null) return <Navigate to='/login'/>
    return (
      <div>
        <div className="dash02">
          <WelcomeBar userName={this.userDetails.userName} dp={this.userDetails.userImageID}/>
        </div>
      </div>
    )
  }
}
