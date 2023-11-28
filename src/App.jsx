import React from 'react'
import { useSelector } from 'react-redux'

import LoginComponent from './components/LoginComponent'
import SuccessLogin from './components/SuccessLogin'

function App () {
  const user = useSelector(state => state.user)

  return (
    <div>
    {user.id !== '' ? <SuccessLogin /> : <LoginComponent />}
    </div>
  )
}

export default App
