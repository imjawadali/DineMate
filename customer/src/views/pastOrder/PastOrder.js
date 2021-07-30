import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { GET_ALL_ORDERS } from '../../constants'
import { customisedAction } from '../../redux/actions'
import './pastOrder.css'
function PastOrder(props) {
    let dispatch = useDispatch()
    const pastOrder = useSelector(({ allOrderReducer }) => allOrderReducer.orders)
    const [pastHistory, setPastHistory] = useState([])
    const [currentOrder, setCurrentOrder] = useState([])
    const [orderArr, setOrderArr] = useState([])
    const [tab, setTab] = useState('past')
    useEffect(() => {
        dispatch(customisedAction(GET_ALL_ORDERS))
    }, [])

    useEffect(() => {
        if (pastOrder) {
            let activeArr = []
            let inactiveArr = []
            pastOrder.map((a, i) => {
                if (a.active === 1) {
                    activeArr.push(a)
                } else if (a.active === 0) {
                    inactiveArr.push(a)
                }
            })
            setCurrentOrder(activeArr)
            setPastHistory(inactiveArr)
            setOrderArr(inactiveArr)
        }
    }, [pastOrder])
    useEffect(() => {
        if (tab === 'past') {
            setOrderArr(pastHistory)
        } else if (tab === 'current') {
            setOrderArr(currentOrder)
        }
    }, [tab])
    return (
        <div className="pastOrderPage">
            <div className="pastOrders">
                <div className="pastTabs">
                    <div className={tab === 'past' ? "tab active" : 'tab'} onClick={() => setTab('past')}>Past Orders</div>
                    <div className={tab === 'current' ? "tab active" : 'tab'} onClick={() => setTab('current')} > Current Orders</div>
                </div>
                <div className="orders">
                    {orderArr && orderArr.map((a, i) => {
                        return (
                            <div className="orderDetail">
                                <div className="fromDiv">
                                    <h5>Order From:</h5>
                                    <h3>{a.restaurantName}</h3>
                                </div>
                                <div className="detailDiv">
                                    <h3 onClick={()=>console.log(a)}>${a.billAmount}</h3>
                                    <button onClick={()=>props.history.push(`/customer/pastOrder/orderDetails?restaurantId=${a.restaurantId}&restaurantName=${a.restaurantName}&orderNumber=${a.orderNumber}`)}>View Detail</button>
                                </div>
                            </div>

                        )
                    })
                    }

                </div>
            </div>
        </div>
    )
}

export default withRouter(PastOrder)
