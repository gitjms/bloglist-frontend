import React from 'react'
import { useSelector } from 'react-redux'

const ErrorMessage = () => {
  const message = useSelector(({ message }) => {
    if ( message !== null ) {
      return message
    }
    return null
  })

  const errorMessageStyle = {
    color: 'rgb(255, 0, 0)',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={errorMessageStyle} >
      {message}
    </div>
  )
}

export default ErrorMessage
