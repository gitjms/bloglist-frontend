import React, { useState, useEffect, useRef } from 'react'
import { Switch, Route, Link, useHistory } from 'react-router-dom'

import { initializeBlogs  } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import Blogs from './components/Blogs'
import Message from './components/Message'
import Footer from './components/Footer'
import Togglable from './components/Togglable'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [ user, setUser ] = useState(null)
  const [ visible, setVisible ] = useState(false)
  const [ message, setMessage ] = useState({ which: '' , text: '' })

  const history = useHistory()
  const loginFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {
    if (loginObject.username === '' || loginObject.password === '') {
      setMessage('both fields are required','err',5)
    } else {
      try {
        const user = await loginService.login(loginObject)
        window.localStorage.setItem('loggedBloglistappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
      } catch (exception) {
        setMessage('wrong username or password','err',5)
      }
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUser(null)
      window.localStorage.clear()
    } catch (exception) {
      setMessage(`${exception}`,'err',5)
    }
    window.location.reload()
    setMessage('logged out successfully','msg',5)
  }

  const loginForm = () => (
    <Togglable buttonLabel='sign in' ref={loginFormRef}>
      <LoginForm loginUser={handleLogin} />
    </Togglable>
  )

  const blogForm = () => (
    <Link to={'/create'}
      onClick={() => {
        setVisible(true)
        history.push('/blogs')
      }}
    >CREATE NEW
    </Link>
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
        <Message message={message} />
        <Switch>
          <Route path='/create'>
            <BlogForm
              user={user}
              visible={true}
              history={history}
              blogForm={blogForm}
              setVisible={setVisible}
            />
          </Route>
          <Route path='/blogs'>
            {user !== null
              ? <Blogs
                user={user}
                visible={visible}
                history={history}
                blogForm={blogForm}
                setVisible={setVisible}
                setMessage={setMessage}
              />
              : null
            }
          </Route>
          <Route path='/users'>

          </Route>
        </Switch>
        <Footer />
      </div>
    </>
  )
}

export default App
