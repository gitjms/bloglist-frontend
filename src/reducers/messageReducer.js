let timeOutList = []

export const setMessage = (text, which, time) => {
  timeOutList.forEach(tout => typeof tout === 'number' ? clearTimeout(tout) : tout)
  return async dispatch => {
    which === 'msg'
      ? await dispatch(messageChange(text, which))
      && timeOutList.push(setTimeout(() => {
        dispatch(messageChange(null))
        timeOutList = []
      }, 1000*time))
      : await dispatch(errorMessageChange(text, which))
      && timeOutList.push(setTimeout(() => {
        dispatch(errorMessageChange(null))
        timeOutList = []
      }, 1000*time))
  }
}

export const messageChange = (text, which) => {
  return {
    type: 'SET_MESSAGE',
    data: { text, which }
  }
}

export const errorMessageChange = (text, which) => {
  return {
    type: 'SET_ERRORMESSAGE',
    data: { text, which }
  }
}

const messageReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.data
  case 'SET_ERRORMESSAGE':
    return action.data
  default:
    return state
  }
}

export default messageReducer