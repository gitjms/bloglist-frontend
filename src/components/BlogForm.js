import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {

    const [ newTitle, setNewTitle ] = useState('')
    const [ newAuthor, setNewAuthor ] = useState('')
    const [ newUrl, setNewUrl ] = useState('')

    const handleTitleChange = (event) => { setNewTitle(event.target.value) }
    const handleAuthorChange = (event) => { setNewAuthor(event.target.value) }
    const handleUrlChange = (event) => { setNewUrl(event.target.value) }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog = ({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div className='col-auto' id='formbox'>
        <br />
        <b>Add a new blog</b>
        <form onSubmit={addBlog}>
            <div align='left' className='form-group'>
                <label id='formlabel' htmlFor='title'>title:</label>
                <input id='title' type='text' className='form-control'
                    value={newTitle}
                    onChange={handleTitleChange}
                />
            </div>
            <div align='left' className='form-group'>
                <label id='formlabel' htmlFor='author'>author:</label>
                <input id='author' type='text' className='form-control'
                    value={newAuthor}
                    onChange={handleAuthorChange}
                />
            </div>
            <div align='left' className='form-group'>
                <label id='formlabel' htmlFor='url'>url:</label>
                <input id='url' type='text' className='form-control'
                    value={newUrl}
                    onChange={handleUrlChange}
                />
            </div>
            <div align='left' className='form-group'>
                <button className='btn btn-primary' type='submit' style={{float: "left"}}>
                    add
                </button>
            </div>
        </form>
        </div>
    )
}

export default BlogForm
