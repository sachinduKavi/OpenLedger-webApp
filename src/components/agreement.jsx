import React, { Component } from 'react'
import { Checkbox } from 'antd'

export default class Agreement extends Component {


  render() {
    return (
      <div className='agreement-wrapper'>
        <Checkbox className='agreement' onChange={this.props.changeFn}>I agree to terms and services and privacy policy of Open Ledger.</Checkbox> 
      </div>
    )
  }
}
