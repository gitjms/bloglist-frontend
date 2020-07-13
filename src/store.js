import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer, { initializeBlogs } from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import blogService from './services/blogs'

const reducer = combineReducers({
  blogs: blogReducer,
  message: messageReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

blogService.getAll().then(blogs =>
  store.dispatch(initializeBlogs(blogs))
)

export default store