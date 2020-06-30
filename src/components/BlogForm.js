import React from 'react'

const BlogForm = ({addBlog,newTitle,handleTitleChange,newAuthor,handleAuthorChange,newUrl,handleUrlChange,newLikes,handleLikesChange,replaceTitle}) => {
    return (
        <div className='col-auto'>
        <br />
        <b>Add new blog</b>
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
            {/* <div align='left' className='form-group'>
                <label id='formlabel' htmlFor='likes'>likes:</label>
                <input id='likes' type='text' className='form-control'
                    value={newLikes}
                    onChange={handleLikesChange}
                />
            </div> */}
            <div align='left' className='form-group'>
                <button className='btn btn-primary' type='submit' onClick={replaceTitle}>
                    add
                </button>
            </div>
        </form>
        </div>
    )
}

export default BlogForm
