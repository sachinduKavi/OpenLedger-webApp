import React from 'react'

import '../styles/simpleDP.css'

export default function SimpleDP(props) {
  return (
    <div>
        <div className="display-picture" style={{width:props.size}}>
          {/* {(props.imageLink != null) && <img src={props.imageLink} width='100%'/>} */}
        </div>
    </div>
  )
}
