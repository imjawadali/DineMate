import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_ORDER_ITEMS } from '../../constants';
import { getItem } from '../../helpers';
import { customisedAction } from '../../redux/actions';
import "./styles.css"


const MenuListItemComponent = props => {
    const { heading, subHeading, onClick, image, menuItem, price, addToCart, cartValue } = props;
    let dispatch = useDispatch()
    const orderItem = useSelector(({ getOrderItemsReducer }) => getOrderItemsReducer.OrderItems)
    const cartItemR = useSelector(({ orderReducer }) => orderReducer.cartMenu)
    const [items, setItem] = useState([])


    // useEffect(() => {
    //     let orderDetailsLocal = getItem('orderDetails') ? getItem('orderDetails') : getItem('cartMenu') ? getItem('cartMenu')[0] : []
    //     let obj = {
    //         "restaurantId": orderDetailsLocal.restaurantId,
    //         "orderNumber": orderDetailsLocal.orderNumber
    //     }
    //     dispatch(customisedAction(GET_ORDER_ITEMS, obj))
    // }, [])

    // useEffect(() => {
    //     let localItem = cartItemR ? cartItemR : getItem('cartMenu') ? getItem('cartMenu') : []
    //     let getItemR = orderItem ? orderItem : []
    //     let mixItem = []
    //     if (localItem) {
    //         localItem.map((a, i) => {
    //             mixItem.push(a)
    //         })
    //     }
    //     if (getItemR && getItemR.orderItems) {
    //         getItemR.orderItems.map((a, i) => {
    //             mixItem.push(a)
    //         })
    //     }
    //     setItem(mixItem)
    // }, [orderItem, cartItemR])
    // console.log(items)
    return (
        <>
            {/* {items.length && items.map((a, i) => {
                return (
                    a.id === menuItem.id ?
                        <div className="quantity">{a.quantity}</div>
                        : null
                )
            })
            } */}
        <a className="MLIComponent" onClick={onClick}>
            <div className="MLIComponent-Left">
                <div className="MLIComponent-Left-top">
                    <h2 onClick={()=>console.log(menuItem)}>{heading}</h2>
                    <h3>{subHeading}</h3>
                </div>
                <div className="MLIComponent-Left-bottom">
                    <h2>${price}</h2>

                </div>
            </div>
            <div className="MLIComponent-Right">
                <div className="MLIComponent-Right-img">
                    <img src={require("../../assets/bgimage.png").default} />
                </div>
                <div className="MLIComponent-Right-cart">
                    {addToCart && <div className="MLIComponent-Right-cart-added">
                        <p>{cartValue}</p>
                    </div>
                    }

                </div>

            </div>
        </a>
        </>
    )
}


export default MenuListItemComponent