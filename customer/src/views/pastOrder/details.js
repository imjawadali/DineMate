import React, { useEffect, useState } from 'react'
// import './checkout.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import serviceIcon from './../../../assets/Group 6409.png'
// import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { GET_ORDER_ITEMS } from '../../constants'
import { customisedAction } from '../../redux/actions'
// import { customisedAction } from '../../../redux/actions'
// import { CALL_FOR_SERVICE, CLOSE_ORDER, DONOTDISTURB, GET_ORDER_ITEMS, GET_RESTAURANT_DETAILS } from '../../../constants'
// import { getItem, setItem } from '../../../helpers'


function Detail(props) {

    const [products, setProducts] = useState([])
    const [restaurantName,setRestaurantName] = useState('')
    // const [pickUpTime, setPickUpTime] = useState("")
    // const [pickUpLocation, setPickUpLocation] = useState("")
    // const [payment, setPayment] = useState("cash")
    // const [cardNumber, setCardNumber] = useState("")
    // const [cardName, setCardName] = useState("")
    // const [expiryDate, setExpiryDate] = useState("")
    // const [securityCode, setSecurityCode] = useState("")
    // const [zipCode, setZipCode] = useState("")
    // const [openCall, setOpenCall] = useState(false)
    // const [selectedServices, setSelectedServices] = useState([]);
    // const [message, setMessage] = useState('')
    // const [doNotDisturb, setDoNotDisturb] = useState(false)
    // const [doNotDisturbActive, setDoNotDisturbActive] = useState()
    // const [testArr, setTestArr] = useState([])
    // const [orderDetail, setOrderDetail] = useState("")
    // const [TakeAwayOrder, setTakeAwayOrder] = useState("")


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
                                <p>${a.totalPrice}</p>
                            </div>
                        )
                    }) : null}


                    {products && products.discountAmount ?
                        <div className="itemCart">
                            <p>Discount Amount</p>
                            <p>${products.discountAmount}</p>
                        </div> : null}
                    {products && products.tip ?
                        <div className="itemCart">
                            <p>Tip Amount</p>
                            <p>${products.tip}</p>
                        </div> : null}
                    {products && products.taxAmount ?
                        <div className="itemCart">
                            <p>HST Amount</p>
                            <p>${products.taxAmount}</p>
                        </div> : null
                    }
                    <div className="totalCart">
                        <p onClick={() => console.log(products)}>Total</p>
                        {/* <p>$ {products.length ? products.reduce((a, b) => a.totalPrice + b.totalPrice) : 0}</p> */}
                        <p>${products && products.billAmount}</p>
                    </div>
                </div>

            </div >
        </div >
    )
}

export default Detail
