import React, {useState, useImperativeHandle} from 'react'


const Togglable = React.forwardRef((props, ref) => {

  const Scroll = require('react-scroll')
  const scroller = Scroll.animateScroll

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    if (visible) {
      scroller.scrollToTop()
    }
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className='btn-group' role="group">
      <div style={hideWhenVisible}>
        <button className='btn btn-primary'type='submit'
          onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='btn btn-primary'type='submit' style={{float: "right"}}
          onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable