import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MenuListItemComponent from '../../../../components/MenuListItemComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import '../../styles.css';
import { customisedAction } from '../../../../redux/actions';
import { ALREADY_IN_CART, GET_ORDER_ITEMS, GET_ORDER_STATUS, GET_STATUS, INITIALIZE_ORDER, SET_ORDER, SET_ORDER_ITEM, SET_TOAST } from '../../../../constants';
import { useParams, withRouter } from 'react-router-dom';
import { getItem } from '../../../../helpers';
import ViewAddon from './ViewAddon'

const MenuListingContainer = props => {

    const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
    const dispatch = useDispatch()

    const { heading, cart, data, onClick } = props
    const [viewAddons, setViewAddons] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const { restaurantId } = useParams()

    const orderItem = useSelector(({ getOrderItemsReducer }) => getOrderItemsReducer.OrderItems)
    const cartItemR = useSelector(({ orderReducer }) => orderReducer.cartMenu)
    const [items, setItem] = useState([])


    useEffect(() => {
        let orderDetailsLocal = getItem('orderDetails') ? getItem('orderDetails') : getItem('cartMenu') ? getItem('cartMenu')[0] : []
        if (orderDetailsLocal) {
            let obj = {
                "restaurantId": orderDetailsLocal.restaurantId,
                "orderNumber": orderDetailsLocal.orderNumber
            }
            // dispatch(customisedAction(GET_ORDER_ITEMS, obj))
        }
    }, [])

    useEffect(() => {
        let localItem = cartItemR ? cartItemR : getItem('cartMenu') ? getItem('cartMenu') : []
        let getItemR = orderItem ? orderItem : []
        let mixItem = []
        if (localItem) {
            localItem.map((a, i) => {
                mixItem.push(a)
            })
        }
        if (getItemR && getItemR.orderItems) {
            getItemR.orderItems.map((a, i) => {
                mixItem.push(a)
            })
        }
        setItem(mixItem)
    }, [orderItem, cartItemR])




    useEffect(() => {

    }, [restaurantId])

    const getOrderStatusReducer = useSelector(({ getOrderStatusReducer }) => getOrderStatusReducer.status)
    console.log(getOrderStatusReducer, 'getOrderStatusReducer')

    useEffect(() => {
        let orderDetaillls = getItem('orderDetails')
        if (orderDetaillls) {

            dispatch(customisedAction(GET_ORDER_STATUS, {
                "restaurantId": orderDetaillls.restaurantId,
                "orderNumber": orderDetaillls.orderNumber
            }))
        }
    }, [])


    const orderStatusDetails = useSelector(({ orderStatusReducer }) => orderStatusReducer.status)
    console.log(orderStatusDetails, 'orderStatus')

    // useEffect(() => {
    //     let orderDetaillls = getItem('orderDetails')
    //     if (orderDetaillls) {

    //         dispatch(customisedAction(GET_STATUS, {
    //             "restaurantId": orderDetaillls.restaurantId,
    //             "orderNumber": orderDetaillls.orderNumber
    //         }))
    //     }
    // }, [])


    const opennAddOn = () => {
        if(getOrderStatusReducer && getOrderStatusReducer.closeRequested){
            dispatch(customisedAction(ALREADY_IN_CART, { message: `You Have Already Submitted The Order Please Wait For Manager Response`, type: 'warning' }))
        }else 
        if (JSON.parse(localStorage.getItem('orderDetails')) && JSON.parse(localStorage.getItem('orderDetails')).type.toLowerCase() === 'dine-in') {
            console.log('this')
            let cartMenu = (JSON.parse(localStorage.getItem('orderDetails')) ? JSON.parse(localStorage.getItem('orderDetails')) : []);
            if (cartMenu) {
                if (cartMenu.restaurantId === restaurantId) {
                    setViewAddons(true)
                } else if (cartMenu.restaurantId != restaurantId) {
                    dispatch(customisedAction(ALREADY_IN_CART, { message: `You can't order from different resturants at a time`, type: 'warning' }))
                }
            } else {
                setViewAddons(true)

            }
        } else if (JSON.parse(localStorage.getItem('orderDetails')) && JSON.parse(localStorage.getItem('orderDetails')).type.toLowerCase() === 'take-away') {



            let cartMenu = (JSON.parse(localStorage.getItem('orderDetails')) ? JSON.parse(localStorage.getItem('orderDetails')) : []);
            if (cartMenu) {
                dispatch(customisedAction(ALREADY_IN_CART, { message: `You Have Already Submitted The Order Please Wait For Manager Response`, type: 'warning' }))

            }
        }
        else if (JSON.parse(localStorage.getItem('cartMenu'))) {
            console.log('that')

            let cartMenu = (JSON.parse(localStorage.getItem('cartMenu')) ? JSON.parse(localStorage.getItem('cartMenu')) : []);
            if (cartMenu.length) {
                if (cartMenu[0].restaurantId === restaurantId) {
                    setViewAddons(true)
                } else if (cartMenu[0].restaurantId != restaurantId) {
                    dispatch(customisedAction(ALREADY_IN_CART, { message: `You can't order from different resturants at a time`, type: 'warning' }))

                }
            } else if (cartMenu.length === 0) {
                setViewAddons(true)
                // console.log(cartMenu.length)
            }
        }
        else {
            setViewAddons(true)

        }
    }



    return (
        <div className="MenuListingContainer">

            <h1>
                {heading}
            </h1>

            <div className="MenuListingContainerItemContainer">
                {data.map((menuItem, i) => {
                    return (
                        <div
                            className={
                                items.length > 0 ? items.map((a, i) => a.id === menuItem.id ? "MenuListingContainerItem selected".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "") :
                                    "MenuListingContainerItem ".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "")) : "MenuListingContainerItem".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "")}>
                            {/* // className={"MenuListingContainerItem ".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "")}> */}
                            <MenuListItemComponent
                                heading={menuItem.name}
                                subHeading={menuItem.shortDescription || 'Loaded with Cheese, with mayo'}
                                cartValue={cart.find(item => item.id == menuItem.id) ? "1" : ""}
                                price={menuItem.price}
                                onClick={() => {
                                    setSelectedItem(menuItem);
                                    console.log(menuItem);
                                    opennAddOn()
                                    // setViewAddons(true);
                                }}
                                menuItem={menuItem}
                                updateCart={onClick}
                                addToCart={cart.find(item => item.id == menuItem.id)}
                                items={items}
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
                        restaurantId={restaurantId}
                        edit={false}
                        addedAddons={false}
                        RestaurantDetails={props.RestaurantDetails}


                    />
                    :
                    null
            }
        </div >
    )
}

// const ViewAddon = ({ setViewAddons, selectedItem, updateCart, history, restaurantId }) => {

//     const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
//     const dispatch = useDispatch()

//     const [itemCount, setItemCount] = useState(1);
//     const [itemToAdd, setItemToAdd] = useState({ addOns: [] });
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [updateComponent, setUpdateComponent] = useState(true);
//     const [updatePrice, setupdatePrice] = useState(false)
//     const [initOrder, setInitOrder] = useState(false)


//     let [obj, setObj] = useState({
//     })

//     let [price, setPrice] = useState(selectedItem.price);
//     useEffect(() => {
//         let arr = []
//         for (let keys in obj) {
//             arr.push(obj[keys])
//         }
//         arr.map((a, i) => price += Number(a.price))
//         setTotalPrice(price * itemCount)
//         setupdatePrice(false)
//     }, [itemToAdd, itemCount, obj, price, updatePrice]);

//     const saveCart = (obj) => {


//         dispatch(customisedAction(SET_ORDER_ITEM, obj))
//         setViewAddons(false)



//     }
//     // FINAL CALL
//     const addToCart = e => {
//         e.preventDefault();
//         let arr = []
//         for (let keys in obj) {
//             arr.push(obj[keys])
//         }

//         let objItem = {
//             ...selectedItem,
//             addOns: arr,
//             quantity: itemCount,
//             totalPrice: totalPrice,
//             restaurantId: restaurantId,
//             orderNumber: "000000032"
//         }

//         let cartMenu = (JSON.parse(localStorage.getItem('cartMenu')) ? JSON.parse(localStorage.getItem('cartMenu')) : []);
//         if (cartMenu.length) {
//             if (cartMenu[0].restaurantId === restaurantId) {
//                 saveCart(objItem)
//             } else if (cartMenu[0].restaurantId != restaurantId) {
//                 dispatch(customisedAction(ALREADY_IN_CART, { message: `You can't order from different resturants at a time`, type: 'success' }))
//             }
//         } else {

//             saveCart(objItem)

//         }

//     }
//     let arrr = []

//     useEffect(() => {
//         setInitOrder(getItem("orderDetails"))

//     }, [])

//     // this is order initializing api for QR CODE









//     return (
//         <div className="add-on-dialog">
//             <form onSubmit={e => addToCart(e)}>
//                 <div className="dialog">

//                     <div style={{ display: 'flex', padding: '10px 20px' }}>
//                         <FontAwesomeIcon icon={faTimes} className="icon-starz" onClick={() => setViewAddons(false)} />
//                     </div>

//                     <div className="item-iamge" >
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
//                                                                             onChange={() => {
//                                                                                 setupdatePrice(true)

//                                                                                 let objj = { ...obj }
//                                                                                 objj[addOn.name] = {
//                                                                                     "addOnId": addOnOption.id,
//                                                                                     "addOnName": addOn.name,
//                                                                                     "addOnOptionId": addOnOption.id,
//                                                                                     "addOnOption": addOnOption.name,
//                                                                                     "price": addOnOption.price
//                                                                                 }
//                                                                                 setObj(objj)
//                                                                             }}
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
//                                                                                 setupdatePrice(true)
//                                                                                 if (!obj[addOn.name]) {

//                                                                                     let objj = { ...obj }
//                                                                                     objj[addOn.name] = {
//                                                                                         "addOnId": addOn.id,
//                                                                                         "addOnName": addOn.name,
//                                                                                         "addOnOptionId": addOn.id,
//                                                                                         "addOnOption": addOn.name,
//                                                                                         "price": addOn.price
//                                                                                     }
//                                                                                     setObj(objj)
//                                                                                 } else {
//                                                                                     let objj = { ...obj }

//                                                                                     delete obj[addOn.name]

//                                                                                 }
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
//                                                             setupdatePrice(true)

//                                                             if (!obj[addOn.name]) {

//                                                                 let objj = { ...obj }
//                                                                 objj[addOn.name] = {
//                                                                     "addOnId": addOn.id,
//                                                                     "addOnName": addOn.name,
//                                                                     "addOnOptionId": addOn.id,
//                                                                     "addOnOption": addOn.name,
//                                                                     "price": addOn.price
//                                                                 }
//                                                                 setObj(objj)
//                                                             } else {
//                                                                 let objj = { ...obj }

//                                                                 delete obj[addOn.name]
//                                                             }
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

export default withRouter(MenuListingContainer)




