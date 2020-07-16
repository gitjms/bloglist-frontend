import React, { useState } from 'react'
import { useField } from '../hooks'

const CommentForm = (props) => {
  const Scroll = require('react-scroll')
  const scroller = Scroll.animateScroll

  const [ form, setForm ] = useState(!props.listVisible)

  const newComment = useField(form)

  const handleReset = (event) => {
    event.preventDefault()
    newComment.onReset(event)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setForm(true)

    try {
      props.addComment({
        content: newComment.value,
        blog: props.blog.id
      })
      props.initializeBlogs()
      props.setMessage(`added comment '${newComment.value}'`,'msg',5)
    } catch (exception) {
      props.setMessage(exception,'err',10)
    }

    scroller.scrollToTop()
    handleReset(event)
  }

  const size = {
    width: '400px',
    marginBottom: '10px'
  }

  return (
    <div className='input-group' style={size}>
      <input className='form-control' {...newComment} placeholder='comment here...' />
      <button className='btn btn-primary' type='submit'
        onClick={handleSubmit}>
        add comment
      </button>
    </div>
  )
}

export default CommentForm
