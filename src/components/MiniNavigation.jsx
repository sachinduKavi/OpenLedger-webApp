import React from 'react'

import '../styles/mini-navigation.css'


export default function MiniNavigation(props) {
  return (
    <div className='mini-navigation-border'>
        {props.children}
    </div>
  )
}
