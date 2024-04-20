import React, { Component } from 'react'
import {Navigate} from 'react-router-dom'
import {motion} from 'framer-motion'

import '../styles/dashboard.css'
import WelcomeBar from '../components/Dashboard/WelcomeBar'
import SearchBar from '../components/SearchBar'
import TreasuryNew from '../components/Dashboard/TreasuryNew'
import Process from '../components/process'

import PlusImage from '../assets/icons/plus.png'

export default class Dashboard extends Component {

  constructor() {
    super()
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))

    this.state = {
      newTreasuryPopUp: false,
      processing: true
    }
  }

  processTrigger = (state) => {
    this.setState({processing: state})
  }


  componentDidMount() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
  }

  // Display and close new treasury pop up window
  newTreasuryPopTrigger = () => {
    console.log('Inside the function')
    this.setState({newTreasuryPopUp: !this.state.newTreasuryPopUp})
  }

  render() {
    if(this.userDetails ==  null) return <Navigate to='/login'/>
    return (
      <div>
        <div className="dash02">
          <WelcomeBar userName={this.userDetails.userName} imageLink={this.userDetails.userImageID} imageScale={this.userDetails.pictureScale}/>
        

          <p>You'll find recently accessed groups here, and you also have the option to create new treasury groups.</p>
        

          <SearchBar>Search treasury name or ID</SearchBar>

          
          {/* Display pop up window for new treasury group */}
          {this.state.newTreasuryPopUp && <TreasuryNew close={this.newTreasuryPopTrigger}/>}



          {/* Treasury add icon  */}
          <button className='addBtn' onClick={this.newTreasuryPopTrigger}>
            <img src={PlusImage} alt="plus image" />
          </button>


          {/* Processing circle */}
          {this.state.processing && <Process/>}

        </div>
      </div>
    )
  }
}
