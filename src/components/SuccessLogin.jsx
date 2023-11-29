import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../redux/reducer/userSlice'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.button`
  padding: 4px;
  border-radius: 10px;
  border-width: 2px;
  background-color: white;
  color: black;
  width: 175px;
  font-weight: 700;
`

function SuccessLogin () {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const LogoutFunc = () => {
    dispatch(clearUser(user))
  }
  return (
        <Container>
            <h1>로그인</h1>
            <p>{`${user.id}`}님, 안녕하세요.</p>
            <Button onClick={() => LogoutFunc()}>로그아웃</Button>
        </Container>
  )
}

export default SuccessLogin
