import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MenuListItemComponent from '../../../../components/MenuListItemComponent'
import { customisedAction } from '../../../../redux/actions';
import { ALREADY_IN_CART, GET_ORDER_STATUS } from '../../../../constants';
import { useParams, withRouter } from 'react-router-dom';
import { getItem } from '../../../../helpers';
import ViewAddon from './ViewAddon'

import '../../styles.css';

const MenuListingContainer = props => {

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

    const getOrderStatusReducer = useSelector(({ getOrderStatusReducer }) => getOrderStatusReducer.status)

    useEffect(() => {
        let orderDetaillls = getItem('orderDetails')
        if (orderDetaillls) {
            dispatch(customisedAction(GET_ORDER_STATUS, {
                "restaurantId": orderDetaillls.restaurantId,
                "orderNumber": orderDetaillls.orderNumber
            }))
        }
    }, [])

    const opennAddOn = () => {
        if (getOrderStatusReducer && getOrderStatusReducer.closeRequested) {
            dispatch(customisedAction(ALREADY_IN_CART, { message: `You Have Already Submitted The Order Please Wait For Manager Response`, type: 'warning' }))
        } else
            if (JSON.parse(localStorage.getItem('orderDetails')) && JSON.parse(localStorage.getItem('orderDetails')).type.toLowerCase() === 'dine-in') {
                console.log('this')
                let cartMenu = (JSON.parse(localStorage.getItem('orderDetails')) ? JSON.parse(localStorage.getItem('orderDetails')) : []);
                if (cartMenu) {
                    if (cartMenu.restaurantId === restaurantId) setViewAddons(true)
                    else if (cartMenu.restaurantId != restaurantId)
                        dispatch(customisedAction(ALREADY_IN_CART, { message: `You can't order from different resturants at a time`, type: 'warning' }))
                } else setViewAddons(true)
            } else if (JSON.parse(localStorage.getItem('orderDetails')) && JSON.parse(localStorage.getItem('orderDetails')).type.toLowerCase() === 'take-away') {
                let cartMenu = (JSON.parse(localStorage.getItem('orderDetails')) ? JSON.parse(localStorage.getItem('orderDetails')) : []);
                if (cartMenu)
                    dispatch(customisedAction(ALREADY_IN_CART, { message: `You Have Already Submitted The Order Please Wait For Manager Response`, type: 'warning' }))
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
                }
            }
            else {
                setViewAddons(true)

            }
    }



    return (
        <div className="MenuListingContainer">
            <h1>{heading}</h1>
            <div className="MenuListingContainerItemContainer">
                {data.map((menuItem, i) => {
                    return (
                        <div
                            className={
                                items.length > 0 ? items.map((a, i) => a.id === menuItem.id ? "MenuListingContainerItem selected".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "") :
                                    "MenuListingContainerItem ".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "")) : "MenuListingContainerItem".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "")}>
                            <MenuListItemComponent
                                heading={menuItem.name}
                                subHeading={menuItem.shortDescription || 'Loaded with Cheese, with mayo'}
                                cartValue={cart.find(item => item.id == menuItem.id) ? "1" : ""}
                                price={menuItem.price}
                                onClick={() => {
                                    setSelectedItem(menuItem);
                                    console.log(menuItem);
                                    opennAddOn()
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

            {viewAddons
                ? <ViewAddon
                    setViewAddons={setViewAddons}
                    selectedItem={selectedItem}
                    restaurantId={restaurantId}
                    edit={false}
                    addedAddons={false}
                    RestaurantDetails={props.RestaurantDetails} />
                : null
            }
        </div >
    )
}

export default withRouter(MenuListingContainer)




