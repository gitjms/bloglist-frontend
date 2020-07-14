import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ props }) => {
  const id = useParams().id

  const ShowOrhide = { display: props.visible ? '' : 'none' }

  const user = props.users.find(user => user.id === id)
  if (!user) {
    return null
  }

  const userBlogs = props.blogs.map(blog => {
    return blog.user.name === user.name
      ? blog : null
  }).filter(blog => !!blog)
  console.log('One User',userBlogs)

  return(
    <div className='col-auto' style={ShowOrhide}>
      <div>
        <br />
        <h2>{user.name}</h2>
        {userBlogs.length > 0
          ? <>
            <b>added blogs</b>
            <div className='col-auto'>
              <ul>
                {userBlogs.map(blog =>
                  <li key={blog.id}>
                    {blog.title}
                  </li>
                )}
              </ul>
            </div>
          </>
          : <b>no added blogs</b>
        }
      </div>
      <button type='button' className='btn btn-primary'
        onClick={() => {
          props.history.goBack()
          props.setVisible(!props.visible)
        }}
        props={{
          ...props,
        }} >back
      </button>
    </div>
  )
}

export default User
