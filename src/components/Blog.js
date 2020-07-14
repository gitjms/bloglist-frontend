import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, Switch, Route, Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const Blog = ({ props }) => {
  const id = useParams().id
  const dispatch = useDispatch()

  const [ blogVisible, setBlogVisible ] = useState(!props.listVisible)
  const ShowOrhide = { display: blogVisible ? 'none' : '' }

  const blog = props.blogs.find(n => n.id === id)
  if (!blog) {
    return null
  }

  const commentForm = () => (
    <Link to={`/blogs/${blog.id}/comments`}
      onClick={() => {
        setBlogVisible(!blogVisible)
        props.history.push(`/blogs/${blog.id}`)
      }}
    >ADD NEW COMMENT
    </Link>
  )

  return(
    <>
      <div style={ShowOrhide}>
        <br />
        <b id='b-left'>{blog.title}</b>by<b id='b-right'>{blog.author}</b>
        <br /><br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes
        <button type='button' className='btn btn-success' id='like-button'
          onClick={() => {
            props.likeBlog({ ...blog, user: blog.user.id })
            props.setMessage(`you liked '${blog.title}'`,'msg',5)
          }}>like</button>
        <br />
        added by {blog.user.name}
        { props.user.name === blog.user.name &&
          <button type='button' id='delete-button' className='btn btn-warning'
            onClick={() => {
              props.history.goBack()
              props.deleteBlog(id)
              props.setMessage(`you deleted '${blog.title}'`,'msg',5)
              dispatch(initializeBlogs())
              setBlogVisible(!blogVisible)
              props.setListVisible(!props.listVisible)
            }}>delete</button>
        }
        <button type='button' id='back-button' className='btn btn-primary'
          onClick={() => {
            props.history.goBack()
            setBlogVisible(!blogVisible)
            props.setListVisible(!props.listVisible)
          }}
          props={{
            ...props,
          }} > go back
        </button>
        <br />
        {commentForm()}
        <br />
        {blog.comments}
        {/* { blog.comments !== null &&
          <>
            <b>Comments</b>
            {blog.comments.map(comment =>
              <li key={comment}>
                {comment}
              </li>
            )}
          </>
        } */}
      </div>

      <Switch>
        <Route path='/blogs/:id/comments'>
          <CommentForm
            blog={blog}
            commentForm={commentForm}
            blogVisible={blogVisible}
            history={props.history}
            setBlogVisible={setBlogVisible}
            setMessage={props.setMessage}
            props={{ ...props }}
          />
        </Route>
      </Switch>
    </>
  )
}

export default Blog
