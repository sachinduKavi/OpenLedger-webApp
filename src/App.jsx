import React, {useState} from 'react'
import { Route, Routes, BrowserRouter, Router} from 'react-router-dom'

import LoginPage from './screens/LoginPage'
import Registration from './screens/Registration'
import Dashboard from './screens/Dashboard'
import {SessionContext} from './Session'
import TreasuryDashboard from './screens/TreasuryDashboard'
import Process from './components/process'

export const Context = React.createContext()

function App() {
  const [sessionData, changeSessionData] = useState({
    processing: false
  }) // Declare session variables
  // Change Session data


  return (
    <SessionContext.Provider value={{sessionData, changeSessionData}}>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<Registration/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='treasury' element={<TreasuryDashboard/>}/>
        </Routes>
  
      </BrowserRouter>

      {/* Global Process trigger */}
      {sessionData.processing && <Process/>}
    </SessionContext.Provider>
      
  )
}

export default App
