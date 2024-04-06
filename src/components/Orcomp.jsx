import React from 'react'

import '../styles/or-comp.css'

export default function Orcomp(props) {
  return (

    <div style={{width:'100%'}}>
      <div className='whole-or'>
        <div className='line'></div>

        <div className='text'>{props.children}</div>

        <div className='line'></div>
    </div>
    </div>
    
  )
}
