import React from 'react'
import './pastOrder.css'
function PastOrder() {
    return (
        <div className="pastOrderPage">
            <div className="pastOrders">
                <div className="pastTabs">
                    <div className="tab active">Past Orders</div>
                    <div className="tab">Current Orders</div>
                </div>
                <div className="orders">
                    <div className="orderDetail">
                        <div>
                            <h5>Order From:</h5>
                            <h3>Tim Hortins</h3>
                        </div>
                        <div>
                            <h3>$ 4.30</h3>
                            <button>View Detail</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PastOrder
