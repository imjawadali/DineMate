import React from 'react'

import { Separator, SmallButton } from '../../../../components'

function AddOnsList(props) {
  
  const { addOns } = props

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Options</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addOns && addOns.length ?
            addOns.map((category) => {
              const { id, name, price, mandatory, addOnOptions } = category
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>$ {price}</td>
                  <td>{mandatory ? 'Mandatory' : 'Optional'}</td>
                  <td>{addOnOptions && addOnOptions.length ?
                      addOnOptions.map((option, index) => <div key={option.id}>
                        <p>{option.name}</p>
                        {index !== (addOnOptions.length - 1) ? <Separator /> : null}
                      </div>)
                    : 'No Options'
                  }</td>
                  <td>
                    <SmallButton
                      style={{ width: '100%' }}
                      text="Edit"
                      iconLeft={<i className="fa fa-edit" />}
                      onClick={() => null} />
                  </td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No Data Found!</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default AddOnsList
