import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../redux/reducer/userSlice'

function SuccessLogin () {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const LogoutFunc = () => {
    dispatch(clearUser(user))
  }
  return (
        <>
            <h1>MyPage</h1>
            <p>{`${user.name}(${user.id})`}님, 안녕하세요!</p>
            <button onClick={() => LogoutFunc()}>로그아웃</button>
        </>
  )
}

export default SuccessLogin
