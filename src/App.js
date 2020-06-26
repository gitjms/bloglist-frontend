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
        console.log(initialBlogs)
        setBlogs(initialBlogs)
      })
  }, [])

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
      deleteBlog={() => deleteBlogOf(data.id)}
      replaceTitle={() => replaceTitleOf(data.title,data.author,data.url,data.likes)}
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
  
    const mapTitles = blogs.map(blog => blog.title.toLowerCase())
      
    if (mapTitles.includes(titleObject.title.toLowerCase())) {
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
      .catch(error => {
        setErrorMessage(
          console.log(error.response.data)
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
    }
  }

  const replaceTitleOf = (blogId) => {
    const blog = blogs.find(n => n.title === blogId.title)
    const changedBlog = { ...blog, title: blogId.title }
    const askConfirm = `${blog.title} is already added to
      bloglist, replace the old title with a new one?`

     if (window.confirm(askConfirm)) {
      blogService
      .update(blog.id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(
          oldblog => oldblog.title !== blog.title
            ? oldblog
            : returnedBlog
          )
        )
        setMessage(
          `Changed blog title of ${blog.title}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${blog.title} has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setBlogs(blogs.filter(n => n.id !== blog.id))
      })
     }
  }

  const deleteBlogOf = id => {
    const blog = blogs.find(n => n.id === id)
    
     if (window.confirm(`Delete ${blog.title}?`)) {
      blogService
      .remove(id, blog)
      .then(() => {
        setBlogs(blogs.filter(n => n.id !== id))
        setMessage(
          `Deleted ${blog.title}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of ${blog.title} has already been removed from server`
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
        <BlogForm
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
