import React from 'react'

function AddOnsList(props) {
  
  const { itemName, quantity, itemPrice, itemTotalPrice, addOns } = props

  return (
    <div className="HorizontalScrollContainer">
      <table>
        <thead>
          <tr>
            <th />
            <th>Item Name</th>
            <th>Add-on</th>
            <th>Add-on Option</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td colSpan="3">{itemName}</td>
            <td style={{ textAlign: 'end' }}>{quantity}</td>
            <td style={{ textAlign: 'end' }}>$ {itemPrice}</td>
          </tr>
          {addOns && addOns.length ?
            addOns.map((category) => {
              const { id, name, option, price } = category
              return (
                <tr key={id}>
                  <td />
                  <td />
                  <td>{name}</td>
                  <td>{option && option !== 'null' ? option : '-'}</td>
                  <td />
                  <td style={{ textAlign: 'end' }}>$ {price}</td>
                </tr>
              )
            }) : 
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No Add-ons Added!</td>
            </tr>
          }
          <tr>
            <td style={{ fontWeight: 'bold' }}>Total</td>
            <td colSpan="4" />
            <td style={{ fontWeight: 'bold', textAlign: 'end' }}>$ {itemTotalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AddOnsList
