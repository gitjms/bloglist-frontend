import React, { useState } from 'react'


const Blog = ({ user,blog,likeBlog,deleteBlog }) => {

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible} id='boxed' className='blogClosed'>
        <li className='list-group-item'>
          <table>
            <tbody>
              <tr>
                <td style={{ width: '500px' }}><em><a href={blog.url}>{blog.title}</a></em>
                  <em>{blog.author}</em></td>
                <td style={{ width: '50px' }}>
                  <button type='button' id='show-button' className='btn btn-primary'
                    onClick={() => setVisible(true)}>show
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </li>
      </div>
      <div style={showWhenVisible} id='boxed' className='blogOpened'>
        <li className='list-group-item'>
          <table>
            <tbody>
              <tr>
                <td style={{ width: '500px' }}><em><a href={blog.url}>{blog.title}</a></em>
                  <em>{blog.author}</em></td>
                <td style={{ width: '50px' }}><button type='button' className='btn btn-primary'
                  onClick={() => setVisible(false)}>hide</button>
                </td>
              </tr>
            </tbody>
          </table>
        </li>
        <li className='list-group-item'>
          {blog.url}
        </li>
        <li className='list-group-item'>
          <div>
            Likes: {blog.likes}
            <button type='button' className='btn btn-success' id='like-button'
              style={{ paddingLeft: '10px', width: '60px', marginLeft: '10px' }}
              onClick={likeBlog}>+1</button>
          </div>
        </li>
        <li className='list-group-item'>
          <table>
            <tbody>
              <tr>
                <td style={{ width: '390px' }}>
                  {blog.user.name}
                </td>
                {user.name === blog.user.name &&
                  <td style={{ width: '60px' }}>
                    <button type='button' id='delete-button' className='btn btn-warning'
                      onClick={deleteBlog}>delete</button>
                  </td>
                }
              </tr>
            </tbody>
          </table>
        </li>
      </div>
    </>
  )
}

export default Blog
