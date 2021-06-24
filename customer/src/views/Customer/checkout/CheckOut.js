import React from 'react'
import './checkout.css'
import serviceIcon from './../../../assets/Group 6409.png'

function CheckOut() {
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
                    <div className="itemCart">
                        <p>1X Iced Cap</p>
                        <p>$ 1.79</p>
                    </div>
                    <div className="itemCart">
                        <p>1X Iced Cap</p>
                        <p>$ 1.79</p>
                    </div>
                    <div className="totalCart">
                        <p>1X Iced Cap</p>
                        <p>$ 1.79</p>
                    </div>
                </div>
                <div className="pickUpTime">
                    <h2>Pick Up Time</h2>
                    <label >
                        <input type="date"></input>
                    </label>
                </div>
                <div className="pickUpLocation">
                    <h2>Pick Up Location</h2>
                    <div>
                        <textarea rows="3"></textarea>
                    </div>
                </div>
                <div className="pickUpPayment">
                    <h2>Payment</h2>
                    <div>
                        <p>Select Payment Method</p>
                        <select >
                            <option>Cash</option>
                            <option>Credit Card</option>
                        </select>
                    </div>
                </div>
                <div className="Ammount">
                    <div>
                        <h2><span>Payment Amount</span> $4.28</h2>
                        <button className="payBtn">Pay Now</button>
                        </div>
                    <div>
                            <img src={serviceIcon}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut
