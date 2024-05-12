import React, { Component, useContext } from 'react'
import {Navigate} from 'react-router-dom'
import {motion} from 'framer-motion'

import '../styles/dashboard.css'
import WelcomeBar from '../components/Dashboard/WelcomeBar'
import SearchBar from '../components/SearchBar'
import TreasuryNew from '../components/Dashboard/TreasuryNew'
import Process from '../components/process'

import PlusImage from '../assets/icons/plus.png'
import { SessionContext } from '../Session'

export default class Dashboard extends Component {
  static contextType = SessionContext;
  constructor() {
    super()
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
    

    this.state = {
      newTreasuryPopUp: false,
      processing: false
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
    console.log('Inside the function')
    this.setState({newTreasuryPopUp: !this.state.newTreasuryPopUp})
  }
  
  render() {
    if(this.userDetails ==  null) return <Navigate to='/login'/>
    return (
      <div>
        <div className="dash02">
          <WelcomeBar userName={this.userDetails.user_name} imageLink={this.userDetails.dp_link} imageScale={this.userDetails.picture_scale}/>
        

          <p>You'll find recently accessed groups here, and you also have the option to create new treasury groups.</p>
        

          <SearchBar>Search treasury name or ID</SearchBar>

          {/* Dashboard content */}
          <div className="main-content">
            
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
