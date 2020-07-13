import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'

const Blog = ({ props }) => {
  const id = useParams().id
  const dispatch = useDispatch()

  const ShowOrhide = { display: props.visible ? '' : 'none' }

  const blog = props.blogs.find(n => n.id === id)

  return(
    <div style={ShowOrhide}>
      <br />
      <li className='list-group-item'>
        <b id='b-left'>{blog.title}</b>by<b id='b-right'>{blog.author}</b>
      </li>
      <br />
      <li className='list-group-item'>
        <a href={blog.url}>{blog.url}</a>
      </li>
      <li className='list-group-item'>
        {blog.likes} likes
        <button type='button' className='btn btn-success' id='like-button'
          onClick={() => {
            props.likeBlog({ ...blog, user: blog.user.id })
            props.setMessage(`you liked '${blog.title}'`,'msg',5)
          }}>like</button>
      </li>
      <li className='list-group-item'>
        added by {blog.user.name}
        { props.user.name === blog.user.name &&
          <button type='button' id='delete-button' className='btn btn-warning'
            onClick={() => {
              props.history.goBack()
              props.deleteBlog(id)
              props.setMessage(`you deleted '${blog.title}'`,'msg',5)
              dispatch(initializeBlogs())
              props.setVisible(!props.visible)
            }}>delete</button>
        }
        <button type='button' id='back-button' className='btn btn-primary'
          onClick={() => {
            props.history.goBack()
            props.setVisible(!props.visible)
          }}
          props={{
            ...props,
          }} >back
        </button>
      </li>
    </div>
  )
}

export default Blog
