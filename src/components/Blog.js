import React from 'react'


const Blog = ({values,likeBlog,deleteBlog}) => {

  return (
    <div className='list-group'>
      <li className='list-group-item list-group-item-action'>
        {values.title}
        <span style={{margin: '5px'}} />
        {values.author}
        <span style={{margin: '5px'}} />
        {values.url}
        <span style={{margin: '5px'}} />
      </li>
      <div className='form d-flex justify-content-between'>
        <div>
          <span style={{margin: '10px'}} />
          Likes: {values.likes}
          <button type='button' className='btn btn-success' id='listbtnlike' style={{marginLeft: '5px'}} onClick={likeBlog}>+1</button>
        </div>
          <button type='button' className='btn btn-warning' id='listbtn' style={{float: 'right'}} onClick={deleteBlog}>delete</button>
      </div>
    </div>
  )
}

export default Blog
