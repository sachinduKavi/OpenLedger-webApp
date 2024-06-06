import React, { Component, useContext, createRef } from 'react'
import {Navigate} from 'react-router-dom'
import {motion} from 'framer-motion'

import '../styles/dashboard.css'
import WelcomeBar from '../components/Dashboard/WelcomeBar'
import SearchBar from '../components/SearchBar'
import TreasuryNew from '../components/Dashboard/TreasuryNew'
import Process from '../components/process'
import MyTreasuries from '../components/Dashboard/MyTreasuries'
import News from '../components/Dashboard/News'

import PlusImage from '../assets/icons/plus.png'

import Border02 from '../components/Border02'

export default class Dashboard extends Component {
  
  constructor() {
    super()
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
    this.childTreasuryRef = createRef()
    

    this.state = {
      newTreasuryPopUp: false,
      processing: false,
  
    }
  }

  processTrigger = (state) => {
    this.setState({processing: state})
  }


  async componentDidMount() {
    this.userDetails = await JSON.parse(localStorage.getItem('userDetails'))
  }

  // Display and close new treasury pop up window
  newTreasuryPopTrigger = () => {
    this.setState({newTreasuryPopUp: !this.state.newTreasuryPopUp})
    // Check whether the window is closed 
    if(this.state.newTreasuryPopUp) {
      this.childTreasuryRef.current.reloadTreasuries()
    }
  }
  
  render() {
    if(this.userDetails ==  null) return <Navigate to='/login'/>
    return (
      <div>
        <div className="dash02">
          <WelcomeBar userName={this.userDetails.userName} imageLink={this.userDetails.dpLink} imageScale={this.userDetails.pictureScale}/>
        

          <p>You'll find recently accessed groups here, and you also have the option to create new treasury groups.</p>
        

          <SearchBar>Search treasury name or ID</SearchBar>

          {/* Dashboard content */}
          <div className="main-content">
            <MyTreasuries userID={this.userDetails.user_ID} ref={this.childTreasuryRef}/>

            <News/>
            
          </div>
          
          {/* Display pop up window for new treasury group */}
          {this.state.newTreasuryPopUp && <TreasuryNew close={this.newTreasuryPopTrigger} parentContext={this}/>}



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
