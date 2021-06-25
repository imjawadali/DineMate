import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MenuListItemComponent from '../../../../components/MenuListItemComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import '../../styles.css';
import { customisedAction } from '../../../../redux/actions';
import { SET_ORDER, SET_TOAST } from '../../../../constants';
import { useParams, withRouter } from 'react-router-dom';

const MenuListingContainer = props => {

    const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
    const dispatch = useDispatch()

    const { heading, cart, data, onClick } = props
    const [viewAddons, setViewAddons] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    return (
        <div className="MenuListingContainer">
            <h1>
                {heading}
            </h1>

            <div className="MenuListingContainerItemContainer">
                {data.map(menuItem => {
                    return (
                        <div className={"MenuListingContainerItem ".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "")}>
                            <MenuListItemComponent
                                heading={menuItem.name}
                                subHeading={menuItem.shortDescription || 'Loaded with Cheese, with mayo'}
                                cartValue={cart.find(item => item.id == menuItem.id) ? "1" : ""}
                                price={menuItem.price}
                                onClick={() => {
                                    // if (orderDetails) {
                                    setSelectedItem(menuItem);
                                    setViewAddons(true);
                                    // console.clear();
                                    // } else dispatch(customisedAction(SET_TOAST, { message: 'Order isn\'t initialized yet!', type: 'warning' }))
                                }}
                                updateCart={onClick}
                                addToCart={cart.find(item => item.id == menuItem.id)}
                                image={menuItem.imageUrl} />
                        </div>
                    )
                })}

            </div>

            {
                viewAddons ?
                    <ViewAddon
                        setViewAddons={setViewAddons}
                        selectedItem={selectedItem}
                    />
                    :
                    null
            }
        </div>
    )
}

const ViewAddon = ({ setViewAddons, selectedItem, updateCart, history }) => {

    const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
    const dispatch = useDispatch()
    const { restaurantId } = useParams()

    const [itemCount, setItemCount] = useState(1);
    const [itemToAdd, setItemToAdd] = useState({ addOns: [] });
    const [totalPrice, setTotalPrice] = useState(0);
    const [updateComponent, setUpdateComponent] = useState(true);

    useEffect(() => {
        let price = selectedItem.price;
        for (let key in itemToAdd) {
            if (key == 'addOns') {
                itemToAdd[key].forEach(item => price += item.price)
            } else {
                price += itemToAdd[key].price;
            }
        }
        setTotalPrice(price * itemCount)
        // console.log(price * itemCount)
    }, [itemToAdd, itemCount]);

    const saveCart = (obj) => {
        // let cartMenu = localStorage.getItem('cartMenu') ? localStorage.getItem('cartMenu') : '';
        // if (cartMenu) {
        //     let updatedCart = JSON.parse(cartMenu)
        //         updatedCart.push(obj)
        //         console.log(updatedCart)
        //     localStorage.setItem('cartMenu', JSON.stringify(updatedCart))
        // } else {
        //     let cart = JSON.stringify([obj])
        //     localStorage.setItem('cartMenu', cart)
        // }


        dispatch(customisedAction(SET_ORDER,obj))



    }
    useEffect(() => {
        console.log(restaurantId)
    }, [restaurantId])
    // FINAL CALL
    const addToCart = e => {
        e.preventDefault();
        // console.log(orderDetails)
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
            orderNumber: "000000032"
        }
        console.log(objItem);
        saveCart(objItem)
        // console.log(itemToAdd)
        // console.log(obj)

        // console.log(Object.values(obj))

    }
    let arrr = []

    let [obj, setObj] = useState({
        // combo: {
        //     "addOnId": 42,
        //     "addOnName": "Flavour",
        //     "addOnOptionId": 49,
        //     "addOnOption": "Cheesy",
        //     "price": 0
        // }
    })
    useEffect(() => {


    }, [obj])

    return (
        <div className="add-on-dialog">
            <form onSubmit={e => addToCart(e)}>
                <div className="dialog">

                    <div style={{ display: 'flex', padding: '10px 20px' }}>
                        <FontAwesomeIcon icon={faTimes} className="icon-starz" onClick={() => setViewAddons(false)} />
                    </div>

                    <div className="item-iamge" onClick={() => console.log(selectedItem, itemToAdd)} >
                        <img
                            width='90px'
                            height='90px'
                            src={selectedItem.imageUrl}
                            alt="image"
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
                                                                            // onChange={() => { setItemToAdd({ ...itemToAdd, [addOn.name]: addOnOption }) }}
                                                                            onChange={() => {
                                                                                let objj = { ...obj }
                                                                                objj[addOn.name] = {
                                                                                    "addOnId": addOnOption.id,
                                                                                    "addOnName": addOn.name,
                                                                                    "addOnOptionId": addOnOption.id,
                                                                                    "addOnOption": addOnOption.name,
                                                                                    "price": addOnOption.price
                                                                                }
                                                                                setObj(objj)
                                                                                // console.log(itemToAdd)
                                                                                // itemToAdd.addOns.length ? itemToAdd.addOns.filter((a, i) => {
                                                                                //     a.addOnName !== addOn.name ?
                                                                                // setItemToAdd({
                                                                                //     ...itemToAdd, addOns: [...itemToAdd.addOns, {
                                                                                //         "addOnId": addOnOption.id,
                                                                                //         "addOnName": addOn.name,
                                                                                //         "addOnOptionId": addOnOption.id,
                                                                                //         "addOnOption": addOnOption.name,
                                                                                //         "price": addOnOption.price
                                                                                //     }]
                                                                                // })
                                                                                // setItemToAdd({
                                                                                //     "addOnId": addOnOption.id,
                                                                                //     "addOnName": addOn.name,
                                                                                //     "addOnOptionId": addOnOption.id,
                                                                                //     "addOnOption": addOnOption.name,
                                                                                //     "price": addOnOption.price
                                                                                // })
                                                                                // // console.log([...itemToAdd.addOns])
                                                                                // console.log(itemToAdd)
                                                                                // : 
                                                                                // arrr = [...itemToAdd.addOns];
                                                                                // console.log([...itemToAdd.addOns])
                                                                                // // arrr.addOns[i].addOnId = addOnOption.id
                                                                                // // arrr.addOns[i].addOnName = addOn.name
                                                                                // // arrr.addOns[i].addOnOptionId = addOnOption.id
                                                                                // // arrr.addOns[i].price = addOnOption.price

                                                                                // setItemToAdd({
                                                                                //     ...itemToAdd, addOns: arrr
                                                                                // })

                                                                                // })
                                                                                // : setItemToAdd({
                                                                                //     ...itemToAdd, addOns: [...itemToAdd.addOns, {
                                                                                //         "addOnId": addOnOption.id,
                                                                                //         "addOnName": addOn.name,
                                                                                //         "addOnOptionId": addOnOption.id,
                                                                                //         "addOnOption": addOnOption.name,
                                                                                //         "price": addOnOption.price
                                                                                //     }]
                                                                                // })
                                                                            }}
                                                                        />
                                                                        <small className='radio-txt'>{addOnOption.name}</small>
                                                                    </div>

                                                                    <div className="addon-info">
                                                                        <span className="addon-price">+${addOnOption.price}</span>
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
                                                                            // onChange={() => {
                                                                            //     setItemToAdd({
                                                                            //         ...itemToAdd,
                                                                            //         addOns: itemToAdd.addOns.includes(addOnOption) ?
                                                                            //             itemToAdd.addOns.filter(_addOnOption => addOnOption.id != _addOnOption.id)
                                                                            //             :
                                                                            //             [...itemToAdd.addOns, addOnOption]
                                                                            //     })
                                                                            // }}
                                                                            onChange={() => {
                                                                                let objj = { ...obj }
                                                                                objj[addOn.name] = {
                                                                                    "addOnId": addOn.id,
                                                                                    "addOnName": addOn.name,
                                                                                    "addOnOptionId": addOn.id,
                                                                                    "addOnOption": addOn.name,
                                                                                    "price": addOn.price
                                                                                }
                                                                                setObj(objj)
                                                                                // setItemToAdd({
                                                                                //     ...itemToAdd,
                                                                                //     addOns: [...itemToAdd.addOns, {
                                                                                //         "addOnId": addOn.id,
                                                                                //         "addOnName": addOn.name,
                                                                                //         "addOnOptionId": addOn.id,
                                                                                //         "addOnOption": addOn.name,
                                                                                //         "price": addOn.price
                                                                                //     }]
                                                                                // })
                                                                            }}
                                                                            name={addOnOption.name}
                                                                            className="check"
                                                                        />
                                                                        <small className='radio-txt'>{addOnOption.name}</small>
                                                                    </div>

                                                                    <div className="addon-info">
                                                                        <span className="addon-price">+${addOnOption.price}</span>
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
                                                        // onChange={() => {
                                                        //     setItemToAdd({
                                                        //         ...itemToAdd,
                                                        //         addOns: itemToAdd.addOns.includes(addOn) ?
                                                        //             itemToAdd.addOns.filter(_addOnOption => addOn.id != _addOnOption.id)
                                                        //             :
                                                        //             [...itemToAdd.addOns, addOn]
                                                        //     })
                                                        // }}
                                                        onChange={() => {
                                                            let objj = { ...obj }
                                                            objj[addOn.name] = {
                                                                "addOnId": addOn.id,
                                                                "addOnName": addOn.name,
                                                                "addOnOptionId": addOn.id,
                                                                "addOnOption": addOn.name,
                                                                "price": addOn.price
                                                            }
                                                            setObj(objj)
                                                            // setItemToAdd({
                                                            //     ...itemToAdd,
                                                            //     addOns: [...itemToAdd.addOns, {
                                                            //         "addOnId": addOn.id,
                                                            //         "addOnName": addOn.name,
                                                            //         "addOnOptionId": addOn.id,
                                                            //         "addOnOption": addOn.name,
                                                            //         "price": addOn.price
                                                            //     }]
                                                            // })
                                                        }}
                                                        name={addOn.name}
                                                        className="check"
                                                    />
                                                    <small className='radio-txt'>{addOn.name}</small>
                                                </div>

                                                <div className="addon-info">
                                                    <span className="addon-price">+${addOn.price}</span>
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
                            <textarea className='instrctn-txt' placeholder="eg . No mayo" id="special_instructions" name="special_notes" rows="4" cols="40" />
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

export default withRouter(MenuListingContainer)




// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import MenuListItemComponent from '../../../../components/MenuListItemComponent'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes, faPlus, faMinus, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
// import '../../styles.css';
// import { customisedAction } from '../../../../redux/actions';
// import { SET_ORDER, SET_TOAST } from '../../../../constants';
// import { useParams, withRouter } from 'react-router-dom';

// const MenuListingContainer = props => {

//     const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
//     const dispatch = useDispatch()

//     const { heading, cart, data, onClick } = props
//     const [viewAddons, setViewAddons] = useState(false);
//     const [selectedItem, setSelectedItem] = useState({});

//     return (
//         <div className="MenuListingContainer">
//             <h1>
//                 {heading}
//             </h1>

//             <div className="MenuListingContainerItemContainer">
//                 {data.map(menuItem => {
//                     return (
//                         <div className={"MenuListingContainerItem ".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "")}>
//                             <MenuListItemComponent
//                                 heading={menuItem.name}
//                                 subHeading={menuItem.shortDescription || 'Loaded with Cheese, with mayo'}
//                                 cartValue={cart.find(item => item.id == menuItem.id) ? "1" : ""}
//                                 price={menuItem.price}
//                                 onClick={() => {
//                                     // if (orderDetails) {
//                                     setSelectedItem(menuItem);
//                                     setViewAddons(true);
//                                     // console.clear();
//                                     // } else dispatch(customisedAction(SET_TOAST, { message: 'Order isn\'t initialized yet!', type: 'warning' }))
//                                 }}
//                                 updateCart={onClick}
//                                 addToCart={cart.find(item => item.id == menuItem.id)}
//                                 image={menuItem.imageUrl} />
//                         </div>
//                     )
//                 })}

//             </div>

//             {
//                 viewAddons ?
//                     <ViewAddon
//                         setViewAddons={setViewAddons}
//                         selectedItem={selectedItem}
//                     />
//                     :
//                     null
//             }
//         </div>
//     )
// }

// const ViewAddon = ({ setViewAddons, selectedItem, updateCart,history }) => {

//     const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
//     const dispatch = useDispatch()
//     const {restaurantId} = useParams()

//     const [itemCount, setItemCount] = useState(1);
//     const [itemToAdd, setItemToAdd] = useState({ addOns: [] });
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [updateComponent, setUpdateComponent] = useState(true);

//     useEffect(() => {
//         let price = selectedItem.price;
//         for (let key in itemToAdd) {
//             if (key == 'addOns') {
//                 itemToAdd[key].forEach(item => price += item.price)
//             } else {
//                 price += itemToAdd[key].price;
//             }
//         }
//         setTotalPrice(price * itemCount)
//         // console.log(price * itemCount)
//     }, [itemToAdd, itemCount]);

//     const saveCart = (obj) => {
//         // let cartMenu = localStorage.getItem('cartMenu') ? localStorage.getItem('cartMenu') : '';
//         // if (cartMenu) {
//         //     let updatedCart = JSON.parse(cartMenu)
//         //         updatedCart.push(obj)
//         //         console.log(updatedCart)
//         //     localStorage.setItem('cartMenu', JSON.stringify(updatedCart))
//         // } else {
//         //     let cart = JSON.stringify([obj])
//         //     localStorage.setItem('cartMenu', cart)
//         // }


//         // dispatch(customisedAction(SET_ORDER,obj))



//     }
//     useEffect(()=>{
//         console.log(restaurantId)
//     },[restaurantId])
//     // FINAL CALL
//     const addToCart = e => {
//         e.preventDefault();
//         console.log(orderDetails)
//         let obj = {
//             ...selectedItem,
//             addOns: itemToAdd.addOns,
//             quanity:itemCount,
//             totalPrice:totalPrice,
//             restaurantId:restaurantId
//         }
//         // console.log("itemToAdd", obj);
//         // saveCart(obj)
//         console.log(itemToAdd)
//         console.log(obj)

//     }

//     return (
//         <div className="add-on-dialog">
//             <form onSubmit={e => addToCart(e)}>
//                 <div className="dialog">

//                     <div style={{ display: 'flex', padding: '10px 20px' }}>
//                         <FontAwesomeIcon icon={faTimes} className="icon-starz" onClick={() => setViewAddons(false)} />
//                     </div>

//                     <div className="item-iamge" onClick={() => console.log(selectedItem, itemToAdd)} >
//                         <img
//                             width='90px'
//                             height='90px'
//                             src={selectedItem.imageUrl}
//                             alt="image"
//                         />
//                     </div>

//                     <div className="ice-cap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <h3 className="ice-cap" style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedItem.name}</h3>
//                         <span style={{ marginRight: 8 }}>${totalPrice}</span>
//                     </div>

//                     <div className="addon-selection-content">
//                         {
//                             selectedItem.addOns.filter(addOn => addOn.addOnOptions.length > 0).map(addOn => {
//                                 return (
//                                     addOn.mandatory ?
//                                         <React.Fragment key={addOn.id}>
//                                             <div className="acrdn-hdng" >
//                                                 <h3 className='acrdn-title'>{addOn.name}</h3>
//                                                 <small className='req'>{addOn.mandatory ? 'Required' : 'Optional'}</small>
//                                             </div>

//                                             <div
//                                                 style={{ position: 'relative' }}>
//                                                 {
//                                                     document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
//                                                         ?
//                                                         <FontAwesomeIcon
//                                                             icon={faAngleUp}
//                                                             className="toggle-accordion"
//                                                             onClick={() => {
//                                                                 let addonItemsList = document.getElementById("addon_" + addOn.id);
//                                                                 addonItemsList.style.display = 'flex';
//                                                                 setUpdateComponent(!updateComponent)
//                                                             }}
//                                                         />
//                                                         :
//                                                         <FontAwesomeIcon
//                                                             icon={faAngleDown}
//                                                             className="toggle-accordion"
//                                                             onClick={() => {
//                                                                 let addonItemsList = document.getElementById("addon_" + addOn.id);
//                                                                 addonItemsList.style.display = 'none';
//                                                                 setUpdateComponent(!updateComponent)
//                                                             }}
//                                                         />
//                                                 }
//                                             </div>

//                                             <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
//                                                 {
//                                                     addOn.addOnOptions.length > 0 && addOn.addOnOptions.map(addOnOption => {
//                                                         return (
//                                                             <React.Fragment key={addOnOption.id}>
//                                                                 <div className="addon-radio">
//                                                                     <div className="addon-check">
//                                                                         <input
//                                                                             type="radio"
//                                                                             required={!!addOn.mandatory}
//                                                                             name={addOn.name}
//                                                                             className="check"
//                                                                             onChange={() => { setItemToAdd({ ...itemToAdd, [addOn.name]: addOnOption }) }}
//                                                                         />
//                                                                         <small className='radio-txt'>{addOnOption.name}</small>
//                                                                     </div>

//                                                                     <div className="addon-info">
//                                                                         <span className="addon-price">+${addOnOption.price}</span>
//                                                                     </div>
//                                                                 </div>
//                                                             </React.Fragment>
//                                                         )
//                                                     })
//                                                 }
//                                             </div>
//                                         </React.Fragment>
//                                         :
//                                         <React.Fragment key={addOn.id}>
//                                             <div className="acrdn-hdng" >
//                                                 <h3 className='acrdn-title'>{addOn.name}</h3>
//                                                 <small className='req'>{addOn.mandatory ? 'Required' : 'Optional'}</small>
//                                             </div>

//                                             <div
//                                                 style={{ position: 'relative' }}>
//                                                 {
//                                                     document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
//                                                         ?
//                                                         <FontAwesomeIcon
//                                                             icon={faAngleUp}
//                                                             className="toggle-accordion"
//                                                             onClick={() => {
//                                                                 let addonItemsList = document.getElementById("addon_" + addOn.id);
//                                                                 addonItemsList.style.display = 'flex';
//                                                                 setUpdateComponent(!updateComponent)
//                                                             }}
//                                                         />
//                                                         :
//                                                         <FontAwesomeIcon
//                                                             icon={faAngleDown}
//                                                             className="toggle-accordion"
//                                                             onClick={() => {
//                                                                 let addonItemsList = document.getElementById("addon_" + addOn.id);
//                                                                 addonItemsList.style.display = 'none';
//                                                                 setUpdateComponent(!updateComponent)
//                                                             }}
//                                                         />
//                                                 }
//                                             </div>

//                                             <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
//                                                 {
//                                                     addOn.addOnOptions.map(addOnOption => {
//                                                         return (
//                                                             <React.Fragment key={addOnOption.id}>
//                                                                 <div className="addon-radio">
//                                                                     <div className="addon-check" >
//                                                                         <input
//                                                                             type="checkbox"
//                                                                             required={!!addOn.mandatory}
//                                                                             onChange={() => {
//                                                                                 setItemToAdd({
//                                                                                     ...itemToAdd,
//                                                                                     addOns: itemToAdd.addOns.includes(addOnOption) ?
//                                                                                         itemToAdd.addOns.filter(_addOnOption => addOnOption.id != _addOnOption.id)
//                                                                                         :
//                                                                                         [...itemToAdd.addOns, addOnOption]
//                                                                                 })
//                                                                             }}
//                                                                             name={addOnOption.name}
//                                                                             className="check"
//                                                                         />
//                                                                         <small className='radio-txt'>{addOnOption.name}</small>
//                                                                     </div>

//                                                                     <div className="addon-info">
//                                                                         <span className="addon-price">+${addOnOption.price}</span>
//                                                                     </div>
//                                                                 </div>
//                                                             </React.Fragment>
//                                                         )
//                                                     })
//                                                 }
//                                             </div>
//                                         </React.Fragment>
//                                 )
//                             })
//                         }

//                         {
//                             selectedItem.addOns.filter(addOn => addOn.addOnOptions.length == 0).map(addOn => {
//                                 return (
//                                     <React.Fragment key={addOn.id}>
//                                         <div className="acrdn-hdng" style={{ padding: '10px 18px' }}>
//                                             <h3 className='acrdn-title'>Optional</h3>
//                                         </div>

//                                         <div
//                                             style={{ position: 'relative' }}>
//                                             {
//                                                 document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
//                                                     ?
//                                                     <FontAwesomeIcon
//                                                         icon={faAngleUp}
//                                                         className="toggle-accordion"
//                                                         onClick={() => {
//                                                             let addonItemsList = document.getElementById("addon_" + addOn.id);
//                                                             addonItemsList.style.display = 'flex';
//                                                             setUpdateComponent(!updateComponent)
//                                                         }}
//                                                     />
//                                                     :
//                                                     <FontAwesomeIcon
//                                                         icon={faAngleDown}
//                                                         className="toggle-accordion"
//                                                         onClick={() => {
//                                                             let addonItemsList = document.getElementById("addon_" + addOn.id);
//                                                             addonItemsList.style.display = 'none';
//                                                             setUpdateComponent(!updateComponent)
//                                                         }}
//                                                     />
//                                             }
//                                         </div>

//                                         <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
//                                             <div className="addon-radio">
//                                                 <div className="addon-check" >
//                                                     <input
//                                                         type="checkbox"
//                                                         onChange={() => {
//                                                             setItemToAdd({
//                                                                 ...itemToAdd,
//                                                                 addOns: itemToAdd.addOns.includes(addOn) ?
//                                                                     itemToAdd.addOns.filter(_addOnOption => addOn.id != _addOnOption.id)
//                                                                     :
//                                                                     [...itemToAdd.addOns, addOn]
//                                                             })
//                                                         }}
//                                                         name={addOn.name}
//                                                         className="check"
//                                                     />
//                                                     <small className='radio-txt'>{addOn.name}</small>
//                                                 </div>

//                                                 <div className="addon-info">
//                                                     <span className="addon-price">+${addOn.price}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </React.Fragment>
//                                 )
//                             })
//                         }
//                         <div className="acrdn-hdng" >
//                             <h3 className='acrdn-title'>Special Instructions</h3>
//                         </div>

//                         <small className="special-instruction">Please let us know if your are allergic to anything or if we need to avoid anything.</small>

//                         <div className="instrct-layout">
//                             <textarea className='instrctn-txt' placeholder="eg . No mayo" id="special_instructions" name="special_notes" rows="4" cols="40" />
//                         </div>
//                     </div>

//                     <div className="addon-dialog-footer">
//                         <div className="mrgn-tp">

//                             <FontAwesomeIcon icon={faMinus} className="icon-add" onClick={() => setItemCount(itemCount > 1 ? itemCount - 1 : 1)} />
//                             <span className='quntty'>{itemCount}</span>
//                             <FontAwesomeIcon icon={faPlus} className="icon-add" onClick={() => setItemCount(itemCount > 98 ? 99 : itemCount + 1)} />
//                         </div>

//                         <button className="Add-to-Order" type="submit">
//                             Add to Order
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default withRouter(MenuListingContainer)