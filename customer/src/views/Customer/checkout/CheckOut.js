import React, { useEffect, useState } from 'react'
import './checkout.css'
import serviceIcon from './../../../assets/Group 6409.png'

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



    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('cartMenu'))
        if (data) {
            setProducts(data)
        }
    }, [])

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
                                <p>{a.quanity}x {a.name}</p>
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
                        <img src={serviceIcon} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CheckOut
