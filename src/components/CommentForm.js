import React, { useState } from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { initializeBlogs, commentBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'


const CommentForm = (props) => {
  const dispatch = useDispatch()

  const [ form, setForm ] = useState(true)
  const [ commentVisible, setCommentVisible ] = useState(props.blogVisible)
  const ShowOrhide = { display: commentVisible ? '' : 'none' }

  const newContent = useField(form)

  const handleSubmit = (event) => {
    event.preventDefault()
    setForm(true)

    const commentedBlog = {
      ...props.blog,
      comments: newContent.value
    }
    console.log(commentedBlog)

    try {
      dispatch(commentBlog(commentedBlog))
      dispatch(setMessage(`added comment\`${newContent.value}\``,'msg',5))
    } catch (exception) {
      dispatch(setMessage(`error: \`${exception}\``,'err',5))
    }

    dispatch(initializeBlogs())
    props.setBlogVisible(!props.visible)
    setCommentVisible(!commentVisible)
    props.history.goBack()
  }

  return (
    <div className='col-auto' style={ShowOrhide}>
      <br />
      <b>Add a new Comment</b>
      <form>
        <div align='left' className='form-group'>
          <label id='formlabel'>comment:</label>
          <input className='form-control' {...newContent} />
        </div>
        <div align='left' className='form-group'>
          <button className='btn btn-primary' id='add-button' type='submit'
            style={{ float: 'left', marginTop: '12px' }}
            onClick={handleSubmit}>
            add
          </button>
          <button className='btn btn-primary' id='reset-button' type='submit'
            style={{ float: 'left', marginTop: '12px' }}
            onClick={() => {
              setForm(false)
            }}>
            reset
          </button>
        </div>
        <div align='right' className='form-group'>
          <button className='btn btn-primary' id='formback-button' type='button'
            onClick={() => {
              props.history.goBack()
              setCommentVisible(!commentVisible)
              props.setBlogVisible(!props.blogVisible)
            }}
            props={{
              ...props,
            }} >back
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentForm
