import React, { useEffect, useState } from 'react'
import './checkout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import serviceIcon from './../../../assets/Group 6409.png'
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import { customisedAction } from '../../../redux/actions'
import { CALL_FOR_SERVICE, DONOTDISTURB } from '../../../constants'
import { getItem, setItem } from '../../../helpers'


function CheckOut() {

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
    const [testArr,setTestArr] = useState([])
    const dispatch = useDispatch()




    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('cartMenu')) ? JSON.parse(localStorage.getItem('cartMenu')) : []  
        if (data.length) {
        console.log(data)
        setProducts(data)
        }
    }, [])
 

    useEffect(() => {
        setDoNotDisturbActive(getItem('doNotDisturb'))
        console.log(getItem('doNotDisturb'))

    }, [doNotDisturb])

    const disturb = () => {
        if (products) {
            setItem('doNotDisturb', doNotDisturb)
            let obj = {
                "restaurantId": products && products[0].restaurantId,
                "orderNumber": "000000005",
                "enabled": getItem('doNotDisturb')
            }
            dispatch(customisedAction(DONOTDISTURB, obj))
        }

    }

    const callService = (msg) => {
        let obj = {
            "restaurantId": products[0].restaurantId,
            "tableId": "1",
            "orderNumber": "000000005",
            "type": 1,
            "text": msg
        }

        dispatch(customisedAction(CALL_FOR_SERVICE, obj))
    }

    return (
        <div className="CheckOut">
            <div className="checkoutForm">
                <div className="heading">
                    <h1>
                        Order Details
                    </h1>
                    <p className="from">From: <span>Tim Hortons</span></p>
                </div>
                <div className="menuCart">
                    {products.length ? products.map((a, i) => {
                        return (
                            <div className="itemCart" onClick={() => console.log(a)}>
                                <p>{a.quantity}x {a.name}</p>
                                <p>$ {a.totalPrice}</p>
                            </div>
                        )
                    }) : null}
                    <div className="totalCart">
                        <p>Total</p>
                        <p>$ {products.length ? products.reduce((a, b) => a.totalPrice + b.totalPrice) : 0}</p>
                    </div>
                </div>
                <div className="pickUpTime">
                    <h2>Pick Up Time</h2>
                    <label >
                        <input onChange={(ev) => setPickUpTime(ev.target.value)} type="date"></input>
                    </label>
                </div>
                <div className="pickUpLocation">
                    <h2>Pick Up Location</h2>
                    <div>
                        <textarea onChange={(ev) => setPickUpLocation(ev.target.value)} rows="3"></textarea>
                    </div>
                </div>
                <div className="pickUpPayment">
                    <h2>Payment</h2>
                    <div>
                        <p>Select Payment Method</p>
                        <select defaultValue={payment} onChange={(ev) => { setPayment(ev.target.value); console.log(ev.target.value) }} >
                            <option value="cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                    </div>
                    {payment !== 'cash' ?
                        <>
                            <div>
                                <input placeholder='Name on your card' onChange={(ev) => setCardName(ev.target.value)} />
                            </div>
                            <div>
                                <input placeholder="Card Number" onChange={(ev) => setCardNumber(ev.target.value)} />
                            </div>
                            <div className="dateCode">
                                <input placeholder="Expiry Date" onChange={(ev) => setExpiryDate(ev.target.value)} />
                                <input placeholder="Security Code" onChange={(ev) => setSecurityCode(ev.target.value)} />
                            </div>
                            <div>
                                <input placeholder="Zip or Postal Code" onChange={(ev) => setZipCode(ev.target.value)} />
                            </div>
                        </>
                        : payment === 'cash' ? null : null}

                </div>
                <div className="Ammount">
                    <div>
                        <h2><span>Payment Amount</span> $4.28</h2>
                        <button className="payBtn">Pay Now</button>
                    </div>
                    <div>
                        <img src={serviceIcon} onClick={() => setOpenCall(true)} />
                    </div>
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
                                <div onClick={() => callService(message)} className={selectedServices.length > 0 ? "send-button" : "send-button disabled-send-button"} onClick={callService}>
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
