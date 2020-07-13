import React, { useState } from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { initializeBlogs, createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'


const BlogForm = (props) => {
  const dispatch = useDispatch()

  const [ form, setForm ] = useState(true)
  const ShowOrhide = { display: props.visible ? '' : 'none' }

  const newTitle = useField(form)
  const newAuthor = useField(form)
  const newUrl = useField(form)

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
      dispatch(createBlog(newBlog))
      console.log(newTitle.value)
      dispatch(setMessage(`added \`${newTitle.value}\``,'msg',5))
    } catch (exception) {
      dispatch(setMessage(`error: \`${exception}\``,'err',5))
    }

    dispatch(initializeBlogs())
    props.setVisible(!props.visible)
    props.history.goBack()
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
              props.setVisible(!props.visible)
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
