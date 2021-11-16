import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { customisedAction } from '../../../../redux/actions';
import { ALREADY_IN_CART, EDIT_ORDER_ITEM, SET_ORDER_ITEM } from '../../../../constants';
import { withRouter } from 'react-router-dom';
import { getItem } from '../../../../helpers';

import '../../styles.css';

const ViewAddon = ({ setViewAddons, selectedItem, updateCart, history, restaurantId, edit, addedAddons, editInded, editedQuantity, RestaurantDetails, ...props }) => {

    const [itemCount, setItemCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [updateComponent, setUpdateComponent] = useState(true);
    const [updatePrice, setupdatePrice] = useState(false)
    const [specialInstructions, setSpecialIntstruction] = useState("")
    const [obj, setObj] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        if (addedAddons) {
            setObj(addedAddons)
        }

    }, [addedAddons])
    useEffect(() => {
        if (edit) {
            setItemCount(editedQuantity)
        }
    }, [editedQuantity])

    let [price, setPrice] = useState(selectedItem.price);
    
    useEffect(() => {
        let arr = []
        let total = 0
        for (let keys in obj) {
            arr.push(obj[keys])
        }
        arr.map((a, i) => price += Number(a.price))
        total += price * itemCount

        setTotalPrice((total || 0).toFixed(2))
        setupdatePrice(false)
    }, [itemCount, obj, price, updatePrice]);

    const saveCart = (obj) => {


        dispatch(customisedAction(SET_ORDER_ITEM, obj))
        setViewAddons(false)



    }

    const addToCart = e => {
        e.preventDefault();
        if (!edit) {


            let arr = []
            for (let keys in obj) {
                arr.push(obj[keys])
            }

            if (JSON.parse(localStorage.getItem('orderDetails')) && JSON.parse(localStorage.getItem('orderDetails')).type.toLowerCase() === 'dine-in') {
                let objItem = {
                    ...selectedItem,
                    addOns: arr,
                    quantity: itemCount,
                    totalPrice: totalPrice,
                    restaurantId: restaurantId,
                    orderNumber: getItem('orderDetails').orderNumber,
                    addOnObj: obj,
                    specialInstructions,
                    RestaurantName: RestaurantDetails.restaurantName,
                    itemId: selectedItem.id
                }
                saveCart(objItem)
            } else {
                let objItem = {
                    ...selectedItem,
                    addOns: arr,
                    quantity: itemCount,
                    totalPrice: totalPrice,
                    restaurantId: restaurantId,
                    addOnObj: obj,
                    itemId: selectedItem.id,
                    specialInstructions,
                    RestaurantName: RestaurantDetails.restaurantName
                }

                let cartMenu = (JSON.parse(localStorage.getItem('cartMenu')) ? JSON.parse(localStorage.getItem('cartMenu')) : []);
                if (cartMenu.length) {
                    if (cartMenu[0].restaurantId === restaurantId) {
                        saveCart(objItem)
                    } else if (cartMenu[0].restaurantId != restaurantId) {
                        dispatch(customisedAction(ALREADY_IN_CART, { message: `You can't order from different resturants at a time`, type: 'warning' }))
                    }
                } else saveCart(objItem)
            }
        } else {
            let arr = []
            for (let keys in obj) {
                arr.push(obj[keys])
            }

            let objItem = {
                ...selectedItem,
                addOns: arr,
                quantity: itemCount,
                totalPrice: totalPrice,
                restaurantId: restaurantId,
                orderNumber: "000000032",
                addOnObj: obj,
                specialInstructions,
                itemId: selectedItem.id
            }
            dispatch(customisedAction(EDIT_ORDER_ITEM, { objItem: objItem, i: editInded }))
            setViewAddons(false)
        }

    }

    useEffect(() => {
        setSpecialIntstruction(props.specialInstructions)
    }, [selectedItem])

    return (
        <div className="add-on-dialog">
            <form onSubmit={e => addToCart(e)}>
                <div className="dialog">

                    <div style={{ display: 'flex', padding: '10px 20px' }}>
                        <FontAwesomeIcon icon={faTimes} className="icon-starz" onClick={() => setViewAddons(false)} />
                    </div>

                    <div className="item-iamge" >
                        <img
                            width='90px'
                            height='90px'
                            src={selectedItem.imageUrl}
                            alt="image"
                            onClick={() => console.log(RestaurantDetails)}
                        />
                    </div>

                    <div className="ice-cap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="ice-cap" style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedItem.name}</h3>
                        <span style={{ marginRight: 8 }}>${totalPrice}</span>
                    </div>

                    <div className="addon-selection-content">
                        {
                            selectedItem.addOns.filter(addOn => addOn.addOnOptions.length > 0).map(addOn => {
                                return (
                                    addOn.mandatory ?
                                        <React.Fragment key={addOn.id}>
                                            <div className="acrdn-hdng" >
                                                <h3 className='acrdn-title'>{addOn.name}</h3>
                                                <small className='req'>{addOn.mandatory ? 'Required' : 'Optional'}</small>
                                            </div>

                                            <div
                                                style={{ position: 'relative' }}>
                                                {
                                                    document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
                                                        ?
                                                        <FontAwesomeIcon
                                                            icon={faAngleUp}
                                                            className="toggle-accordion"
                                                            onClick={() => {
                                                                let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                                addonItemsList.style.display = 'flex';
                                                                setUpdateComponent(!updateComponent)
                                                            }}
                                                        />
                                                        :
                                                        <FontAwesomeIcon
                                                            icon={faAngleDown}
                                                            className="toggle-accordion"
                                                            onClick={() => {
                                                                let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                                addonItemsList.style.display = 'none';
                                                                setUpdateComponent(!updateComponent)
                                                            }}
                                                        />
                                                }
                                            </div>

                                            <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                                                {
                                                    addOn.addOnOptions.length > 0 && addOn.addOnOptions.map(addOnOption => {
                                                        return (
                                                            <React.Fragment key={addOnOption.id}>
                                                                <div className="addon-radio">
                                                                    <div className="addon-check">
                                                                        <input
                                                                            type="radio"
                                                                            required={!!addOn.mandatory}
                                                                            name={addOn.name}
                                                                            className="check"
                                                                            checked={obj[addOn.name] && obj[addOn.name].addOnOption === addOnOption.name ? true : false}
                                                                            onChange={() => {
                                                                                setupdatePrice(true)

                                                                                let objj = { ...obj }
                                                                                objj[addOn.name] = {
                                                                                    "addOnId": addOnOption.id,
                                                                                    "addOnName": addOn.name,
                                                                                    "addOnOptionId": addOnOption.id,
                                                                                    "addOnOption": addOnOption.name,
                                                                                    "price": addOnOption.price
                                                                                }
                                                                                setObj(objj)
                                                                            }}
                                                                        />
                                                                        <small className='radio-txt'>{addOnOption.name}</small>
                                                                    </div>

                                                                    <div className="addon-info">
                                                                        <span className="addon-price">+${(addOnOption.price || 0).toFixed(2)}</span>
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </React.Fragment>
                                        :
                                        <React.Fragment key={addOn.id}>
                                            <div className="acrdn-hdng" >
                                                <h3 className='acrdn-title'>{addOn.name}</h3>
                                                <small className='req'>{addOn.mandatory ? 'Required' : 'Optional'}</small>
                                            </div>

                                            <div
                                                style={{ position: 'relative' }}>
                                                {
                                                    document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
                                                        ?
                                                        <FontAwesomeIcon
                                                            icon={faAngleUp}
                                                            className="toggle-accordion"
                                                            onClick={() => {
                                                                let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                                addonItemsList.style.display = 'flex';
                                                                setUpdateComponent(!updateComponent)
                                                            }}
                                                        />
                                                        :
                                                        <FontAwesomeIcon
                                                            icon={faAngleDown}
                                                            className="toggle-accordion"
                                                            onClick={() => {
                                                                let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                                addonItemsList.style.display = 'none';
                                                                setUpdateComponent(!updateComponent)
                                                            }}
                                                        />
                                                }
                                            </div>

                                            <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                                                {
                                                    addOn.addOnOptions.map(addOnOption => {
                                                        return (
                                                            <React.Fragment key={addOnOption.id}>
                                                                <div className="addon-radio">
                                                                    <div className="addon-check" >
                                                                        <input
                                                                            type="checkbox"
                                                                            required={!!addOn.mandatory}
                                                                            checked={obj[addOnOption.name] ? true : false}
                                                                            onChange={() => {
                                                                                setupdatePrice(true)
                                                                                if (!obj[addOnOption.name]) {
                                                                                    let objj = { ...obj }
                                                                                    objj[addOnOption.name] = {
                                                                                        "addOnId": addOn.id,
                                                                                        "addOnName": addOn.name,
                                                                                        "addOnOptionId": addOn.id,
                                                                                        "addOnOption": addOn.name,
                                                                                        "price": addOnOption.price
                                                                                    }
                                                                                    setObj(objj)
                                                                                } else {
                                                                                    let objj = { ...obj }

                                                                                    delete obj[addOnOption.name]

                                                                                }
                                                                            }}
                                                                            name={addOnOption.name}
                                                                            className="check"
                                                                        />
                                                                        <small className='radio-txt'>{addOnOption.name}</small>
                                                                    </div>

                                                                    <div className="addon-info">
                                                                        <span className="addon-price">+${(addOnOption.price || 0).toFixed(2)}</span>
                                                                    </div>
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </React.Fragment>
                                )
                            })
                        }

                        {
                            selectedItem.addOns.filter(addOn => addOn.addOnOptions.length == 0).map(addOn => {
                                return (
                                    <React.Fragment key={addOn.id}>
                                        <div className="acrdn-hdng" style={{ padding: '10px 18px' }}>
                                            <h3 className='acrdn-title'>Optional</h3>
                                        </div>

                                        <div
                                            style={{ position: 'relative' }}>
                                            {
                                                document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
                                                    ?
                                                    <FontAwesomeIcon
                                                        icon={faAngleUp}
                                                        className="toggle-accordion"
                                                        onClick={() => {
                                                            let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                            addonItemsList.style.display = 'flex';
                                                            setUpdateComponent(!updateComponent)
                                                        }}
                                                    />
                                                    :
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                        className="toggle-accordion"
                                                        onClick={() => {
                                                            let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                            addonItemsList.style.display = 'none';
                                                            setUpdateComponent(!updateComponent)
                                                        }}
                                                    />
                                            }
                                        </div>

                                        <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                                            <div className="addon-radio">
                                                <div className="addon-check" >
                                                    <input
                                                        type="checkbox"
                                                        checked={obj[addOn.name] ? true : false}
                                                        onChange={() => {
                                                            setupdatePrice(true)

                                                            if (!obj[addOn.name]) {

                                                                let objj = { ...obj }
                                                                objj[addOn.name] = {
                                                                    "addOnId": addOn.id,
                                                                    "addOnName": addOn.name,
                                                                    "addOnOptionId": addOn.id,
                                                                    "addOnOption": addOn.name,
                                                                    "price": addOn.price
                                                                }
                                                                setObj(objj)
                                                            } else {
                                                                let objj = { ...obj }

                                                                delete obj[addOn.name]
                                                            }
                                                        }}
                                                        name={addOn.name}
                                                        className="check"
                                                    />
                                                    <small className='radio-txt'>{addOn.name}</small>
                                                </div>

                                                <div className="addon-info">
                                                    <span className="addon-price">+${(addOn.price || 0).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                        <div className="acrdn-hdng" >
                            <h3 className='acrdn-title'>Special Instructions</h3>
                        </div>

                        <small className="special-instruction">Please let us know if your are allergic to anything or if we need to avoid anything.</small>

                        <div className="instrct-layout">
                            <textarea value={specialInstructions} onChange={(e) => setSpecialIntstruction(e.target.value)} className='instrctn-txt' placeholder="eg . No mayo" id="special_instructions" name="special_notes" rows="4" cols="40" />
                        </div>
                    </div>

                    <div className="addon-dialog-footer">
                        <div className="mrgn-tp">

                            <FontAwesomeIcon icon={faMinus} className="icon-add" onClick={() => setItemCount(itemCount > 1 ? itemCount - 1 : 1)} />
                            <span className='quntty'>{itemCount}</span>
                            <FontAwesomeIcon icon={faPlus} className="icon-add" onClick={() => setItemCount(itemCount > 98 ? 99 : itemCount + 1)} />
                        </div>

                        <button className="Add-to-Order" type="submit">
                            Add to Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default withRouter(ViewAddon)




