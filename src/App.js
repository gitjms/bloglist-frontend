import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, Link, useHistory } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'

import Blogs from './components/Blogs'
import Users from './components/Users'
import Message from './components/Message'
import Footer from './components/Footer'
import Togglable from './components/Togglable'
import { setLoggedUser } from './reducers/loggedUserReducer'
import { setMessage } from './reducers/messageReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const [ visible, setVisible ] = useState(false)

  const history = useHistory()
  const loginFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (loginObject) => {
    if (loginObject.username === '' || loginObject.password === '') {
      dispatch(setMessage('both fields are required','err',5))
    } else {
      try {
        const user = await loginService.login(loginObject)
        window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch(setLoggedUser(user))
      } catch (exception) {
        dispatch(setMessage('wrong username or password','err',5))
      }
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      dispatch(setLoggedUser(null))
      window.localStorage.clear()
    } catch (exception) {
      dispatch(setMessage(exception,'err',5))
    }
    window.location.reload()
    history.goBack()
  }

  const loginForm = () => (
    <Togglable buttonLabel='sign in' ref={loginFormRef}>
      <LoginForm loginUser={handleLogin} />
    </Togglable>
  )

  const user = (
    useSelector(state => {
      return state.loggedUser !== null
        ? state.loggedUser
        : null
    })
  )

  return (
    <>
      <nav id='nav' className='navbar navbar-light bg-light'>
        {/* <img src='/logo.png' width='50' height='35' className='d-inline-block align-top' alt=''/> */}
        <a className="navbar-brand" href="/"><strong>Bloglist</strong></a>

        {user !== null ?
          <>
            <div>
              <Link to='/blogs' >blogs</Link>
            </div>
            <div>
              <Link to='/users' >users</Link>
            </div>
            <div>
              {user.name} logged in
              <button className='btn btn-primary ml-2' id='logout-button' type='submit'
                onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
          : loginForm()
        }
      </nav>

      <div className='container'>
        <Message />
        <Switch>
          <Route path='/blogs'>
            {user !== null
              ? <Blogs
                user={user}
                visible={visible}
                history={history}
                setVisible={setVisible}
                setMessage={setMessage}
              />
              : null
            }
          </Route>
          <Route path='/users'>
            {user !== null
              ? <Users
                user={user}
                visible={visible}
                history={history}
                setVisible={setVisible}
                setMessage={setMessage}
              />
              : null
            }
          </Route>
        </Switch>
        <Footer />
      </div>
    </>
  )
}

export default App