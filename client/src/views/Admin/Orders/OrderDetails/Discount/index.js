import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Modal, Input, Button, DropDown } from '../../../../../components'
import { SET_TOAST, SET_TOAST_DISMISSING } from '../../../../../constants'
import { customisedAction } from '../../../../../redux/actions'

function Discount(props) {

    const [discount, setdiscount] = useState('')
    const [discountType, setdiscountType] = useState('')
    const dispatch = useDispatch()

    const { showDiscountModal, applyDiscount, cancelDiscountModal } = props

    const checkRequired = () => {
        if (!discount) return "Discount amount or percentage is required"
        if (!discountType) return "Discount type is required"
        return false
    }

    return (
        <Modal width={'60%'} display={showDiscountModal}>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', textAlign: 'end', marginBottom: '10px' }}>
                    <i className="fa fa-times fa-lg"
                        style={{ textAlign: 'end', cursor: 'pointer' }}
                        onClick={cancelDiscountModal} />
                </div>
                <Input
                    placeholder="Enter discount amount or percentage"
                    value={discount}
                    onChange={({ target: { value } }) => setdiscount(value)}
                />
                <DropDown
                    placeholder="Select type"
                    options={['$', '%']}
                    value={discountType}
                    onChange={({ target: { value } }) => setdiscountType(value)}
                />
                <Button
                    text="Submit"
                    light={checkRequired()}
                    lightAction={() => {
                        dispatch(customisedAction(SET_TOAST_DISMISSING))
                        dispatch(customisedAction(SET_TOAST, { message: checkRequired(), type: 'error' }))
                    }}
                    onClick={() => applyDiscount(discount, discountType)}
                />
            </div>
        </Modal>
    )
}

export default Discount