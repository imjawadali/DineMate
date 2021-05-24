import React, { useState } from 'react';
import './sidenav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import android from '../../assets/androidlogo.png';
import ios from '../../assets/ioslogo.png';
import badge from '../../assets/badge.png';
import serve from '../../assets/serve.png';
import usericon from '../../assets/usericon.png';
import arrowright from '../../assets/arrowright.png';

function SideNav(props) {
    const [signIn, setSignIn] = useState(false);

    return (
        <div className="sidenav">
            <div className="sidenav-drawer">
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => props.setShowSideNav(false)} />

                {
                    signIn ?
                        <>
                            <div className="dp-div">
                                <img className="profile-picture" src={logo} />
                            </div>

                            <div className="name-points-div">
                                <div className="username">Rayan Levin</div>

                                <div className="reward-points">
                                    <img style={{ width: 23, marginRight: 8 }} src={badge} />

                                    <span className="reward-point-heading">Reward Points: </span>

                                    <span className="reward-point">297</span>
                                </div>
                            </div>

                            <div className="route-section" style={{ marginTop: 40 }}>
                                <img style={{ width: 23, marginRight: 8 }} src={serve} />
                                <span className="route">Orders</span>
                            </div>

                            <div className="route-section">
                                <img style={{ width: 23, marginRight: 8 }} src={usericon} />
                                <span className="route">Profile</span>
                            </div>

                            <div className="route-section">
                                <img style={{ width: 23, marginRight: 8 }} src={arrowright} />
                                <span className="route" style={{ borderBottom: 'none' }}>Logout</span>
                            </div>
                        </>
                        :
                        <>
                            <div className="sign-in-button" onClick={() => setSignIn(true)}>
                                Sign In
                            </div>

                            <div className="create-add-div">
                                <div className="create-add" style={{ borderBottom: '1px solid black' }}>Create an account</div>
                                <div className="create-add">Add your restaurant</div>
                            </div>
                        </>
                }


                <div className="dinemate-intro">
                    <img className="dinemate-logo" src={logo} />
                    <span className="dinemate-slogan">There's more to love in the app</span>
                </div>

                <div className="url-buttons">
                    <div className="ia-button">
                        <span>
                            <img style={{ width: 11, marginRight: 8 }} src={android} />
                        </span>
                        iPhone
                    </div>

                    <div className="ia-button">
                        <span>
                            <img style={{ width: 23, marginRight: 8 }} src={ios} />
                        </span>
                        Android
                    </div>
                </div>
            </div>
        </div>
    )
}

export { SideNav };