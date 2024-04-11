import React, { Component } from 'react'
import { useLocation } from 'react-router-dom';

export default class SelectGroup extends Component {

  componentDidMount = () => {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search); // Parse query string
  const selectedValue = searchParams.get('userDetails');
  console.log(selectedValue)
  }

  render() {
    return (
      <div>
        <h1 style={{color:'black'}}>Account Created Successfully {this.props.value}<br/> Thank You!</h1>
      </div>
    )
  }
}
