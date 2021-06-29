import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { customisedAction } from '../../redux/actions'
import { GET_RPOFILE, LOGOUT } from '../../constants'
import { removeItem } from '../../helpers'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import android from '../../assets/androidlogo.png';
import ios from '../../assets/ioslogo.png';
import badge from '../../assets/badge.png';
import serve from '../../assets/serve.png';
import usericon from '../../assets/usericon.png';
import arrowright from '../../assets/arrowright.png';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import './sidenav.css';
import { useEffect } from 'react';

function SideNav(props) {
    let { path } = useRouteMatch()

    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)
    const dispatch = useDispatch()

    const { sidebarOpen, closeSidebar, history } = props
    const profile = useSelector(({ profileReducer }) => profileReducer.profile)
    console.log(profile)
    
    
    useEffect(() => {
        dispatch(customisedAction(GET_RPOFILE))
      }, [])

    console.log(profile)


    return (
        <div className="sidenav" style={{ display: sidebarOpen ? 'block' : 'none' }}>
            <div className="sidenav-drawer">
                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => closeSidebar()} />

                {
                    !!customer ?
                        <>
                            <div className="dp-div">
                                <img className="profile-picture" src={profile && profile.imageUrl ? profile.imageUrl : logo } />
                            </div>

                            <div className="name-points-div">
                                <div className="username">{profile && profile.firstName} {profile && profile.lastName}</div>

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
                                <span className="route" onClick={()=>props.history.push(`/customer/profile`)}>Profiles</span>
                            </div>

                            <div 
                                className="route-section"
                                style={{ borderBottom: 'none' }}
                                onClick={() => {
                                    removeItem('customer')
                                    dispatch(customisedAction(LOGOUT))
                                }}
                            >
                                <img style={{ width: 23, marginRight: 8 }} src={arrowright} />
                                <span className="route">Logout</span>
                            </div>
                        </>
                        :
                        <>
                            <div className="sign-in-button" onClick={() => history.push('/customer/signin')}>
                                Sign In
                            </div>

                            <div className="create-add-div">
                                <div className="create-add" 
                                    onClick={() => history.push('/customer/signup')}
                                    style={{ borderBottom: '1px solid black' }}>
                                    Create an account
                                </div>
                                <div className="create-add"
                                    onClick={() => history.push('/registration')}>
                                    Add your restaurant
                                </div>
                            </div>
                        </>
                }


                <div className="dinemate-intro">
                    <img className="dinemate-logo" src={logo}
                        onClick={() => history.push('/')}/>
                    <span className="dinemate-slogan">
                        There's more to love in the app
                    </span>
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

            <div className="backdrop" onClick={() => closeSidebar()}>
            </div>
        </div>
    )
}

export default withRouter(SideNav);