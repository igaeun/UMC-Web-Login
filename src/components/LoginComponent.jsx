import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/reducer/userSlice'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Input = styled.input`
  margin-bottom: 7px;
  padding: 6px;
  border-radius: 10px;
  border-width: 1px;
`

const Button = styled.button`
  padding: 4px;
  border-radius: 10px;
  border-width: 1px;
  background-color: black;
  color: white;
  width: 175px;
  font-weight: 700;
`

const Msg = styled.div`
  margin-top: 7px;
  font-size: 13px;
  font-weight: 500;
`

const LOGIN_API_KEY = 'http://localhost:8000/user/login'

function LoginComponent () {
  const dispatch = useDispatch()

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const LoginFunc = (e) => {
    e.preventDefault()
    setMsg('Loading...')

    if (!id || !password) {
      alert('아이디와 비밀번호를 입력해주세요.')
      return
    }

    setLoading(true) // 로딩 시작
    axios.post(LOGIN_API_KEY, { id, pw: password })
      .then((response) => {
        const { code, token, userId } = response.data
        if (code === 400) {
          setTimeout(() => alert('비어있는 내용입니다.'), 1500)
        } else if (code === 401) {
          setTimeout(() => alert('존재하지 않는 id입니다.'), 1500)
        } else if (code === 402) {
          setTimeout(() => alert('비밀번호가 일치하지 않습니다.'), 1500)
        } else {
          localStorage.setItem('token', token)
          localStorage.setItem('userId', userId)
          dispatch(loginUser({ id: userId, token }))
          setTimeout(() => setMsg('로그인 성공!'), 1500)
        }
      })
      .catch((error) => {
        console.error('Login error:', error)
        setTimeout(() => setMsg('로그인을 실패했습니다.'), 1500)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
        <Container>
            <h1>로그인</h1>
            <form
                onSubmit={LoginFunc}
            >
                <Input
                    type="text"
                    placeholder='아이디'
                    className='id'
                    onChange={e => setId(e.target.value)}
                />
                <br />
                <Input
                    type="password"
                    placeholder='비밀번호'
                    className='pw'
                    onChange={e => setPassword(e.target.value)}
                />
                <br />
                <Button
                    disabled={loading}
                    type="submit"
                    className='btn'
                >
                    로그인
                </Button>
                <Msg>
                    {msg}
                </Msg>
            </form>
        </Container>
  )
}

export default LoginComponent
