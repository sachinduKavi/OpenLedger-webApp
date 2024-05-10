import React, {useState} from 'react'
import { Route, Routes, BrowserRouter} from 'react-router-dom'

import LoginPage from './screens/LoginPage'
import Registration from './screens/Registration'
import Dashboard from './screens/Dashboard'
import {SessionContext} from './Session'

export const Context = React.createContext()

function App() {
 
  let sessionData = {}
  // Change Session data
  const changeSessionData = (value) => {
    sessionData = value
  }

  return (
    <SessionContext.Provider value={{sessionData: sessionData, changeSessionData: changeSessionData}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<Registration/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </SessionContext.Provider>
      
  )
}

export default App
