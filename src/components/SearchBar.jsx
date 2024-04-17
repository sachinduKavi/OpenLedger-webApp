import React from 'react'
import {Input} from 'antd'

import SearchImg from '../assets/icons/Search.png'

import '../styles/search.css'

export default function SearchBar() {
  return (
    <div className='search-container'>
        <div className="search-bar-container">
            <Input type="text" id='search-bar'/>

            <img src={SearchImg} alt='search icon' />
        </div>

    </div>
  )
}
