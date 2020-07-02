import React, {useState, useEffect, useRef} from 'react'
import ErrorMessage from './components/ErrorMessage'
import Message from './components/Message'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Filter from './components/Filter'
import Togglable from './components/Togglable'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ showAll, setShowAll ] = useState(true)
  const [ titleToFind, setShowTitleToFind ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ username, setUsername ] = useState('') 
  const [ password, setPassword ] = useState('') 
  const [ user, setUser ] = useState(null)

  const loginFormRef = useRef()

  const Scroll = require('react-scroll')
  const scroller = Scroll.animateScroll

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    loginFormRef.current.toggleVisibility()
    event.preventDefault()
    if (username === "" || password === "") {
      setErrorMessage(
        `both fields are required`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    } else {
      try {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem(
          'loggedBloglistappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      }
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUsername('')
      setPassword('')
      setUser(null)
      window.localStorage.clear()
      window.location.reload()
    } catch (exception) {
      setErrorMessage(`${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
    console.log('logged out successfully')
  }

  const handleFindTitleChange = (event) => { setShowTitleToFind(event.target.value) }
  const setTitleToFind = (event) => {
    event.preventDefault()
    if (titleToFind!=='') {
      setShowAll(false)
    }
  }

  const blogsToShow = showAll
    ? blogs
    : blogs.filter(blog => blog.title.toLowerCase().includes(titleToFind.toLowerCase()))

  const rows = () => blogsToShow.map(blog =>
    <Blog
      key={blog.id}
      values={blog}
      likeBlog={() => likeBlogOf(blog.id)}
      deleteBlog={() => deleteBlogOf(blog.id)}
    />
  )

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setMessage(
        `added ${blogObject.title} by ${blogObject.author}`
        )
        setTimeout(() => {
        setMessage(null)
        }, 4000)
      })
      .catch((error) => {
          setErrorMessage(
              `${error}, all fields are required`
          )
          setTimeout(() => {
          setErrorMessage(null)
          }, 4000)
      })
  }

  const likeBlogOf = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log(changedBlog)
    
    blogService
      .update(blog.id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(
          oldblog => oldblog.likes !== blog.likes
            ? oldblog
            : returnedBlog
          )
        )
      })
      .catch(error => {
        scroller.scrollToTop()
        setErrorMessage(`${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setBlogs(blogs.filter(n => n.id !== blog.id))
      })
  }

  const deleteBlogOf = id => {
    const blog = blogs.find(n => n.id === id)
    
     if (window.confirm(`Delete \`${blog.title}\`?`)) {
      blogService
      .remove(id, blog)
      .then(() => {
        setBlogs(blogs.filter(n => n.id !== id))
        scroller.scrollToTop()
        setMessage(
          `deleted \`${blog.title}\``
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        scroller.scrollToTop()
        setErrorMessage(`${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
     }
  }

  const loginForm = () => (
    <Togglable buttonLabel='sign in' ref={loginFormRef}>
      <LoginForm
        user={user}
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const filter = () => (
    <Filter 
      setTitleToFind={setTitleToFind}
      titleToFind={titleToFind}
      handleFindTitleChange={handleFindTitleChange}
    />
  )

  return (
  <>
	  <nav id='nav' className='navbar navbar-light bg-light'>
      {/* <img src='/logo.png' width='50' height='35' className='d-inline-block align-top' alt=''/> */}
      <strong>Bloglist</strong>
      
      {user !== null ?
      <div>
        {user.name} logged in
        <button className='btn btn-primary ml-2' type='submit' onClick={handleLogout}>
          Logout
        </button>
      </div>
      : loginForm()
      }
    </nav>

    <div className='container'>
      <Message message={message} />
      <ErrorMessage message={errorMessage} />
      {user !== null && blogForm()}
      {user !== null &&
        <div className='col-auto'>
          {filter()}
          <br />
          <Blogs rows={rows()}/>
        </div>
      }
      <Footer />
    </div>
  </>
  )
}

export default App
