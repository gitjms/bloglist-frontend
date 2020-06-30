import React from 'react'


const LoginForm = ({handleLoginVisibility,username,setUsername,password,setPassword,handleLogin}) => {

  return (
    <>
      <div className='col-auto'>
        <b>Login</b>
        <form onSubmit={handleLogin}>
          <div align='left' className='form-group-inline'>
            <label id='formlabel' htmlFor='username'>username:</label>
            <input autoFocus id='username' type='text' className='form-control' name='Username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
          />
          </div>
          <div align='left' className='form-group-inline'>
            <label id='formlabel' htmlFor='password'>password:</label>
            <input id='password' type='text' className='form-control' name='Password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div align='left' className='form-group'>
            <button className='btn btn-primary'type='submit'
              onClick={() => handleLoginVisibility(false)}>login</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginForm