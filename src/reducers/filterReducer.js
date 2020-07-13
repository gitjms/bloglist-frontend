export const filterChange = ( type, content ) => {
  return {
    type: 'SET_FILTER',
    content
  }
}

const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
  case 'SET_FILTER':
    return {
      type: action.type,
      content: action.content
    }
  default:
    return state
  }
}

export default filterReducer