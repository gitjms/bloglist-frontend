import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = ({ props }) => {
  const id = useParams().id
  const Scroll = require('react-scroll')
  const scroller = Scroll.animateScroll

  const [ blogVisible, setBlogVisible ] = useState(!props.listVisible)
  const ShowOrhide = { display: blogVisible ? 'none' : '' }

  const blog = props.blogs.find(n => n.id === id)
  if (!blog) {
    return null
  }

  const commentForm = () => (
    <CommentForm
      blog={blog}
      addComment={props.addComment}
      history={props.history}
      initializeBlogs={props.initializeBlogs}
      setMessage={props.setMessage}
      props={props}
    />
  )

  const padding = {
    padding: '5px'
  }

  const size = {
    fontSize: '20px'
  }

  return(
    <div style={ShowOrhide}>
      <br />
      <b style={size}>{blog.title}</b>
      <span style={padding}></span>
      by
      <span style={padding}></span>
      <b style={size}>{blog.author}</b>
      <br /><br />
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button type='button' className='btn btn-success' id='like-button'
        onClick={() => {
          try {
            props.updateLikes({
              ...blog,
              likes: blog.likes + 1,
              user: blog.user.id,
              comments: blog.comments.map(com => com.id)
            })
            scroller.scrollToTop()
            props.setMessage(`you liked '${blog.title}'`,'msg',5)
          } catch (exception) {
            props.setMessage(exception,'err',10)
          }
        }}>like</button>
      <br />
      added by {blog.user.name}
      { props.user.name === blog.user.name &&
        <button type='button' id='delete-button' className='btn btn-warning'
          onClick={() => {
            props.history.goBack()
            try {
              props.deleteBlog(id)
              scroller.scrollToTop()
              props.setMessage(`you deleted '${blog.title}'`,'msg',5)
            } catch (exception) {
              props.setMessage(exception,'err',10)
            }
            props.initializeBlogs()
            setBlogVisible(!blogVisible)
            props.setListVisible(!props.listVisible)
          }}>delete</button>
      }
      <button type='button' id='back-button' className='btn btn-primary'
        onClick={() => {
          props.history.goBack()
          scroller.scrollToTop()
          setBlogVisible(!blogVisible)
          props.setListVisible(!props.listVisible)
        }}
        props={{
          ...props,
        }} > go back
      </button>
      <br /><br />
      <b>Comments</b>
      {commentForm()}
      { blog.comments.length > 0 &&
        <div className='col-auto'>
          <ul>
            {blog.comments.map(comment =>
              <li key={comment.id}>
                {comment.content}
              </li>
            )}
          </ul>
        </div>
      }
    </div>
  )
}

export default Blog
