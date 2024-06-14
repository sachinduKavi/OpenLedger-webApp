import React from 'react'

export default function SearchResult(props) {
    const [newRecord, setNewRecord] = props.stateChange

  return (
    <div className='search-result' onClick={() => {
        console.log('onclick',props.children)
        setNewRecord({...newRecord, category: props.children})
    }}>
        <h3>{props.children}</h3>
    </div>
  )
}
