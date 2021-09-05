import React from 'react'

import { Separator, TableActionicons } from '../../../../components'

function AddOnsList(props) {

  const { addOns, editting, showAddOnModal } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            {editting && <th>Manage</th>}
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {addOns && addOns.length ?
            addOns.map((addOn) => {
              const { id, name, price, mandatory, addOnOptions } = addOn
              return (
                <tr key={id}>
                  {editting && <td>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <TableActionicons
                        icon="fa-edit"
                        onClick={() => showAddOnModal(addOn)}
                      />
                    </div>
                  </td>}
                  <td>{name}</td>
                  <td>{!addOnOptions.length ? `${price.toFixed(2)} $` : '-'}</td>
                  <td>{mandatory ? 'Mandatory' : 'Optional'}</td>
                  <td>{addOnOptions && addOnOptions.length ?
                    addOnOptions.map((option, index) => <div key={option.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}><p>{option.name}</p><p>{option.price.toFixed(2)} $</p></div>
                      {index !== (addOnOptions.length - 1) ? <Separator /> : null}
                    </div>)
                    : 'No Options'
                  }</td>
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
