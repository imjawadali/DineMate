import React from 'react'

function CartItemsList(props) {

    const { items, taxPercentage, existingOrder, editItem, deleteItem } = props

    var sum = 0

    const getDiscountAmount = (foodTotal) => {
        if (existingOrder && existingOrder.discount) {
            const discount = existingOrder.discount.replace('%', '').replace('$', '')
            if (discount !== 0) {
                if (existingOrder.discount.includes('%')) {
                    return Number((foodTotal * discount) / 100)
                } else return Number(discount)
            } else return 0
        } else return 0
    }

    const getSubTotal = (foodTotal) => {
        return foodTotal - getDiscountAmount(foodTotal)
    }

    const getTaxAmount = (amount) => {
        return ((amount * taxPercentage) / 100)
    }

    const getTipAmount = () => {
        if (existingOrder && existingOrder.tip !== '0.00') {
            return existingOrder.tip
        } else return 0
    }

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
                        items.map((item, index) => {
                            const { id, quantity, name, totalPrice, specialInstructions, addOns } = item
                            sum += totalPrice
                            return (<>
                                <tr key={id + index}>
                                    <td style={{ textAlign: 'center' }}>{quantity}</td>
                                    <td>x</td>
                                    <td style={{ width: '30vw' }}>
                                        <p>{name}</p>
                                        <p>{addOns && addOns.length ?
                                            addOns.map((addon, index) => {
                                                return (`
                                                    ${addon.addOnOption && addon.addOnOption !== 'null' ?
                                                        addon.addOnOption : addon.addOnName}
                                                    ${addon.price ? '($ ' + addon.price + ')' : ''}
                                                    ${index !== addOns.length - 1 ? ',' : ''}
                                                `)
                                            })
                                            : null}</p>
                                        <p style={{ color: 'red' }}>{specialInstructions}</p>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>$ {totalPrice}</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div className="OrderDetailsActionButtons" style={{ backgroundColor: 'rgb(180, 198, 231)' }}
                                                onClick={() => editItem(item, index)}>
                                                Edit
                                            </div>
                                            <div className="OrderDetailsActionButtons" style={{ backgroundColor: 'rgb(248, 203, 173)' }}
                                                onClick={() => deleteItem(index)}>
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
                    {existingOrder ?
                        existingOrder.items && existingOrder.items.length ?
                            existingOrder.items.map((item) => {
                                const { id, quantity, name, totalPrice, specialInstructions, addOns } = item
                                const addOnsArray = addOns ? JSON.parse(addOns) : null
                                sum += totalPrice
                                return (<>
                                    <tr key={id} style={{ opacity: 0.5 }}>
                                        <td style={{ textAlign: 'center' }}>{quantity}</td>
                                        <td>x</td>
                                        <td style={{ width: '30vw' }}>
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
                                        <td />
                                    </tr>
                                    <tr><td style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                                </>)
                            })
                            : <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>No Submitted Items!</td>
                            </tr>
                        : null
                    }
                    <tr style={{ border: 'none' }}>
                        <td colSpan={2} />
                        <td>Sub Total</td>
                        <td style={{ textAlign: 'center' }}>$ {sum.toFixed(2)}</td>
                        <td />
                    </tr>
                    {getDiscountAmount(sum) ? <tr style={{ border: 'none' }}>
                        <td colSpan={2} />
                        <td>Discount</td>
                        <td style={{ textAlign: 'center' }}>$ {getDiscountAmount(sum).toFixed(2)} ({existingOrder.discount})</td>
                        <td />
                    </tr> : null}
                    <tr style={{ border: getTipAmount() ? 'none' : '' }}>
                        <td colSpan={2} />
                        <td>Tax</td>
                        <td style={{ textAlign: 'center' }}>$ {getTaxAmount(getSubTotal(sum)).toFixed(2)} (${taxPercentage}%)</td>
                        <td />
                    </tr>
                    {getTipAmount() ? <tr>
                        <td colSpan={2} />
                        <td>Tip</td>
                        <td style={{ textAlign: 'center' }}>$ {getTipAmount()}</td>
                        <td />
                    </tr> : null}
                    <tr>
                        <td colSpan={2} />
                        <td style={{ fontWeight: 'bold' }}>Total</td>
                        <td style={{ fontWeight: 'bold', textAlign: 'center' }}>$ {(getSubTotal(sum) + getTaxAmount(getSubTotal(sum)) + Number(getTipAmount())).toFixed(2)}</td>
                        <td />
                    </tr>
                    <tr><td style={{ backgroundColor: 'white', margin: '10px 0px' }} /></tr>
                </tbody>
            </table>
        </div>
    )
}

export default CartItemsList;