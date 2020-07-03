import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('BlogForm updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, { target: { title: 'Some Important Blog Title' } })
    fireEvent.change(inputAuthor, { target: { author: 'Some Guy or Gal' } })
    fireEvent.change(inputUrl, { target: { url: 'http://testblogadrress.com/' } })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(inputTitle.title).toBe('Some Important Blog Title')
    expect(inputAuthor.author).toBe('Some Guy or Gal')
    expect(inputUrl.url).toBe('http://testblogadrress.com/')

  })

})