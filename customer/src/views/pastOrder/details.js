import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GET_ORDER_ITEMS } from '../../constants'
import { customisedAction } from '../../redux/actions'

import badge from './../../assets/badge.png'

function Detail(props) {

    const [products, setProducts] = useState([])
    const [restaurantName,setRestaurantName] = useState('')

    const dispatch = useDispatch()

    const orderDetail = useSelector(({ getOrderItemsReducer }) => getOrderItemsReducer.OrderItems)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let restaurantId = urlParams.get("restaurantId")
        let orderNumber = urlParams.get("orderNumber")
        setRestaurantName(urlParams.get("restaurantName"))
        
        if (restaurantId && orderNumber) {

            let obj = {
                "restaurantId": restaurantId,
                "orderNumber": orderNumber
            }

            dispatch(customisedAction(GET_ORDER_ITEMS, obj))
        }
    }, [window.location.search])

    useEffect(()=>{
        if(orderDetail){
            setProducts(orderDetail)
        }
    },[orderDetail])


    function totalAmount() {
        let price = 0
        if (products) {
            products.map((a, i) => {
                price += a.totalPrice
            })
        }
        return price
    }


    return (
        <div className="CheckOut">
            <div className="checkoutForm">
                <div className="heading">
                    <h1>
                        Order Details
                    </h1>
                    <p className="from">From: <span>{restaurantName}</span></p>
                </div>
                <div className="menuCart">
                {products && products.orderItems&&products.orderItems.length ? products.orderItems.map((a, i) => {
                        return (
                            <div className="itemCart">
                                <p>{a.quantity}x {a.name}</p>
                                <p>${(a.totalPrice || 0).toFixed(2)}</p>
                            </div>
                        )
                    }) : null}


                    {products && products.discountAmount ?
                        <div className="itemCart">
                            <p>Discount Amount ({products.discount})</p>
                            <p>-${(products.discountAmount || 0).toFixed(2)}</p>
                        </div> : null}

                    {products ?
                        <div className="itemCart">
                            <p>HST Amount ({products.taxPercentage})</p>
                            <p>${(products.taxAmount || 0).toFixed(2)}</p>
                        </div> : null}

                    {products && products.tip ?
                        <div className="itemCart">
                            <p>Tip Amount</p>
                            <p>${(products.tip || 0).toFixed(2)}</p>
                        </div> : null}

                    {products && products.pointsToRedeem ?
                        <div className="itemCart">
                            <p>Redemption ({products.pointsToRedeem} Points)<img style={{ width: 15, marginLeft: 8 }} src={badge} /></p>
                            <p>-${(products.redemptionAmount || 0).toFixed(2)}</p>
                        </div> : null}

                    <div className="totalCart">
                        <p>Total</p>
                        <p>${(products?.billAmount || 0).toFixed(2)}</p>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Detail
