import React, { useState } from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'

const BlogForm = (props) => {
  const dispatch = useDispatch()
  const Scroll = require('react-scroll')
  const scroller = Scroll.animateScroll

  const [ form, setForm ] = useState(props.listVisible)
  const ShowOrhide = { display: props.listVisible ? '' : 'none' }

  const newTitle = useField(form)
  const newAuthor = useField(form)
  const newUrl = useField(form)

  const handleReset = (event) => {
    event.preventDefault()
    newTitle.onReset(event)
    newAuthor.onReset(event)
    newUrl.onReset(event)
    scroller.scrollToTop()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setForm(true)

    const newBlog = {
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      user: props.user.name
    }

    try {
      dispatch(props.createBlog(newBlog))
      props.setMessage(`added \`${newTitle.value}\``,'msg',5)
    } catch (exception) {
      props.setMessage(`error: \`${exception}\``,'err',5)
    }

    props.initializeBlogs()
    props.setListVisible(!props.listVisible)
    props.history.goBack()
    scroller.scrollToTop()
  }

  const styling = {
    float: 'left',
    marginTop: '12px'
  }

  return (
    <div className='col-auto' style={ShowOrhide}>
      <br />
      <b>Add a new blog</b>
      <form>
        <div align='left' className='form-group'>
          <label id='formlabel'>title:</label>
          <input className='form-control' {...newTitle} />
        </div>
        <div align='left' className='form-group'>
          <label id='formlabel'>author:</label>
          <input className='form-control' {...newAuthor} />
        </div>
        <div align='left' className='form-group'>
          <label id='formlabel'>url:</label>
          <input className='form-control' {...newUrl} />
        </div>
        <div align='left' className='form-group'>
          <button className='btn btn-primary' id='add-button' type='submit'
            style={styling}
            onClick={handleSubmit}>
            add
          </button>
          <button className='btn btn-primary' id='reset-button' type='button'
            style={styling} onClick={handleReset} >
            reset
          </button>
        </div>
        <div align='right' className='form-group'>
          <button className='btn btn-primary' id='formback-button' type='button'
            onClick={() => {
              props.setListVisible(!props.listVisible)
              props.history.goBack()
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

export default BlogForm
