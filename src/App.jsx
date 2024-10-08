import React, {useState} from 'react'
import { Route, Routes, BrowserRouter, Router} from 'react-router-dom'

import LoginPage from './screens/LoginPage'
import Registration from './screens/Registration'
import Dashboard from './screens/Dashboard'
import {SessionContext} from './Session'
import TreasuryDashboard from './screens/TreasuryDashboard'
import Process from './components/process'
import { UserCardSession } from './UserCardSession'
import UserCardInfo from './components/UserCardInfo'
import RequestPage from './screens/RequestPage'

export const Context = React.createContext()

function App() {
  const [sessionData, changeSessionData] = useState({
    processing: false
  }) // Declare session variables
  // Change Session data

  const [userCard, setUserCardState] = useState({
    userCardState: false,
    userID: "US00000000000000",
    refreshFunction: null,
    logoutFunction: null
  })

  return (
    <SessionContext.Provider value={{sessionData, changeSessionData, setUserCardState}}>
      {/* <SessionContext.Provider value={{setUserDetail, setUserCardState}}> */}
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<Registration/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/treasury' element={<TreasuryDashboard/>}/>
          <Route path='/request/:treasuryID' element={<RequestPage/>}/>
        </Routes>
  
      </BrowserRouter>


      {/* Global Process trigger */}
      {sessionData.processing && <Process/>}

      {/* Global User card */}
      {userCard.userCardState && <UserCardInfo userID={userCard.userID} setUserCard={setUserCardState} editorMode={true} refresh={userCard.refreshFunction} logout={userCard.logoutFunction}/>}

      {/* </SessionContext.Provider> */}
    </SessionContext.Provider>
      
  )
}

export default App
