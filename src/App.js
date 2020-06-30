import React, {useState, useEffect} from 'react'
import ErrorMessage from './components/ErrorMessage'
import Message from './components/Message'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Filter from './components/Filter'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Footer from './components/Footer'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')
  const [ newLikes, setNewLikes ] = useState(0)
  const [ showAll, setShowAll ] = useState(true)
  const [ titleToFind, setShowTitleToFind ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ message, setMessage ] = useState(null)
  const [ loginVisible, setLoginVisible ] = useState(false)
  const [ username, setUsername ] = useState('') 
  const [ password, setPassword ] = useState('') 
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
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

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUsername('')
      setPassword('')
      setUser(null)
      window.localStorage.clear()
    } catch (exception) {
      setErrorMessage(`${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
    console.log('logged out successfully')
  }

  const Scroll = require('react-scroll')
  const scroller = Scroll.animateScroll
  const scrollToElem = () => {
    scroller.scrollTo('myScrollToElement', {
      duration: 500,
      delay: 50,
      smooth: true,
      containerId: 'ContainerElementID',
      offset: 50, // Scrolls to element + 50 pixels down the page
    })
  }

  const handleTitleChange = (event) => { setNewTitle(event.target.value) }
  const handleAuthorChange = (event) => { setNewAuthor(event.target.value) }
  const handleUrlChange = (event) => { setNewUrl(event.target.value) }
  const handleLikesChange = (event) => { setNewLikes(event.target.value) }
  const handleFindTitleChange = (event) => { setShowTitleToFind(event.target.value) }
  const handleLoginVisibility = (event) => { setLoginVisible(event) }
  const setTitleToFind = (event) => {
    event.preventDefault()
    if (titleToFind!=='') {
      setShowAll(false)
    }
  }

  // eslint-disable-next-line no-unused-vars
  let data = []
  const blogsToShow = showAll
    ? data = Array.from(blogs)
    : blogs.filter(blog => blog.title.toLowerCase().includes(titleToFind.toLowerCase()))

  const rows = () => blogsToShow.map(blog =>
    <Blog
      key={blog.id}
      values={blog}
      likeBlog={() => likeBlogOf(blog.id)}
      replaceTitle={() => replaceTitleOf(blog.id)}
      deleteBlog={() => deleteBlogOf(blog.id)}
    />
  )

  const addBlog = (event) => {
    event.preventDefault()
    const titleObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
    }
  
    const mapUrls = blogs.map(blog => blog.url.toLowerCase())
      
    if (mapUrls.includes(titleObject.url.toLowerCase())) {
      setErrorMessage(
        `\`url\` should be unique`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
      setNewUrl('')
    } else {
      blogService
      .create(titleObject)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes(0)
        setMessage(
          `added ${titleObject.title} by ${titleObject.author}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch((error) => {
        setErrorMessage(
          `all fields are required`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
    }
  }

  const replaceTitleOf = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, title: newTitle }
    const askConfirm = `replace the old title with a new one?`

    if (!newTitle) {
      scrollToElem()
        setErrorMessage(
          `set new title in the field \`title\``
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
    } else if (window.confirm(askConfirm)) {
      blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(
          oldblog => oldblog.title !== blog.title
            ? oldblog
            : returnedBlog
          )
        )
        scroller.scrollToTop()
        setMessage(
          `changed blog title of \`${blog.title}\` to \`${newTitle}\``
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
        setBlogs(blogs.filter(n => n.id !== blog.id))
      })
     }
  }

  const likeBlogOf = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    
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

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
  <>
	  <nav id='nav' className='navbar navbar-light bg-light'>
      {/* <img src='/logo.png' width='50' height='35' className='d-inline-block align-top' alt=''/> */}
      <strong>Bloglist</strong>
      
      {user === null ?
        <div className='col-auto' style={hideWhenVisible}>
          <div align='left' className='form-group'>
            <button className='btn btn-primary' type='submit'
              onClick={() => handleLoginVisibility(true)}>sign in</button>
          </div>
        </div>
      :
      <div className='col-auto' style={hideWhenVisible}>
        {user.name} logged in
        <button className='btn btn-primary ml-2' type='submit' onClick={handleLogout}>
          Logout
        </button>
      </div>
      }
    </nav>

    <div className='container'>
      <Message message={message} />
      <ErrorMessage message={errorMessage} />
      <div style={showWhenVisible}>
        <br />
        <LoginForm name='myScrollToElement'
          handleLoginVisibility={handleLoginVisibility}
          loginVisible={loginVisible}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
        {user !== null &&
          <>
            <br />
            <Filter 
              setTitleToFind={setTitleToFind}
              titleToFind={titleToFind}
              handleFindTitleChange={handleFindTitleChange}
            />
            <BlogForm name='myScrollToElement'
              addBlog={addBlog}
              newTitle={newTitle}
              handleTitleChange={handleTitleChange}
              newAuthor={newAuthor}
              handleAuthorChange={handleAuthorChange}
              newUrl={newUrl}
              handleUrlChange={handleUrlChange}
              newLikes={newLikes}
              handleLikesChange={handleLikesChange}
            />
            <br />
            <Blogs rows={rows()}/>
          </>
        }
    <Footer />
    </div>
  </>
  )
}

export default App
