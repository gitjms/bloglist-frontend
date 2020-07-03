import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const user = { name: 'Jaska Jokunen' }
  const blog = {
    title: 'Some Important Blog Title',
    author: 'Some Guy or Gal',
    url: 'http://testblogadrress.com/',
    likes: 10,
    user: {
      name: 'Jaska Jokunen'
    }
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} user={user} blog={blog}
        likeBlog={mockHandler} deleteBlog={mockHandler}/>
    )
  })

  test('renders content', () => {
    // component.debug()

    expect(component.container).toHaveTextContent('Some Important Blog Title')

    const element = component.getAllByText('Some Important Blog Title')
    expect(element).toBeDefined()

    const div = component.container.querySelector('.blogClosed')
    expect(div).toHaveTextContent('Some Important Blog Title')

    // const a = component.container.querySelector('a')
    // console.log(prettyDOM(a))
  })

  test('clicking the button calls event handler once', async () => {
    const buttonLike = component.getByText('+1')
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('clicking the button twice calls event handler twice', async () => {
    const buttonLike = component.getByText('+1')
    fireEvent.click(buttonLike)[2]

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('renders only title, author at start', () => {
    const divClosed = component.container.querySelector('.blogClosed')

    expect(divClosed).toHaveTextContent('Some Important Blog Title')
    expect(divClosed).toHaveTextContent('Some Guy or Gal')
    expect(divClosed).not.toHaveTextContent(10)
    expect(divClosed).not.toHaveTextContent('http://testblogadrress.com/')
    expect(divClosed).not.toHaveTextContent({ name: 'Jaska Jokunen' })
  })

  test('renders title, author, likes, url and user after clicking the button `show`', async () => {
    const buttonShow = component.getByText('show')
    fireEvent.click(buttonShow)

    const div = component.container.querySelector('.blogOpened')

    expect(div).toHaveTextContent('Some Important Blog Title')
    expect(div).toHaveTextContent('Some Guy or Gal')
    expect(div).toHaveTextContent('http://testblogadrress.com/')
    expect(div).toHaveTextContent('Likes: 10')
    expect(div).toHaveTextContent('Jaska Jokunen')
  })

})