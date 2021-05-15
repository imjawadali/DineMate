import React from 'react'

import { SmallButton, SmallButtonRed } from '../../../../components'

function CategoriesList(props) {
  
  const { categories, selectedCategory, fetchingCategories, onSelect, onDelete, reset } = props

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Action</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.length ?
            categories.map((category) => {
              const { id, name } = category
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>
                    <SmallButtonRed
                      style={{ width: '100%' }}
                      text="Delete"
                      iconLeft={<i className="fa fa-trash" />}
                      onClick={() => onDelete(id)} />
                  </td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Select"
                      light={selectedCategory && selectedCategory.id === id}
                      lightAction={() => reset()}
                      iconLeft={<i className="fa fa-edit" />}
                      onClick={() => onSelect(category)} />
                  </td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                {fetchingCategories ?
                  <p><i className={`fa fa-refresh ${fetchingCategories ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Categories . . .</p>
                  : 'No Data Found!'
                }
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesList
