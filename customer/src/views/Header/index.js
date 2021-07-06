import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import "./styles.css"
import { HeaderButton, Logo, MenuIcon } from '../../components';
import { useEffect } from 'react';
import { DELETE_ALL_ORDER_ITEM, DELETE_ORDER_ITEM, GET_MENU, GET_ORDER_ITEMS, GET_RESTAURANT_DETAILS, GET_TAKE_ORDER_ITEMS, INITIALIZE_ORDER, SUBMIT_ORDER_ITEM, TAKIE_AWAY_ORDER } from '../../constants';
import { customisedAction } from '../../redux/actions';
import { getItem } from '../../helpers';
import ViewAddon from './../Customer/Menu/MenuListingContainer/ViewAddon'

const Header = props => {

    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)
    const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
    const submitOrderDetail = useSelector(({ orderReducer }) => orderReducer.submitDetail)

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("")
    const [updateState, setUpdateState] = useState(true)
    const [orderDetail, setOrderDetail] = useState("")
    const [viewAddons, setViewAddons] = useState(false)
    const [restaurantId, setRestaurantId] = useState()

    const [selectedItem, setSelectedItem] = useState({});
    const [addedAddons, setAddedAddons] = useState({});
    const [editedQuantity, setEditedQuantity] = useState('')

    const [specialInstructions, setSpecialIntstruction] = useState("")

    let dispatch = useDispatch()

    let submitTakeOrder = useSelector(({ orderReducer }) => orderReducer.cartTakeItem)
    let cartItemR = useSelector(({ orderReducer }) => orderReducer.cartMenu)
    let OrderItems = useSelector(({ getOrderItemsReducer }) => getOrderItemsReducer.OrderItems)
    let takeOrderItems = useSelector(({ getTakeOrderItemsReducer }) => getTakeOrderItemsReducer.takeOrderItems)
    let takeOrderNumber = useSelector(({ getTakeOrderItemsReducer }) => getTakeOrderItemsReducer.orderNumber)



    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let value = urlParams.get("value")
        if (value) {
            setSearch(value)
        } else {

            setSearch('')
        }
    }, [window.location.search])
    // useEffect(() => {

    //     dispatch(customisedAction(INITIALIZE_ORDER))

    // }, [])




    useEffect(() => {
        if (orderDetail && orderDetail.type.toLowerCase() === 'dine-in') {

            let obj3 = {
                "restaurantId": orderDetail.restaurantId,
                "orderNumber": orderDetail.orderNumber,
                "items": items
            }
            dispatch(customisedAction(GET_ORDER_ITEMS, obj3))
        }



    }, [cartItemR])

    useEffect(() => {
        if (submitOrderDetail) {
            setOrderDetail(getItem('orderDetails'))
        }
    }, [submitOrderDetail])

    useEffect(() => {
        if (orderDetail && orderDetail.type.toLowerCase() === 'take-away') {


            let obj3 = {
                "restaurantId": orderDetail.restaurantId,
                "orderNumber": orderDetail.orderNumber,
                "items": items
            }
            dispatch(customisedAction(GET_TAKE_ORDER_ITEMS, obj3))
        }

    }, [submitTakeOrder, orderDetail, updateState])

    useEffect(() => {
        let arr = []
        if (cartItemR) {
            cartItemR.map((a, i) => {
                arr.push({
                    "quantity": a.quantity,
                    "name": a.name,
                    "price": a.price,
                    "totalPrice": a.totalPrice,
                    "specialInstructions": a.specialInstructions,
                    "addOns": a.addOns,
                    "restaurantId": a.restaurantId,
                    "status": true,
                    "id": a.id,
                    "addOnObj": a.addOnObj,
                    "RestaurantName": a.RestaurantName

                })
            })
            setItems(arr)
        } else {
            let data = JSON.parse(localStorage.getItem('cartMenu'))
            if (data) {
                data.map((a, i) => {
                    arr.push({
                        "quantity": a.quantity,
                        "name": a.name,
                        "price": a.price,
                        "totalPrice": a.totalPrice,
                        "specialInstructions": a.specialInstructions,
                        "addOns": a.addOns,
                        "restaurantId": a.restaurantId,
                        "status": true,
                        "id": a.id,
                        "addOnObj": a.addOnObj,
                        "RestaurantName": a.RestaurantName




                    })
                })
                setItems(arr)
            } else {
                setItems([])
            }
        }
        if (getItem('orderDetails') && getItem('orderDetails').type !== "Take-Away") {
            if (OrderItems) {
                OrderItems.orderItems.map((a, i) => {
                    arr.push({
                        "id": a.id,
                        "name": a.name,
                        "quantity": a.quantity,
                        "totalPrice": a.totalPrice,
                        "status": false
                    })
                })
                setItems(arr)
            }
        }
        if (getItem('orderDetails') && getItem('orderDetails').type === "Take-Away") {
            if (takeOrderItems) {
                takeOrderItems.orderItems.map((a, i) => {
                    arr.push({
                        "id": a.id,
                        "name": a.name,
                        "quantity": a.quantity,
                        "totalPrice": a.totalPrice,
                        "status": false
                    })
                })
                setItems(arr)
            }
        }

    }, [cartItemR, OrderItems, takeOrderItems])

    useEffect(() => {
        setOrderDetail(getItem('orderDetails'))

    }, [orderDetails])
    useEffect(() => {

    }, [orderDetails])

    const toggleCartModal = () => {
        let cartModal = document.getElementById("cart_modal");
        let justificationDiv = document.getElementById("justification_div");
        if (cartModal.style.display == 'none' || !cartModal.style.display) {
            cartModal.style.display = 'block';
            justificationDiv.style.display = 'none';
        } else if (cartModal.style.display == 'block') {
            cartModal.style.display = 'none';
            justificationDiv.style.display = 'block';
        }
    }

    useEffect(() => {
        if (window.location.pathname !== "/customer/pastOrder/orderDetails") {

            if (orderDetail) {

                let obj = {
                    restaurantId: orderDetail.restaurantId,
                    orderNumber: orderDetail.orderNumber,

                }
                dispatch(customisedAction(GET_ORDER_ITEMS, obj))


            }

        }
    }, [orderDetail, updateState])

    useEffect(() => {
        if (orderDetail) {

            let obj = {
                restaurantId: orderDetail.restaurantId

            }


            dispatch(customisedAction(GET_RESTAURANT_DETAILS, obj))
        }

    }, [orderDetail])

    let resturantDetail = useSelector(({ menuReducer }) => menuReducer.restaurant)


    const submitOrder = () => {
        let customer = getItem('customer') ? getItem('customer') : false
        if (!customer) {
            return props.history.push(`/customer/signin/?redirect=${window.location.pathname}`)
        }
        setUpdateState(false)

        if (!OrderItems) {
            if (orderDetail) {

                let obj = {
                    "restaurantId": orderDetail.restaurantId,
                    "orderNumber": orderDetail.orderNumber,
                    "items": items
                }
                dispatch(customisedAction(SUBMIT_ORDER_ITEM, obj))
                setTimeout(() => {
                    // dispatch(customisedAction(GET_ORDER_ITEMS, obj))
                }, [300])
                setNetItems()
                setUpdateState(true)
            } else {
                let itemsArr = getItem('cartMenu')
                let obj = {
                    "restaurantId": itemsArr[0].restaurantId,
                    "items": itemsArr
                }
                dispatch(customisedAction(TAKIE_AWAY_ORDER, obj))
                setTakeAway(itemsArr)
            }


        } else {
            if (orderDetail) {
                let obj = {
                    "restaurantId": orderDetail.restaurantId,
                    "orderNumber": orderDetail.orderNumber,
                    "items": getItem('cartMenu')
                }
                dispatch(customisedAction(SUBMIT_ORDER_ITEM, obj))
                setTimeout(() => {
                    dispatch(customisedAction(GET_ORDER_ITEMS, obj))
                }, [300])
                setNetItems()
                setUpdateState(true)
            }

        }

    }
    const setTakeAway = (itemsArr) => {
        let arr = []
        itemsArr.map((a, i) => {
            arr.push({
                "id": a.id,
                "name": a.name,
                "quantity": a.quantity,
                "totalPrice": a.totalPrice,
                "status": false
            })
        })
        setItems([])
        setItems(arr)
    }
    const setNetItems = () => {
        let arr = []
        if (OrderItems) {
            OrderItems.orderItems.map((a, i) => {
                arr.push({
                    "id": a.id,
                    "name": a.name,
                    "quantity": a.quantity,
                    "totalPrice": a.totalPrice,
                    "status": false
                })
            })
            setItems([])
            setItems(arr)
        }
    }
    const totalAmountFn = () => {
        let price = 0
        if (items.length) {
            items.map((a, i) => price += a.price ? a.price : a.totalPrice)
        }
        return price
    }
    const totalQuantityFn = () => {
        let quantity = 0
        if (items.length) {
            items.map((a, i) => quantity += a.quantity)
        }
        return quantity
    }

    let [submitted, setSubmitted] = useState(false)

    function submitTakeAway() {
        setUpdateState(false)

        if (!customer) {
            toggleCartModal()
            return props.history.push(`/customer/signin/?redirect=${window.location.pathname}`)
        }
        let obj = {
            "restaurantId": items[0].restaurantId,
            "items": items
        }
        dispatch(customisedAction(TAKIE_AWAY_ORDER, obj))
        props.history.push('/customer/checkout');
        setUpdateState(true)
        setSubmitted(true)

    }

    const menu = useSelector(({ menuReducer }) => menuReducer.menu)


    useEffect(() => {
        if (orderDetail && orderDetail.type.toLowerCase() === 'dine-in') {
            if (orderDetail) {
                dispatch(customisedAction(GET_MENU, { restaurantId: orderDetail.restaurantId }))
            }

        }


    }, [])

    useEffect(() => {
        if ((!orderDetail) || (orderDetail && orderDetail.type.toLowerCase() === 'take-away')) {
            if (getItem('cartMenu') && getItem('cartMenu').length > 0) {
                dispatch(customisedAction(GET_MENU, { restaurantId: getItem('cartMenu')[0].restaurantId }))
            }
        }
    }, [])

    const [editInded, setEditInded] = useState('')

    function editItem(id, restId, addons, i, quantity, item) {
        setSelectedItem(
            menu.filter((a, i) => a.id === id)[0]
        )
        setRestaurantId(restId)
        setViewAddons(true)
        setAddedAddons(addons)
        setEditInded(i)
        setEditedQuantity(quantity)

        setSpecialIntstruction(item.specialInstructions)

    }

    function deleteItem(id, restId, i) {
        // setSelectedItem(
        let obj = menu.filter((a, i) => a.id === id)[0]
        let obj2 = {

        }

        dispatch(customisedAction(DELETE_ORDER_ITEM, { i }))

    }

    const deleteAll = () => {
        dispatch(customisedAction(DELETE_ALL_ORDER_ITEM))
    }

    useEffect(() => {
        if (takeOrderItems) {
            setItems(takeOrderItems.orderItems)
        }
    }, [takeOrderItems, OrderItems])

    return (
        <>
            {props && props.location && props.location.pathname !== '/' ?
                props.location.pathname.includes('/customer') ?
                    <div className="HeaderContainer">
                        <div className="HeaderInnerContainer">
                            <div className="HeaderLeft">
                                <MenuIcon onClick={() => props.openSidebar()} />
                                <Logo
                                    src={require('../../assets/logo.png').default}
                                    onClick={() => props.history.push('/')}
                                />
                                <div className="HeaderInputContainer">
                                    <div className="HeaderLocationBarContainer">
                                        <img className="HeaderInputIcon" src={require('../../assets/marker.png').default} />
                                        <input
                                            className="HeaderInput"
                                            placeholder="Mississauga"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="HeaderRight">
                                <div className="HeaderInputContainer" style={{ justifyContent: 'flex-start' }}>
                                    <div className="HeaderSearchBarContainer">
                                        <img className="HeaderInputIcon" src={require('../../assets/search_icon.png').default} />
                                        <input
                                            className="HeaderInput"
                                            placeholder="What are you craving?"
                                            value={search}
                                            onChange={(ev) => setSearch(ev.target.value)}
                                            onKeyDown={(ev) => {
                                                if (ev.keyCode === 13) {
                                                    props.history.push(`/customer/restaurants/?value=${ev.target.value}`)
                                                }
                                            }
                                            }
                                        />
                                    </div>
                                </div>
                                <HeaderButton
                                    red
                                    src={require('../../assets/cart.png').default}
                                    text="Cart"
                                    itemCounts={items && items.length}
                                    onClick={toggleCartModal}
                                />

                                <div className="cart" id="cart_modal">
                                    <div className="cart-content">
                                        <div className="cart-header">
                                            <FontAwesomeIcon icon={faTimes} className="icon-starz" onClick={toggleCartModal} />
                                        </div>

                                        <div className="content">
                                            <div className="yourOrderDetail">
                                                <div className="your-order-title">Your Order </div>
                                                <div className="your-order-number">Order Number: {orderDetails ? orderDetails.orderNumber : orderDetail ? orderDetail.orderNumber : takeOrderNumber ? takeOrderNumber : ''} </div>
                                            </div>

                                            <div className="restaurant-name-div">
                                                <span onClick={() => console.log(items)}>From: </span>
                                                <span className="restaurant-title">{orderDetail ? orderDetail.restaurantName : items && items[0] ? items[0].RestaurantName : ""}</span>
                                            </div>

                                            <div className="item-details">
                                                {orderDetail &&
                                                    orderDetail.type.toLowerCase() !== 'take-away' ?
                                                    <>
                                                        <div className="unlockItems">
                                                            <div className="deleteDiv">
                                                                <p>New Items</p>
                                                                <button onClick={deleteAll}>Delete All</button>
                                                            </div>
                                                            {
                                                                items.length ? items.filter((a) => a.status).map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            <div className="details" key={i}  >
                                                                                <div>
                                                                                    <div className="selected-quantity">
                                                                                        {item.quantity}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="item-description">
                                                                                    <div className="item-title">
                                                                                        {item.name}
                                                                                    </div>

                                                                                    <div className="size-title">
                                                                                        {item.shortDescription}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="amount">
                                                                                    ${item.totalPrice}
                                                                                </div>
                                                                                <div className="editDelete">
                                                                                    <svg onClick={() => { editItem(item.id, item.restaurantId, item.addOnObj, '', item.quantity, item) }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil edit" viewBox="0 0 16 16">
                                                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                                    </svg>
                                                                                    <svg onClick={() => deleteItem(item.id, item.restaurantId, i)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                                                    </svg>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }) : null
                                                            }
                                                        </div>
                                                        <div className="lockItem">
                                                            <p>Submitted Item</p>
                                                            {
                                                                items.length ? items.filter((a) => !a.status).map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            <div className="details" key={i}>
                                                                                <div>
                                                                                    <div className="selected-quantity">
                                                                                        {item.quantity}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="item-description">
                                                                                    <div className="item-title">
                                                                                        {item.name}
                                                                                    </div>

                                                                                    <div className="size-title">
                                                                                        {item.shortDescription}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="amount">
                                                                                    ${item.totalPrice}
                                                                                </div>
                                                                                {/* <div>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                                    </svg>
                                                                                </div> */}
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }) : null
                                                            }
                                                        </div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="unlockItems">
                                                            <div className="deleteDiv">
                                                                <p>New Items</p>
                                                                <button onClick={deleteAll}>Delete All</button>
                                                            </div>
                                                            {!submitted && items.length ? items.filter((a, i) => a.status).map((item, i) => {
                                                                return (
                                                                    <>
                                                                        <div className="details" key={i}>
                                                                            <div>
                                                                                <div className="selected-quantity">
                                                                                    {item.quantity}
                                                                                </div>
                                                                            </div>

                                                                            <div className="item-description">
                                                                                <div className="item-title">
                                                                                    {item.name}
                                                                                </div>

                                                                                <div className="size-title">
                                                                                    {item.shortDescription}
                                                                                </div>
                                                                            </div>

                                                                            <div className="amount">
                                                                                ${item.totalPrice}
                                                                            </div>
                                                                            <div className="editDelete">
                                                                                <svg onClick={() => { editItem(item.id, item.restaurantId, item.addOnObj, i, item.quantity, item) }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil edit" viewBox="0 0 16 16">
                                                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                                </svg>
                                                                                <svg onClick={() => deleteItem(item.id, item.restaurantId, i)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill delete" viewBox="0 0 16 16">
                                                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            }) : null}
                                                        </div>
                                                        <div className="lockItem">
                                                            <p>Submitted Item</p>
                                                            {
                                                                items.length ? items.filter((a) => !a.status).map((item, i) => {
                                                                    return (
                                                                        <>
                                                                            <div className="details" key={i}>
                                                                                <div>
                                                                                    <div className="selected-quantity">
                                                                                        {item.quantity}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="item-description">
                                                                                    <div className="item-title">
                                                                                        {item.name}
                                                                                    </div>

                                                                                    <div className="size-title">
                                                                                        {item.shortDescription}
                                                                                    </div>
                                                                                </div>

                                                                                <div className="amount">
                                                                                    ${item.totalPrice}
                                                                                </div>
                                                                                {/* <div>
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                                                    </svg>
                                                                                </div> */}
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }) : null
                                                            }
                                                        </div>
                                                    </>


                                                }

                                            </div>
                                        </div>


                                        <div className="orderSubBtn">
                                            <button className="submitOrder" onClick={() => { orderDetail && orderDetail.type.toLowerCase() === "dine-in" ? submitOrder() : submitTakeAway() }} disabled={getItem('cartMenu') ? false : true}>{OrderItems && orderDetail && orderDetail.type.toLowerCase() === "dine-in" ? `Add to Order` : `Submit Order`}</button>
                                            {orderDetail && orderDetail.type.toLowerCase() === "dine-in" ?
                                                <button className="addItem" onClick={() => { toggleCartModal(); props.history.push('/customer/checkout'); }} disabled={getItem('cartMenu') ? true : false}>Close Order</button>
                                                : null}
                                        </div>
                                    </div>
                                </div>

                                <div id="justification_div"></div>
                            </div>
                        </div>
                    </div>
                    : <div className="HeaderContainer">
                        <MenuIcon onClick={() => props.openSidebar()} />
                        <div className="HeaderLogoContainer">
                            <Logo
                                src={require('../../assets/logo.png').default}
                                onClick={() => props.history.push('/')}
                            />
                        </div>
                        {!customer ?
                            <>
                                <HeaderButton
                                    src={require('../../assets/signin_icon.png').default}
                                    text="Sign In"
                                    onClick={() => props.history.push('/customer/signin')}
                                />
                                <HeaderButton
                                    red
                                    text="Sign Up"
                                    onClick={() => props.history.push('/customer/signup')}
                                />
                            </>
                            :
                            <HeaderButton
                                red
                                src={require('../../assets/cart.png').default}
                                text="Cart"
                                itemCounts={0}
                            />
                        }
                    </div>
                : null}
            {
                viewAddons && selectedItem ?
                    <ViewAddon
                        setViewAddons={setViewAddons}
                        selectedItem={selectedItem}
                        restaurantId={restaurantId}
                        edit={true}
                        addedAddons={addedAddons}
                        editInded={editInded}
                        editedQuantity={editedQuantity}
                        specialInstructions={specialInstructions}
                    />
                    :
                    null
            }
        </>
    )
}

export default withRouter(Header)