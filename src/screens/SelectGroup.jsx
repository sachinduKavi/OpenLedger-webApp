import React, { Component } from 'react'

export default class SelectGroup extends Component {

  componentDidMount = () => {
    if(this.props.location) {
      console.log(this.props.location)
    } else {
      console.log('No Location props')
    }
  }

  render() {
    return (
      <div>
        <h1 style={{color:'black'}}>Account Created Successfully {this.props.value}<br/> Thank You!</h1>
      </div>
    )
  }
}
