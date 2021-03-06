import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { isAuthenticated, login, error, clearErrors } = authContext
  const { setAlert } = alertContext
  const { email, password } = user

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger')
      clearErrors()
    }
  }, [error, isAuthenticated, props.history]) //eslint-disable-line react-hooks/exhaustive-deps

  const onChange = e => setUser({
    ...user, 
    [e.target.name]: e.target.value
  })

  const onSubmit = e => {
    e.preventDefault()
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger')
    } else login({
      email, password
    })
  }

  return (
    <div className="form-container">
      <h1>Account <span className="text-primary">Login</span></h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Adress</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required autoComplete="off" />
        </div>
        <input type="submit" value="Login" className="btn btn-primary btn-block" />
      </form>
    </div>
  )
}

export default Login

