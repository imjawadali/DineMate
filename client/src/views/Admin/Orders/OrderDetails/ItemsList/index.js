import React from 'react'

function ItemsList(props) {

    const { items, orderDetails } = props

    return (
        <div className="TableDataContainer">
            <table >
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Quantity</th>
                        <th />
                        <th>Item</th>
                        <th style={{ textAlign: 'center' }}>Amount</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.length ?
                        items.map((order) => {
                            const { id, quantity, name, totalPrice, specialInstructions, addOns } = order
                            const addOnsArray = addOns ? JSON.parse(addOns) : null
                            return (<>
                                <tr key={id}>
                                    <td style={{ textAlign: 'center' }}>{quantity}</td>
                                    <td>x</td>
                                    <td style={{ width: '30vw'}}>
                                        <p>{name}</p>
                                        <p>{addOnsArray && addOnsArray.length ?
                                            addOnsArray.map((addon, index) => {
                                                return (`
                                                    ${addon.addOnOption && addon.addOnOption !== 'null' ?
                                                    addon.addOnOption : addon.addOnName}
                                                    ${addon.price ? '($ ' + addon.price + ')' : ''}
                                                    ${index !== addOnsArray.length - 1 ? ',' : ''}
                                                `)
                                            })
                                        : null}</p>
                                        <p style={{ color: 'red' }}>{specialInstructions}</p>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>$ {totalPrice}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div className="OrderDetailsActionButtons" style={{ backgroundColor: 'rgb(180, 198, 231)' }}>
                                                Edit
                                            </div>
                                            <div className="OrderDetailsActionButtons" style={{ backgroundColor: 'rgb(199, 223, 180)' }}>
                                                Split
                                            </div>
                                            <div className="OrderDetailsActionButtons" style={{ backgroundColor: 'rgb(248, 203, 173)' }}>
                                                Void
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr><td style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                            </>)
                        })
                        : <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>No Items Added!</td>
                        </tr>
                    }
                    <tr style={{ border: 'none' }}>
                        <td colSpan={2} />
                        <td>Sub Total</td>
                        <td style={{ textAlign: 'center' }}>$ {orderDetails.foodTotal}</td>
                        <td />
                    </tr>
                    {orderDetails.discountAmount !== '0.00' && <tr style={{ border: 'none' }}>
                        <td colSpan={2} />
                        <td>Discount</td>
                        <td style={{ textAlign: 'center' }}>$ {orderDetails.discountAmount} ({orderDetails.discount})</td>
                        <td />
                    </tr>}
                    <tr style={{ border: orderDetails.tip !== '0.00' ? 'none' : '' }}>
                        <td colSpan={2} />
                        <td>Tax</td>
                        <td style={{ textAlign: 'center' }}>$ {orderDetails.taxAmount}</td>
                        <td />
                    </tr>
                    {orderDetails.tip !== '0.00' && <tr>
                        <td colSpan={2} />
                        <td>Tip</td>
                        <td style={{ textAlign: 'center' }}>$ {orderDetails.tip}</td>
                        <td />
                    </tr>}
                    <tr>
                        <td colSpan={2} />
                        <td style={{ fontWeight: 'bold' }}>Total</td>
                        <td style={{ fontWeight: 'bold', textAlign: 'center' }}>$ {orderDetails.billAmount}</td>
                        <td />
                    </tr>
                    <tr><td style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                </tbody>
            </table>
        </div>
    )
}

export default ItemsList;