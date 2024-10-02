import React, {useState, useRef, useEffect} from 'react'
import {Input} from 'antd'

import SearchImg from '../assets/icons/Search.png'

import '../styles/search.css'
import { loadSuggestionQuery } from '../query/userQuery'

export default function SearchBar() {

  const [searchValue, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const [searchResults, setSearchResults] = useState([])


  // Close the suggestions when user click outside
  const containerRef = useRef()
  const checkMousePosition = (e) => {
    // console.log(!containerRef?.current?.contains(e.target))
    if(!containerRef?.current?.contains(e.target)) {
      setDropdown(false)
    }
  }


  // Loading suggestions 
  const loadSuggestions = async () => {
    const response = await loadSuggestionQuery(searchValue)
    if(response.status === 200 && response.data.proceed) {
      setSearchResults(response.data.content)
    }
  }


  useEffect(() => {
    loadSuggestions()
  }, [searchValue])

  // Component did mount ?
  useEffect(() => {
    document.addEventListener('mousedown', checkMousePosition)

    return (() => {
      document.removeEventListener('mousedown', checkMousePosition)
    })
  }, [])


  return (
    <div className="search-wrapper" ref={containerRef}>
      <div className='container-bar' tabIndex={5}>
          <div className='search-container'>
            <div className="search-bar-container">
                <Input type="text" id='search-bar' 
                onFocus={() => setDropdown(true)}
                value={searchValue} onChange={(e) => {
                  setSearch(e.target.value)
                }} autoComplete='off'/>

                <img src={SearchImg} alt='search icon' />
            </div>

        </div>
      </div>

      { dropdown &&
        <div className="suggestions-box">

          {
            searchResults.map((element, index) => {
              // console.log(btoa(element.treasury_Id))
              return (
                <div className="row" key={index}>
                  <a href={`http://localhost:5173/request/${btoa(element.treasury_Id)}`} target='_blank'>{element.treasury_name}</a>
                </div>
              )
            })
          }
          

          
      </div>}
    </div>
    
    
  )
}
