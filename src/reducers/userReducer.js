import userService from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export const createUser = (user) => {
  return async dispatch => {
    const newUser = await userService.create(user)
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}

export const deleteUser = (id) => {
  return async dispatch => {
    const deletedUser = await userService.remove(id)
    dispatch({
      type: 'DELETE_USER',
      data: deletedUser
    })
  }
}

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.data
  case 'NEW_USER':
    return [...state, action.data]
  case 'DELETE_USER':
    return [...state, action.data]
  default:
    return state
  }
}

export default userReducer