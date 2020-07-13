import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Filter from './Filter'
import Blog from './Blog'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'

const Blogs = (props) => {
  const hideOrShow = { display: props.visible ? 'none' : '' }

  const bloglist = () => (
    props.blogs.map(blog =>
      <li id='boxed' className='list-group-item' key={blog.id}>
        <Link
          to={`/blogs/${blog.id}`}
          onClick={() => {
            props.setVisible(true)
            props.history.push('/blogs')
          }}
        >{blog.title}
        </Link>
      </li>
    )
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
        <div>
          <ul>
            {bloglist()}
          </ul>
        </div>
      </div>

      <Switch>
        {/* <Route path='/create'>
          <BlogForm
            props={{
              ...props,
              setVisible: props.setVisible,
              history: props.history
            }}
          />
        </Route> */}
        <Route path='/blogs/:id'>
          <Blog
            props={{
              ...props,
              visible: props.visible,
              setVisible: props.setVisible,
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