import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer, { initializeBlogs } from './reducers/blogReducer'
import userReducer, { initializeUsers } from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import blogService from './services/blogs'
import userService from './services/users'

const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  loggedUser: loggedUserReducer,
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

userService.getAll().then(users =>
  store.dispatch(initializeUsers(users))
)

export default store