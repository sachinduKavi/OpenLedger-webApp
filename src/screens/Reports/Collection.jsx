import React from 'react'
import CreateCollection from './CreateCollection'

export default function Collection(props) {
  return (
    <div>
        <CreateCollection treasury={props.treasury} activeUser={props.activeUser}/>

    </div>
  )
}

