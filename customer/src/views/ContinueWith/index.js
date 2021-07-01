import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import image from '../../assets/ios-android.jpg';
import google from '../../assets/google.png';
import apple from '../../assets/apple.png';
import computer from '../../assets/computer.png';
import './styles.css';
import { customisedAction } from '../../redux/actions';
import { INITIALIZE_ORDER } from '../../constants';
import { getItem } from '../../helpers';

function ContinueWith(props) {

    const initializingOrder = useSelector(({ orderReducer }) => orderReducer.initializingOrder)
    const checkingOrder = useSelector(({ orderReducer }) => orderReducer.checkingOrder)
    const orderDetails = useSelector(({ orderReducer }) => orderReducer.orderDetails)
    const dispatch = useDispatch()

    let { restaurantId, tableId } = useParams();

    // useEffect(() => {
    //     if (tableId && !checkingOrder && !initializingOrder && !orderDetails){
    //         dispatch(customisedAction(INITIALIZE_ORDER, { restaurantId, tableId }))
    //     }
    // }, [])
    const initOrder = () => {
        if (tableId && !checkingOrder && !initializingOrder && !orderDetails) {
            dispatch(customisedAction(INITIALIZE_ORDER, { restaurantId, tableId }))
        }
    }
    // const redirect = () => {
    //     let loginCustomer = getItem('customer') ? getItem('customer') : false;
    //     if(loginCustomer){
    //         props.history.push(`/customer/${restaurantId}/menu`)
    //         initOrder();
    //     } else{
    //         props.history.push(`/customer/signin/?resturantId=${restaurantId}?tableId=${tableId}`)
    //     }
    // }

    return (
        <div className="ContinueWith">
            <div className="flex-1 flex justify-center">
                <img className="ios-android" src={image} />
            </div>

            <div className="flex-1" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ margin: 50, fontSize: 24, fontWeight: 'bolder' }}>Get the App & Place Order</div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'black', borderRadius: 21, paddingTop: 4, margin: '0 5px' }}>
                        <img className="play-store" src={google} />
                    </div>

                    <div style={{ backgroundColor: 'black', borderRadius: 21, paddingTop: 4, margin: '0 5px' }}>
                        <img className="play-store" src={apple} />
                    </div>
                </div>

                <div style={{ margin: 50, fontSize: 24, fontWeight: 'bolder' }}>Or</div>

                <div style={{ marginBottom: 50, fontSize: 24, fontWeight: 'bolder' }}>Start Using</div>

                <div style={{ display: 'flex', marginBottom: 20, cursor: 'pointer', background: '#0000001c', padding: 10, borderRadius: 5, alignItems: 'center' }}
                    onClick={() => {   initOrder(); props.history.push(`/customer/${restaurantId}/menu`) }}>
                    <img className="computer-img" src={computer} />
                    <span style={{ margin: 10, fontSize: 24, fontWeight: 'bolder' }}>The Web</span>
                </div>
            </div>
        </div>
    )
}

export default ContinueWith