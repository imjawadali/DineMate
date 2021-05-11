import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { withRouter } from 'react-router-dom'

import { customisedAction } from '../../../../redux/actions'

import { Button, ButtonRed, DropDown, Input, Modal, SectionHeading, SmallTitle } from '../../../../components'
import './styles.css'
import { ADD_ADDON, UPDATE_ADDON } from '../../../../constants'

function Add_EditAddOn(props) {

    const defaultAddon = {
        name: '',
        price: 0,
        mandatory: false
    }

    const [addOn, setaddOn] = useState({ ...defaultAddon })

    const processingAddOn = useSelector(({ menuReducer }) => menuReducer.processingAddOn)
    const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
    const dispatch = useDispatch()

    const { restaurantId } = admin
    const { addingEdittingAddOn, selectedAddOn, menuId, cancelModal, history } = props

    useEffect(() => {
            if (selectedAddOn) setaddOn(JSON.parse(JSON.stringify(selectedAddOn)))
            else setaddOn({ ...defaultAddon })
    }, [selectedAddOn])

    const updateAddOn = (key, value) => {
        const tempAddOn = { ...addOn }
        tempAddOn[key] = value
        setaddOn(tempAddOn)
    }

    const addAddOnOptions = (index) => {
        const tempAddOn = { ...addOn }
        const addOnOptions = addOn.addOnOptions || []
        addOnOptions.push({
            name: '',
            price: 0
        })
        tempAddOn.addOnOptions = addOnOptions
        setaddOn(tempAddOn)
    }

    const updateAddOnOption = (index, key, value) => {
        const tempAddOn = { ...addOn }
        const addOnOption = addOn.addOnOptions[index]
        addOnOption[key] = value
        tempAddOn.addOnOptions[index] = addOnOption
        setaddOn(tempAddOn)
    }

    const deleteAddOnOption = (index) => {
        const tempAddOn = { ...addOn }
        const addOnOptions = addOn.addOnOptions
        addOnOptions.splice(index, 1)
        if (addOnOptions.length)
            tempAddOn.addOnOptions = addOnOptions
        else
            delete tempAddOn.addOnOptions
        setaddOn(tempAddOn)
    }

    const update = () => {
        const updatedAddOn = { ...addOn }
        delete updatedAddOn['id']
        dispatch(customisedAction(UPDATE_ADDON, { updatedAddOn, id: addOn.id, restaurantId, history }))
    }

    const add = () => {
        const updatedAddOn = { ...addOn, menuId }
        dispatch(customisedAction(ADD_ADDON, { addOn: updatedAddOn, restaurantId, history }))
    }

    return (
        <Modal display={addingEdittingAddOn}>
            <div>
                <div className="FormContainer" style={{ justifyContent: 'center', borderBottom: 'none' }}>
                    <div className="FormInnerContainer">
                    <SectionHeading text="Add-On Details" />
                    <div className="InputsContainer">
                        <div className="InputsInnerContainer">
                        <SmallTitle text="Add-on Type" style={{ marginTop: '15px' }} />
                        <DropDown
                            placeholder="Select Add-on Type"
                            options={['Mandatory', 'Optional']}
                            value={addOn.mandatory ? 'Mandatory' : addOn.mandatory === 0 ? 'Optional' : null}
                            onChange={({ target: { value } }) => updateAddOn('mandatory', value ? value === 'Mandatory' ? 1 : 0 : null)}
                        />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="FormContainer" style={{ paddingTop: '0px', justifyContent: 'center', borderBottom: 'none' }}>
                    <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
                    <div className="InputsContainer">
                        <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
                        <SmallTitle text="Add-On Name" />
                        <Input 
                            placeholder="Flavour"
                            value={addOn.name}
                            onChange={({ target: { value } }) => updateAddOn('name', value)}
                        />
                        </div>
                    </div>
                    </div>
                    <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
                    <div className="InputsContainer">
                        <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
                        <SmallTitle text="Add-On Price (Optional)" />
                        <Input 
                            placeholder="0.2 ($)"
                            type="number"
                            value={addOn.price}
                            onChange={({ target: { value } }) => updateAddOn('price', value < 0 ? value * -1 : value)}
                        />
                        </div>
                    </div>
                    </div>
                </div>
                {addOn.addOnOptions && addOn.addOnOptions.length ?
                    addOn.addOnOptions.map((option, index) =>
                    <div key={index} className="FormContainer" style={{ paddingTop: '0px', justifyContent: 'center', borderBottom: 'none' }}>
                    <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
                        <div className="InputsContainer">
                        <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
                            <SmallTitle text={`Option # ${index+1}`} />
                            <Input 
                            placeholder="Cheesy"
                            value={option.name}
                            onChange={({ target: { value } }) => updateAddOnOption(index, 'name', value)}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="FormInnerContainer" style={{ paddingTop: '0px' }}>
                        <div className="InputsContainer">
                        <div className="InputsInnerContainer" style={{ paddingTop: '0px' }}>
                            <SmallTitle text="Price (Optional)" />
                            <Input 
                            placeholder="0.33 ($)"
                            type="number"
                            value={option.price}
                            onChange={({ target: { value } }) => updateAddOnOption(index, 'price', value < 0 ? value * -1 : value)}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="ButtonContainer OptionButtonContainer">
                        <i className="fa fa-arrow-left temp" style={{ marginRight: '10px' }}/>
                        <i className="fa fa-trash fa-2x DeleteIcon"
                            onClick={() => deleteAddOnOption(index)}
                        />
                    </div>
                    </div>)
                : null}
                <div className="FormContainer" style={{ padding: '0px', justifyContent: 'center' }}>
                    <div className="ButtonContainer" style={{ paddingTop: '0px' }}>
                        <Button
                            text={addOn.addOnOptions && addOn.addOnOptions.length ? "Add more options" : "Add options"}
                            iconLeft={<i className="fa fa-plus" />}
                            onClick={() => addAddOnOptions()}
                        />
                    </div>
                </div>
                <div className="FormContainer" style={{ padding: '0px', justifyContent: 'center' }}>
                    <div className="ButtonContainer" style={{  }}>
                        <ButtonRed
                            text="Cancel"
                            iconLeft={<i className="fa fa-times-circle" />}
                            onClick={() => cancelModal()}
                        />
                        <Button
                            text="Submit"
                            style={{ marginLeft: '15px' }}
                            light={processingAddOn}
                            lightAction={() => null}
                            iconLeft={<i className="fa fa-send" />}
                            onClick={() => selectedAddOn ? update() : add()}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default withRouter(Add_EditAddOn)