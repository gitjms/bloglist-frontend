import React from 'react'
import { useSelector } from 'react-redux'

const Message = () => {
  const message = useSelector(({ message }) => {
    if ( message !== null ) {
      return message
    }
    return { which: '' , text: '' }
  })

  const messageStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  }

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
    <div
      style={message.which === 'msg'
        ? messageStyle
        : message.which === 'err'
          ? errorMessageStyle
          : null
      } >
      {message.text}
    </div>
  )
}

export default Message
