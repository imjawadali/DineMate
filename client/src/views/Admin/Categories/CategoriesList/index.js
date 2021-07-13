import React from 'react'

import { TableActionicons } from '../../../../components'

function CategoriesList(props) {
  
  const { categories, selectedCategory, fetchingCategories, onSelect, onDelete, reset } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th>Manage</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.length ?
            categories.map((category) => {
              const { id, name } = category
              return (
                <tr key={id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <TableActionicons
                        style={{ paddingLeft: '20px', paddingRight: '50px' }}
                        icon="fa-trash"
                        onClick={() => onDelete(id)}
                      />
                      <TableActionicons
                        icon="fa-edit"
                        style={{ color: selectedCategory && selectedCategory.id === id ? '#3ae175' : '' }}
                        onClick={() => selectedCategory && selectedCategory.id === id ? reset() : onSelect(category)}
                      />
                    </div>
                  </td>
                  <td style={{ width: '65vw'}}>{name}</td>
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
