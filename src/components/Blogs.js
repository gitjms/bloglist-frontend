import React, { useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Filter from './Filter'
import Blog from './Blog'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'

const Blogs = (props) => {

  const [ listVisible, setListVisible ] = useState(props.visible)
  const hideOrShow = { display: listVisible ? 'none' : '' }

  const bloglist = () => (
    <table className='table-striped table-hover'>
      <tbody>
        {props.blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link
                to={`/blogs/${blog.id}`}
                onClick={() => {
                  setListVisible(!listVisible)
                  props.history.push('/blogs')
                }}
              >{blog.title}
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )

  return (
    <>
      <div style={hideOrShow}>
        <br />
        <Filter />
        <h2>Blogs</h2>
        <div>
          {props.user !== null
            ? props.blogForm()
            : null
          }
        </div>
        <br />
        <div>
          {bloglist()}
        </div>
      </div>

      <Switch>
        <Route path='/blogs/:id'>
          <Blog
            props={{
              ...props,
              listVisible: listVisible,
              setListVisible: setListVisible,
              history: props.history,
              setMessage: props.setMessage
            }}
          />
        </Route>
      </Switch>
    </>
  )
}

function compareLikes(a, b) {
  return b.likes - a.likes
}

const mapStateToProps = (state) => {
  if ( state.filter === 'ALL' ) {
    return { blogs: state.blogs.sort(compareLikes) }
  }
  return {
    blogs: state.blogs.filter(blog => blog.title.toLowerCase()
      .includes(state.filter.content.toLowerCase())).sort(compareLikes)
  }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  setMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)