import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import User from './User'
import { deleteUser } from '../reducers/userReducer'
import { setMessage } from '../reducers/messageReducer'

const Users = (props) => {
  console.log('Users',props)
  const hideOrShow = { display: props.visible ? 'none' : '' }

  const usertable = () => (
    <table className='table-hover'>
      <tbody>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {props.users.map(user =>
          <tr key={user.id}>
            <td>
              <Link
                to={`/users/${user.id}`}
                onClick={() => {
                  props.setVisible(true)
                  props.history.push('/users')
                }}
              >{user.name}
              </Link>
            </td>
            <td style={{ textAlign: 'right' }}>
              {Object.keys(user.blogs).length}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )

  return (
    <>
      <div style={hideOrShow}>
        <br />
        {/* <Filter /> */}
        <h2>Users</h2>
        {/* <div>
          {props.user !== null
            ? props.blogForm()
            : null
          }
        </div> */}
        <div>
          <ul>
            {usertable()}
          </ul>
        </div>
      </div>

      <Switch>
        {/* <Route path='/create'>
          <BlogForm
            props={{
              ...props,
              setVisible: props.setVisible,
              history: props.history
            }}
          />
        </Route> */}
        <Route path='/users/:id'>
          <User
            props={{
              ...props,
              visible: props.visible,
              setVisible: props.setVisible,
              history: props.history,
              setMessage: props.setMessage
            }}
          />
        </Route>
      </Switch>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  deleteUser,
  setMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)