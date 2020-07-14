import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const deletedBlog = await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: deletedBlog
    })
  }
}


export const likeBlog = (blog) => {
  return async dispatch => {
    const returnedContent = await blogService.update(
      blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: returnedContent
    })
  }
}


export const commentBlog = (blog) => {
  return async dispatch => {
    const returnedContent = await blogService.comment(blog.id, blog)
    dispatch({
      type: 'COMMENT_BLOG',
      data: returnedContent
    })
  }
}

const findById = (state, id) => {
  return state.find(n => n.id === id)
}

const changedBlog = (state, id, likes) => {
  return {
    ...findById(state, id),
    likes: likes
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : changedBlog(state, action.data.id, action.data.likes)
    )
  case 'COMMENT_BLOG':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : changedBlog(state, action.data.id, action.data.comments)
    )
  default:
    return state
  }
}

export default blogReducer