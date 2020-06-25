import React from 'react'

const Blog = ({values,deleteBlog}) => {

  return (
    <div className='list-group'>
      <li className='list-group-item list-group-item-action'>
        {values.title}
        <span style={{margin: '5px'}} />
        {values.author}
        <span style={{margin: '5px'}} />
        {values.url}
        <span style={{margin: '5px'}} />
        {values.likes}
        <button type='button' className='btn btn-warning' id='listbtn' style={{marginLeft: '5px'}} onClick={deleteBlog}>delete</button>
      </li>
    </div>
  )
}

export default Blog
