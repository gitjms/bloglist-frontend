import React from 'react'

const Filter = ({setTitleToFind,titleToFind,handleFindTitleChange}) => {
    return (
        <form onChange={setTitleToFind}>
            <div align="left">
                <label htmlFor="filter">filter shown with:</label>
                <input id="filter" type="text" className="form-control"
                    value={titleToFind}
                    onChange={handleFindTitleChange}
                />
            </div>
        </form>
    )
}

export default Filter