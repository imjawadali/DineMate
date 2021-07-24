import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import image from '../../assets/Group6611.png';
import BGimage from '../../assets/Group6612.png';
import BottomGlass from '../../assets/BottomGlass.png';
import centerImg from '../../assets/centerImg.png';
import centerBeef from '../../assets/centerBeef.png';
import BottomChips from '../../assets/BottomChips.png';
import Chilli from '../../assets/Chilli.png';
import google from '../../assets/GoogleStore.png';
import apple from '../../assets/AppleNewBtn.png';
import computer from '../../assets/computer.png';
import './styles.css';
import { customisedAction } from '../../redux/actions';
import { INITIALIZE_ORDER } from '../../constants';
import { getItem } from '../../helpers';

function ContinueWith(props) {
    const genericData = useSelector(({ serviceReducer }) => serviceReducer.genericData)

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
    const redirect = () => {
        let loginCustomer = getItem('customer') ? getItem('customer') : false;
        if (loginCustomer) {
            props.history.push(`/customer/${restaurantId}/menu`)
            initOrder();
        } else {
            props.history.push(`/customer/signin/?redirect=/${restaurantId}/${tableId}`)
        }
    }

    return (
        <>
            <div className="ContinueWith" style={{ backgroundImage: `url(${BGimage})` }}>
                <img src={BottomGlass} className="BottomGlass" />
                <img src={BottomChips} className="BottomChips" />
                <img src={Chilli} className="Chilli" />
                <img src={centerBeef} className="centerBeef" />
                <img src={centerImg} className="centerImg" />
                <div className="flex-1 alignItem-center flex justify-center">
                    <img className="ios-android" src={image} />
                </div>

                <div className="flex-1" style={{ display: 'flex', zIndex: 98, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="landingPageContentDiv">Experience the <span style={{ color: "#E93936" }}>finest <br /> quality</span> of food</div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                        <div style={{ margin: '0 5px' }}>
                            <img className="play-store" src={apple} />
                        </div>
                        <div style={{ margin: '0 5px' }}>
                            <img className="play-store" src={google} />
                        </div>
                    </div>

                    <div style={{ marginBottom: 20, fontSize: 34, fontWeight: 'bolder', textTransform: "uppercase", color: "white" }}>Or</div>
                    <div style={{ display: 'flex', marginBottom: 20, cursor: 'pointer', background: '#FFFFFF', padding: 3, borderRadius: 5, alignItems: 'center' }} className="TheWebAppBtn"
                        onClick={() => { redirect(); }}>
                        <div style={{ display: 'flex', borderRadius: 5, alignItems: 'center', border: "0.5px solid black", padding: 6, }}>
                            <img className="computer-img" src={computer} />
                            <div className="TheWebAppBtnTextDIv">
                                <span style={{ fontSize: 13, textAlign: "center" }}>Start using</span>
                                <span style={{ fontSize: 18, fontWeight: 600, textAlign: "center" }}>The Web App</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="global-footer-bottom" style={{ width: "75%", margin: "auto" }}>
                <div className="footer-bottom-left">
                    <p style={{ color: "black" }}> © 2021 Dine Mate. All Rights Are Reserved.</p>
                </div>
                <div className="footer-bottom-right">
                    <a href={genericData && genericData.facebookLink} className="footer-bottom-right-logo">
                        <img src={require("../../assets/fblogo.png").default} />
                    </a>
                    <a href={genericData && genericData.instagramLink} className="footer-bottom-right-logo">
                        <img src={require("../../assets/instagramlogo.png").default} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default ContinueWith