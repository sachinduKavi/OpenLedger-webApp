import React from 'react'
import {useLocation} from 'react-router-dom'

import '../styles/treasury.css'


export default function Treasury() {
    const location = useLocation()
    console.log('Use location', location)

  return (
    <div className='container'>

    </div>
  )
}
