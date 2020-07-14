import React, { useState } from 'react'
import { useField } from '../hooks'

const LoginForm = ({ loginUser }) => {

  const [ form, setForm ] = useState(true)

  const newUsername = useField(form)
  const newPassword = useField(form)

  const handleSubmit = (event) => {
    event.preventDefault()
    setForm(true)

    const newUser = {
      username: newUsername.value,
      password: newPassword.value
    }

    loginUser(newUser)
  }

  return (
    <div className='form-group-inline'>
      <form>
        <div align='left' className='form-group-inline'>
          <label id='formlabel'>username:</label>
          <input className='form-control' {...newUsername} />
          <label id='formlabel'>password:</label>
          <input className='form-control' {...newPassword} />
        </div>
        <button className='btn btn-primary' id='login-button' type='button'
          style={{ float: 'left' }}
          onClick={handleSubmit}>login</button>
      </form>
    </div>
  )
}

export default LoginForm