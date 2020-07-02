import React from 'react'


const LoginForm = ({
  handleVisibility,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  handleLogin}) => {

  return (
    <div className='form-group-inline'>
      <form onSubmit={handleLogin}>
        <div align='left' className='form-group-inline'>
          <label id='formlabel' htmlFor='username'>username:</label>
          <input autoFocus id='username' type='text' className='form-control' name='Username'
            value={username}
            onChange={handleUsernameChange}
          />
          <label id='formlabel' htmlFor='password'>password:</label>
          <input id='password' type='text' className='form-control' name='Password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className='btn btn-primary' type='submit' style={{float: "left"}}
          onClick={handleVisibility}>login</button>
      </form>
    </div>
  )
}

export default LoginForm