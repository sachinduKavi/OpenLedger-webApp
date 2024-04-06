import React from 'react'
import { Route, Routes, BrowserRouter} from 'react-router-dom'

import LoginPage from './screens/LoginPage'
import Registration from './screens/Registration'
import SelectGroup from './screens/SelectGroup'

function App() {
 

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<Registration/>}/>
          <Route path='select_group' element={<SelectGroup/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
