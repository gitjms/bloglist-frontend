import React from 'react'


const Blog = ({values,likeBlog,replaceTitle,deleteBlog}) => {

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
      <div className='form-inline'>
        <div>
          <span style={{margin: '5px'}} />
          Likes: {values.likes}
          <button type='button' className='btn btn-success' id='listbtnlike' style={{marginLeft: '5px'}} onClick={likeBlog}>+1</button>
          <span style={{marginRight: '10px'}} />
        </div>
        <button type='button' className='btn btn-primary' id='listbtn' style={{marginLeft: '5px'}} onClick={replaceTitle}>change title</button>
        <span style={{marginRight: '10px'}} />
        <button type='button' className='btn btn-warning' id='listbtn' style={{marginLeft: '5px'}} onClick={deleteBlog}>delete</button>
      </div>
    </div>
  )
}

export default Blog
