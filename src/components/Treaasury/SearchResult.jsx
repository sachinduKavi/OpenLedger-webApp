import React from 'react'

export default function SearchResult(props) {

  const categoryName = props.children
  return (
    <div className='search-result' onClick={() => {
        console.log('onclick', categoryName)
        props.setNewRecord({...props.newRecord, category: categoryName})
    }}>
        <h3>{props.children}</h3>
    </div>
  )
}
