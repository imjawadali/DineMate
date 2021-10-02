import React from 'react'

function AddOnsList(props) {
  
  const { itemName, quantity, itemPrice, itemTotalPrice, addOns } = props

  return (
    <div className="TableDataContainer">
      <table>
        <thead>
          <tr>
            <th />
            <th>Item Name</th>
            <th>Add-on</th>
            <th>Add-on Option</th>
            <th style={{ textAlign: 'center' }}>Quantity</th>
            <th style={{ textAlign: 'center' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td colSpan="3">{itemName}</td>
            <td style={{ textAlign: 'center' }}>{quantity}</td>
            <td style={{ textAlign: 'center' }}>${itemPrice.toFixed(2)}</td>
          </tr>
          {addOns && addOns.length ?
            addOns.map((category) => {
              const { id, addOnName, addOnOption, price } = category
              return (
                <tr key={id}>
                  <td />
                  <td />
                  <td>{addOnName}</td>
                  <td>{addOnOption && addOnOption !== 'null' ? addOnOption : '-'}</td>
                  <td />
                  <td style={{ textAlign: 'center' }}>${price.toFixed(2)}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No Add-ons Added!</td>
            </tr>
          }
          <tr>
            <td style={{ fontWeight: 'bold' }}>Total</td>
            <td colSpan="4" />
            <td style={{ fontWeight: 'bold', textAlign: 'center' }}>${(itemTotalPrice).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AddOnsList
