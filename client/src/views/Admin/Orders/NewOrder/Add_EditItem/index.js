import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Modal, Input, Button } from '../../../../../components'
import { SET_TOAST } from '../../../../../constants'
import { customisedAction } from '../../../../../redux/actions'
import './styles.css'

function Add_EditItem(props) {

    const [radioAddOns, setradioAddOns] = useState([])
    const [checkoxAddOns, setcheckoxAddOns] = useState([])
    const [itemToSubmit, setitemToSubmit] = useState({})
    const dispatch = useDispatch()

    const { addingEdittingItem, item, itemToEdit, submitItem, updateItem, cancelModal } = props

    useEffect(() => {
        if (item) {
            if (item.addOns && item.addOns.length) {
                setradioAddOns(item.addOns.filter(addOn => addOn.addOnOptions && addOn.addOnOptions.length))
                setcheckoxAddOns(item.addOns.filter(addOn => !addOn.addOnOptions || !addOn.addOnOptions.length))
            } else {
                setradioAddOns([])
                setcheckoxAddOns([])
            }
        } else {
            cancelModal()
            if (item === undefined)
                dispatch(customisedAction(SET_TOAST, { message: 'Item not found in menu', type: 'error' }))
        }

        if (item && !itemToEdit) {
            setitemToSubmit({
                itemId: item.id,
                quantity: 1,
                name: item.name,
                price: item.price,
                totalPrice: item.price
            })
        }
    }, [item])

    useEffect(() => {
        if (itemToEdit) setitemToSubmit(JSON.parse(JSON.stringify(itemToEdit)))
    }, [itemToEdit])

    const updateSpecialInstructions = (text) => {
        const tempItem = { ...itemToSubmit }
        if (text) tempItem.specialInstructions = text
        else delete tempItem['specialInstructions']
        setitemToSubmit(tempItem)
    }

    const updateAddOn = (addOn) => {
        const tempItem = { ...itemToSubmit }
        let addOns = tempItem.addOns || []
        if (addOns && addOns.length) {
            const index = addOns.findIndex(x => x.addOnId === addOn.addOnId);
            if (index !== -1) {
                addOns = addOns.filter(x => x.addOnId !== addOn.addOnId)
                if (addOn.addOnOptionId) addOns.push(addOn)
            } else addOns.push(addOn)
        } else addOns.push(addOn)
        tempItem.addOns = addOns
        setitemToSubmit(tempItem)
    }

    const setQuantity = (quantity) => {
        const tempItem = { ...itemToSubmit }
        tempItem.quantity = quantity
        setitemToSubmit(tempItem)
    }

    const getTotalPrice = () => {
        if (itemToSubmit.quantity) {
            let totalPrice = itemToSubmit.price
            const addOns = itemToSubmit.addOns
            if (addOns && addOns.length) {
                for (let i = 0; i < addOns.length; i++) {
                    totalPrice += addOns[i].price
                }
            }
            return Number((totalPrice * itemToSubmit.quantity))
        }
    }

    const checkRequired = () => {
        if (radioAddOns && radioAddOns.length) {
            const required = radioAddOns.filter(addOn => addOn.mandatory).map(addOn => addOn.id)
            if (required.length) {
                if (itemToSubmit) {
                    const addOns = itemToSubmit.addOns
                    if (addOns && addOns.length) {
                        const submited = addOns.filter(addOn => addOn.mandatory).map(addOn => addOn.addOnId)
                        if (submited.length == required.length) {
                            return false
                        } else return true
                    } else return true
                } else return true
            } else return false
        } else return false
    }

    return (
        <Modal width={window.innerWidth < 480 ? '80%' : '40%'} display={addingEdittingItem}>
            {item && <div className="NewOrderItemModalContainer">
                <div style={{ width: '100%', textAlign: 'end' }}>
                    <i className="fa fa-times fa-lg"
                        style={{ textAlign: 'end', cursor: 'pointer' }}
                        onClick={cancelModal} />
                </div>
                <div style={{ borderBottom: '1px solid grey', marginTop: '10px', width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <p className="NewOrderItemHeading" style={{ flex: 1, fontWeight: 'bold' }}>{item.name}</p>
                    <p className="NewOrderItemHeading" style={{ marginLeft: '5px' }}>${item.price.toFixed(2)}</p>
                </div>
                {radioAddOns && radioAddOns.length ?
                    radioAddOns.map(addOn => (
                        <div key={addOn.id} style={{ margin: '10px 0px 20px 0px' }}>
                            <p className="NewOrderAddOnHeading">
                                {addOn.name}
                                {addOn.mandatory ? ' (' : ''}
                                <span style={{ color: 'red' }}>
                                    {addOn.mandatory ? 'required' : ''}
                                </span>
                                {addOn.mandatory ? ')' : ''}
                            </p>
                            {addOn.addOnOptions.map(option => (
                                <label key={addOn.id + option.id} style={{ display: 'flex', alignItems: 'center', margin: '5px 0px' }}>
                                    <input type="radio"
                                        id={addOn.id}
                                        name={addOn.id}
                                        value={option.id}
                                        defaultChecked={
                                            itemToSubmit
                                            && itemToSubmit.addOns
                                            && itemToSubmit.addOns.length
                                            && itemToSubmit.addOns.findIndex(x =>
                                                x.addOnId === addOn.id
                                                && x.addOnOptionId === option.id
                                            ) !== -1
                                        }
                                        onChange={() => updateAddOn({
                                            addOnId: addOn.id,
                                            addOnName: addOn.name,
                                            addOnOptionId: option.id,
                                            addOnOption: option.name,
                                            mandatory: addOn.mandatory,
                                            price: option.price
                                        })}
                                    />
                                    <p className="NewOrderAddOnText" style={{ width: '100%', display: 'inline', marginLeft: '10px' }}>{option.name}</p>
                                    <p className="NewOrderAddOnText" style={{ display: 'inline', marginLeft: '10px' }}>${option.price.toFixed(2)}</p>
                                </label>
                            ))}
                        </div>
                    ))
                    : null
                }
                {checkoxAddOns && checkoxAddOns.length ?
                    <>
                        <p className="NewOrderAddOnHeading">Additional Add-ons</p>
                        {checkoxAddOns.map(addOn => (
                            <label key={addOn.id} style={{ display: 'flex', alignItems: 'center', margin: '5px 0px' }}>
                                <input type="checkbox"
                                    defaultChecked={
                                        itemToSubmit
                                        && itemToSubmit.addOns
                                        && itemToSubmit.addOns.length
                                        && itemToSubmit.addOns.findIndex(x =>
                                            x.addOnId === addOn.id
                                        ) !== -1
                                    }
                                    onChange={() => updateAddOn({
                                        addOnId: addOn.id,
                                        addOnName: addOn.name,
                                        addOnOptionId: null,
                                        addOnOption: null,
                                        price: addOn.price
                                    })}
                                />
                                <p className="NewOrderAddOnText" style={{ width: '100%', display: 'inline', marginLeft: '10px' }}>{addOn.name}</p>
                                <p className="NewOrderAddOnText" style={{ display: 'inline', marginLeft: '10px' }}>${addOn.price.toFixed(2)}</p>
                            </label>
                        ))}
                    </>
                    : null
                }
                <div className="NewOrderAddOnBottomOptions">
                    <div className="NewOrderAddOnQuantity">
                        <i className="fa fa-plus-circle NewOrderAddOnText"
                            onClick={() => setQuantity(itemToSubmit.quantity - 1 || 1)} />
                        <p className="NewOrderAddOnText" style={{ margin: '0px 10px', cursor: 'default' }}>{itemToSubmit.quantity}</p>
                        <i className="fa fa-minus-circle NewOrderAddOnText"
                            onClick={() => setQuantity(itemToSubmit.quantity + 1)} />
                    </div>
                    <p className="NewOrderItemHeading" style={{ marginLeft: '5px' }}>${(getTotalPrice() || 0).toFixed(2)}</p>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <Input
                        style={{ width: '70%' }}
                        placeholder="Special Instructions (if any)"
                        value={itemToSubmit.specialInstructions || ''}
                        onChange={({ target: { value } }) => updateSpecialInstructions(value)}
                    />
                    <Button
                        text={"Submit"}
                        light={checkRequired()}
                        lightAction={() => null}
                        iconLeft={<i className="fa fa-send" />}
                        onClick={() => {
                            itemToSubmit.totalPrice = getTotalPrice()
                            if (itemToEdit) updateItem(itemToSubmit)
                            else submitItem(itemToSubmit)
                        }}
                    />
                </div>
            </div>}
        </Modal>
    )
}

export default Add_EditItem