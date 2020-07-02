import React, {useState} from 'react'


const LoginForm = ({ loginUser }) => {

  const [ username, setUsername ] = useState('') 
  const [ password, setPassword ] = useState('') 

  const handleUsernameChange = (event) => { setUsername(event.target.value) }
  const handlePasswordChange = (event) => { setPassword(event.target.value) }
  
  const handleLogin = (event) => {
    event.preventDefault()
    loginUser({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div className='form-group-inline'>
      <form onSubmit={handleLogin}>
        <div align='left' className='form-group-inline'>
          <label id='formlabel' htmlFor='username'>username:</label>
          <input id='username' type='text' className='form-control' name='Username'
            value={username}
            onChange={handleUsernameChange}
          />
          <label id='formlabel' htmlFor='password'>password:</label>
          <input id='password' type='text' className='form-control' name='Password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className='btn btn-primary' type='submit' style={{float: "left"}}>login</button>
      </form>
    </div>
  )
}

export default LoginForm