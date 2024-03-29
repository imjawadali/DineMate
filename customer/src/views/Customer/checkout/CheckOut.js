import React, { useEffect, useState } from 'react'
import {
    StripeProvider,
    Elements,
} from 'react-stripe-elements'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import serviceIcon from './../../../assets/Group 6409.png'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { customisedAction } from '../../../redux/actions'
import { CALL_FOR_SERVICE, CANT_PAY, CLOSE_ORDER, DONOTDISTURB, GET_ORDER_ITEMS, GET_RESTAURANT_DETAILS } from '../../../constants'
import { getItem, setItem, loadScript } from '../../../helpers'

import StripeForm from './StripeForm'
import './checkout.css'


function CheckOut(props) {

    const [stripeLoaded, setStripeLoaded] = useState({})
    const [products, setProducts] = useState([])

    const [pickUpTime, setPickUpTime] = useState("")
    const [pickUpLocation, setPickUpLocation] = useState("")
    const [payment, setPayment] = useState("cash")
    const [cardNumber, setCardNumber] = useState("")
    const [cardName, setCardName] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [securityCode, setSecurityCode] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [openCall, setOpenCall] = useState(false)
    const [selectedServices, setSelectedServices] = useState([]);
    const [message, setMessage] = useState('')
    const [doNotDisturb, setDoNotDisturb] = useState(false)
    const [doNotDisturbActive, setDoNotDisturbActive] = useState()
    const [testArr, setTestArr] = useState([])
    const [orderDetail, setOrderDetail] = useState("")
    const [TakeAwayOrder, setTakeAwayOrder] = useState("")
    const [tip, setTip] = useState("")
    const [data, setData] = useState("")

    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)

    // const resDet = useSelector(({ menuReducer }) => menuReducer.restaurant)

    useEffect(() => {
        loadScript('https://js.stripe.com/v3/').then(result => setStripeLoaded(result))
    }, [])

    const dispatch = useDispatch()
    const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)

    let takeOrderItems = useSelector(({ getTakeOrderItemsReducer }) => getTakeOrderItemsReducer.takeOrderItems)

    useEffect(() => {
        setTimeout(() => {
            setOrderDetail(getItem('orderDetails'))
        }, [1000])
        // if (orderDetail && orderDetail.type.toLowerCase() === 'take-away') {
        setProducts(getItem('cartMenu'))

        // }
    }, [])
    useEffect(() => {
        setOrderDetail(getItem('orderDetails'))
    }, [orderDetails])




    useEffect(() => {
        if (orderDetail) {

            let obj = {
                restaurantId: orderDetail.restaurantId,
                orderNumber: orderDetail.orderNumber,

            }
            // dispatch(customisedAction(GET_RESTAURANT_DETAILS, { restaurantId: orderDetail.restaurantId }))

            dispatch(customisedAction(GET_ORDER_ITEMS, obj))
        } else {
            // setProducts(getItem("cartMenu"))
        }

    }, [])
    useEffect(() => {
        if (orderDetail) {
            let obj = {
                'restaurantId': orderDetail.restaurantId,
            }
            dispatch(customisedAction(GET_RESTAURANT_DETAILS, obj))
        }
    }, [])


    let dataOrder = useSelector(({ getOrderItemsReducer }) => getOrderItemsReducer.OrderItems)
    let resturantDetail = useSelector(({ menuReducer }) => menuReducer.restaurant)

    useEffect(() => {


        // setTimeout(() => {
        if (orderDetails && orderDetails.type.toLowerCase() === 'dine-in') {

            let data = dataOrder ? dataOrder : []
            if (data.orderItems) {
                setProducts(data.orderItems)
                setData(data)
            }
        } else if (getItem(orderDetail) && getItem(orderDetail).type.toLowerCase() === 'take-away') {
            let data = TakeAwayOrder ? TakeAwayOrder : []
            if (data.length) {
                setProducts(data)
                setData(data)

            }
        }
        // }, [500])

    }, [dataOrder, TakeAwayOrder, orderDetails])

    useEffect(() => {
        if (resturantDetail) {
            setPickUpLocation(resturantDetail.address)
        }
    }, [resturantDetail])


    useEffect(() => {
        setDoNotDisturbActive(getItem('doNotDisturb'))

    }, [doNotDisturb])

    const disturb = () => {


        if (orderDetails && orderDetails.type.toLowerCase() === 'dine-in') {
            setItem('doNotDisturb', doNotDisturb)
            let obj = {
                "restaurantId": orderDetails.restaurantId,
                "orderNumber": "000000005",
                "enabled": getItem('doNotDisturb')
            }
            dispatch(customisedAction(DONOTDISTURB, obj))
        } else if (getItem(orderDetail) && getItem(orderDetail).type.toLowerCase() === 'take-away') {
            setItem('doNotDisturb', doNotDisturb)
            let obj = {
                "restaurantId": getItem(orderDetail).restaurantId,
                "orderNumber": "000000005",
                "enabled": getItem('doNotDisturb')
            }
            dispatch(customisedAction(DONOTDISTURB, obj))
        }

        // if (products) {

        // }

    }

    const callService = (msg) => {

        if (orderDetails && orderDetails.type.toLowerCase() === 'dine-in') {
            let obj = {
                "restaurantId": orderDetails.restaurantId,
                "tableId": orderDetails.tableId,
                "orderNumber": orderDetails.orderNumber,
                "text": msg
            }
            dispatch(customisedAction(CALL_FOR_SERVICE, obj))
        } else if (orderDetail && orderDetail.type.toLowerCase() === 'take-away') {
            let obj = {
                "restaurantId": orderDetail.restaurantId,
                "tableId": orderDetail.tableId,
                "orderNumber": orderDetail.orderNumber,
                "text": msg
            }
            dispatch(customisedAction(CALL_FOR_SERVICE, obj))
        }

    }

    function totalAmount() {
        let price = 0
        if (products) {
            products.map((a, i) => {
                price += a.totalPrice
            })
        }
        return price
    }


    const payNow = () => {
        if (orderDetail && ((dataOrder && dataOrder.orderItems) || (takeOrderItems && takeOrderItems.orderItems))) {

            let obj = {
                "restaurantId": orderDetail.restaurantId,
                "orderNumber": orderDetail.orderNumber,
                "type": orderDetail.type,
                'tip': tip
            }
            dispatch(customisedAction(CLOSE_ORDER, obj))
            if (orderDetails && orderDetails.type.toLowerCase() === 'dine-in') {
                setTimeout(() => {
                    props.history.push(`/customer/${orderDetail.restaurantId}/menu`)
                }, 2000)
            }
        } else {
            dispatch(customisedAction(CANT_PAY))
        }
    }

    useEffect(() => {
        if (takeOrderItems) {
            setProducts(takeOrderItems.orderItems)
            setData(takeOrderItems)

        }
    }, [takeOrderItems])

    useEffect(() => {
        let order = getItem('orderDetails') ? getItem('orderDetails') : false
        if (order === false) {
            props.history.push('/customer/restaurants')
            console.log(order, 'order')
        }
    }, [])


    return (
        <div className="CheckOut">
            <div className="checkoutForm">
                <div className="heading">
                    <h1>
                        Order Details
                    </h1>
                    <p className="from">From: <span>{resturantDetail ? resturantDetail.restaurantName : ''}</span></p>
                </div>
                <div className="menuCart">
                    {products && products.length ? products.map((a, i) => {
                        return (
                            <div className="itemCart">
                                <p>{a.quantity}x {a.name}</p>
                                <p>${a.totalPrice}</p>
                            </div>
                        )
                    }) : null}

                    {data && data.discountAmount ?
                        <div className="itemCart">
                            <p>Discount Amount ({data.discount})</p>
                            <p>${data.discountAmount}</p>
                        </div> : null}

                    {data ? <div className="itemCart">
                        <p>HST Amount ({data.taxPercentage})</p>
                        <p>${data.taxAmount}</p>
                    </div> : null}

                    {data && data.tip ?
                        <div className="itemCart">
                            <p>Tip Amount</p>
                            <p>${data.tip}</p>
                        </div> : null}

                    <div className="totalCart">
                        <p onClick={() => console.log(data)}>Total</p>
                        <p>${data && data.billAmount}</p>
                    </div>
                </div>
                {orderDetail && orderDetail.type.toLowerCase() === 'take-away' ?
                    <div className="pickUpLocation">
                        <h2>Pick Up Location</h2>
                        <div>
                            <textarea value={pickUpLocation} onChange={(ev) => setPickUpLocation(ev.target.value)} rows="3" disabled></textarea>
                        </div>
                    </div> : null
                }

                <div className="PaymentContainer">
                    <div className="pickUpPayment">
                        <h2>Payment</h2>
                        <div>
                            <p>Select Payment Method</p>
                            <select defaultValue={payment} onChange={(ev) => { setPayment(ev.target.value); }} >
                                <option value="cash">Cash</option>
                                <option value="Credit Card">Credit Card</option>
                            </select>
                        </div>
                        {payment !== 'cash' && stripeLoaded.successful ?
                            <StripeProvider apiKey={"pk_test_51JRhRhAYACBOiDJuv9pN6Hx9uhGJStNAHmEg6dEcbvMW4aMydVT7K7nFSMDO1vlLOSqUmZ7oCRH0yl1WcU6MuK8J00UvJgVvIi"}>
                                <Elements>
                                    <StripeForm
                                        orderDetails={orderDetail || {}}
                                        tip={tip}
                                        billAmount={data ? data.billAmount || 0 : 0}
                                        email={customer ? customer.email : ''}
                                    />
                                </Elements>
                            </StripeProvider>
                            : <div className="Ammount">
                                <div className="ammountDiv">
                                    <h2><span>Payment Amount</span> ${(Number(data ? data.billAmount : 0) + Number(tip)).toFixed(2)}</h2>
                                    <label>
                                        <p>Enter Tip Here</p>
                                        <input
                                            style={{
                                                border: '1px solid #ef6e6c',
                                                paddingLeft: '10px',
                                                paddingRight: '10px'
                                            }}
                                            placeholder="1.00 ($)"
                                            type="number"
                                            value={tip}
                                            onChange={({ target: { value } }) => setTip(value)} />
                                    </label>
                                    <button className="payBtn" onClick={payNow}>Pay Now</button>
                                </div>
                            </div>
                        }

                    </div>
                                {orderDetail && orderDetail.type.toLowerCase() === 'dine-in' ?

                                <div>
                                    <img src={serviceIcon} onClick={() => setOpenCall(true)} />
                                </div>
                                : null}
                </div>
            </div>
            {
                openCall ?
                    <div className="call-service-div">
                        <div className="call-service-dialog">
                            <div className="close-dialog-div">
                                <div className="icon-title-div">
                                    <span className="dialog-icon">
                                        <img src={require("../../../assets/Group 6409.png").default} className="searchbar-image-cart" />
                                    </span>

                                    <span className="call-for-service">Call For Services</span>
                                </div>

                                <div>
                                    <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setOpenCall(false)} />
                                </div>
                            </div>

                            <div className="services-div">
                                <div
                                    className={selectedServices.includes("WATER") ? "service" : "service warn-service"}
                                    onClick={() => {
                                        callService("water")

                                    }}
                                >
                                    <div>
                                        <img src={require("../../../assets/Group 6410.png").default} className="service-icon" />
                                    </div>
                                    Water
                                </div>

                                <div
                                    className={selectedServices.includes("HELP") ? "service" : "service warn-service"}
                                    onClick={() => {
                                        callService("help")


                                    }}
                                    style={{ position: 'relative' }}
                                >
                                    <div>
                                        <img src={require("../../../assets/Path 7705.png").default} className="service-icon" />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 8 }}>Help</div>
                                </div>

                                <div
                                    className={doNotDisturbActive ? "service" : "service warn-service"}
                                    // className={selectedServices.includes("DISTURB") ? "service" : "service warn-service"}
                                    onClick={() => {
                                        setDoNotDisturb(!doNotDisturb)
                                        disturb()
                                        selectedServices.includes("DISTURB") ?
                                            setSelectedServices(selectedServices.filter(service => service !== 'DISTURB')) :
                                            setSelectedServices([...selectedServices, "DISTURB"])
                                    }}
                                >
                                    <div>
                                        <img src={require("../../../assets/Group 4691.png").default} className="service-icon" />
                                    </div>
                                    Do not Disturb
                                </div>

                                <div
                                    className={selectedServices.includes("BILL") ? "service" : "service warn-service"}
                                    onClick={() => {
                                        callService("bill")


                                    }}
                                >
                                    <div>
                                        <img src={require("../../../assets/Group 6412.png").default} className="service-icon" />
                                    </div>
                                    Bill
                                </div>
                            </div>

                            <div className="description-div">
                                <textarea onChange={(ev) => setMessage(ev.target.value)} type="text" placeholder="Description" className="text-area" />
                            </div>

                            <div className="send-button-div">
                                <div onClick={() => callService(message)} className="send-button">
                                    <div>Send Message</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div >
    )
}

export default CheckOut


