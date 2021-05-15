import React from 'react'

import { Separator, SmallButton } from '../../../../components'

function AddOnsList(props) {
  
  const { addOns, editting, showAddOnModal } = props

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Options</th>
            {editting && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {addOns && addOns.length ?
            addOns.map((addOn) => {
              const { id, name, price, mandatory, addOnOptions } = addOn
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{!addOnOptions.length ? `$ ${price}` : '-'}</td>
                  <td>{mandatory ? 'Mandatory' : 'Optional'}</td>
                  <td>{addOnOptions && addOnOptions.length ?
                      addOnOptions.map((option, index) => <div key={option.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>{option.name}</p><p>$ {option.price}</p></div>
                        {index !== (addOnOptions.length - 1) ? <Separator /> : null}
                      </div>)
                    : 'No Options'
                  }</td>
                  {editting &&
                    <td>
                      <SmallButton
                        style={{ width: '100%' }}
                        text="Edit"
                        iconLeft={<i className="fa fa-edit" />}
                        onClick={() => showAddOnModal(addOn)} />
                    </td>
                  }
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
