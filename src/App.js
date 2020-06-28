import React, {useState, useEffect} from 'react'
import ErrorMessage from './components/ErrorMessage'
import Message from './components/Message'
import blogService from './services/blogs'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Filter from './components/Filter'
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

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

  const handleFindTitleChange = (event) => {
    setShowTitleToFind(event.target.value)
  }

  const setTitleToFind = (event) => {
    event.preventDefault()
    if (titleToFind!==''){
      setShowAll(false)
    }
  }

  // eslint-disable-next-line no-unused-vars
  let data = []
  const blogsToShow = showAll
    ? data = Array.from(blogs)
    : blogs.filter(blog => blog.title.toLowerCase().includes(titleToFind.toLowerCase()))

  const rows = () => blogsToShow.map(data =>
    <Blog
      key={data.title}
      values={data}
      likeBlog={() => likeBlogOf(data.id)}
      replaceTitle={() => replaceTitleOf(data.id)}
      deleteBlog={() => deleteBlogOf(data.id)}
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
      replaceTitleOf(titleObject)
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
          `Added ${titleObject.title}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch((error) => {
        setErrorMessage(
          `fields title, author, and url are required`
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
          `Set new title in the field \`title\``
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
          `Changed blog title of \`${blog.title}\` to \`${newTitle}\``
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        scroller.scrollToTop()
        setErrorMessage(
          `Something went wrong: \`${error.data}\``
        )
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
      setErrorMessage(
        `Something went wrong: \`${error.data}\``
      )
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
          `Deleted \`${blog.title}\``
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        scroller.scrollToTop()
        setErrorMessage(
          `Information of \`${blog.title}\` has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
     }
  }


  return (
  <>
	  <nav id='nav' className='navbar navbar-light bg-light'>
      {/* <img src='/logo.png' width='50' height='35' className='d-inline-block align-top' alt=''/> */}
      <strong>Bloglist</strong>
      <a role='button' className='btn btn-outline-primary' href='/info'>Info</a>
    </nav>
    <div className='container'>
      <br />
      <div className='col-auto'>
        <Filter 
          setTitleToFind={setTitleToFind}
          titleToFind={titleToFind}
          handleFindTitleChange={handleFindTitleChange}
        />
      </div>
      <Message message={message} />
      <ErrorMessage message={errorMessage} />
      <br />
      <div className='col-auto'>
        <b>Add new blog</b>
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
      </div>
      <br />
      <div className='col-auto'>
        <b>Blogs</b>
        <Blogs rows={rows()}/>
      </div>
    <Footer />
    </div>
  </>
  )
}

export default App
