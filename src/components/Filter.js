import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const content = event.target.value
    dispatch(filterChange('SET_FILTER',content))
  }

  return (
    <div className='col-auto'>
      <form onChange={handleChange}>
        <label htmlFor='filter'>filter shown with:</label>
        <input name='filter' type='text' className='form-control' />
      </form>
    </div>
  )
}

export default Filter