import React from 'react'
import { Route, Routes, BrowserRouter} from 'react-router-dom'

import LoginPage from './screens/LoginPage'
import Registration from './screens/Registration'
import Dashboard from './screens/Dashboard'
import LandingPage from './screens/LandingPage'

function App() {
 

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<Registration/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='landing' element={<LandingPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
