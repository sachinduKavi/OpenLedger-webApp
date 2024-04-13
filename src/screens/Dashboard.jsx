import React, { Component } from 'react'
import {Navigate} from 'react-router-dom'

import '../styles/dashboard.css'
import WelcomeBar from '../components/Dashboard/WelcomeBar'
import SearchBar from '../components/SearchBar'

export default class Dashboard extends Component {

  constructor() {
    super()
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
  }


  componentDidMount() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
  }

  render() {
    if(this.userDetails ==  null) return <Navigate to='/login'/>
    return (
      <div>
        <div className="dash02">
          <WelcomeBar userName={this.userDetails.userName} imageLink={this.userDetails.userImageID} imageScale={this.userDetails.pictureScale}/>
        

          <p>You'll find recently accessed groups here, and you also have the option to create new treasury groups.</p>
        

          <SearchBar>Search treasury name or ID</SearchBar>

        </div>
      </div>
    )
  }
}
