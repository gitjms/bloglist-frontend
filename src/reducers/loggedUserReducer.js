export const setLoggedUser = ( content ) => {
  return {
    type: 'SET_LOGGEDUSER',
    content
  }
}

const loggedUserReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_LOGGEDUSER':
    return action.content
  default:
    return state
  }
}

export default loggedUserReducer