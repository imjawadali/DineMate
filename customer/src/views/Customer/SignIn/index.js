import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.css';
import fb from '../../../assets/fb.png';
import enter from '../../../assets/enter.png';
import { customisedAction } from '../../../redux/actions';
import { INITIALIZE_ORDER, SIGN_IN } from '../../../constants';

function SignIn(props) {

    const [isEmailSignIn, setIsEmailSignIn] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setRedirect] = useState('');
    const dispatch = useDispatch()
    const { history } = props

    const customer = useSelector(({ sessionReducer }) => sessionReducer.customer)

    // const signInSuccess = useSelector(({ sessionReducer }) => sessionReducer.customer)
    // const [resturantId, setResturantId] = useState('')
    // const [tableId, setTableId] = useState('')


    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     setResturantId(urlParams.get("resturantId"))
    //     setTableId(urlParams.get("tableId"))

    // }, [window.location.search])

    // useEffect(() => {
    //     if (signInSuccess) {

    //         console.log('signInSuccess')
    //         dispatch(customisedAction(INITIALIZE_ORDER, { resturantId, tableId }))
    //     }

    // }, [
    //     signInSuccess
    // ])



    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setRedirect(urlParams.get("redirect"))

    }, [window.location.search])

    console.log(redirect)

    useEffect(() => {
        if (customer && redirect) {
            props.history.push(redirect)
        }
        else if(!redirect && customer){
            props.history.push('/')
        }
    }, [customer])
    
    const redirectFn = () =>{
        dispatch(customisedAction(SIGN_IN, { email, password }))
        
    }

    return (
        <>
            {isEmailSignIn ?
                <div className="sign-in">
                    <div className="content-div">
                        <div>
                            <img src={enter} onClick={() => setIsEmailSignIn(!isEmailSignIn)} className="enter-logo" />
                        </div>

                        <div className="welcome-title">Log in with your email</div>

                        <div className="sub-title">Enter your email address and password</div>

                        <div>
                            <input
                                type="email"
                                className="form-field"
                                placeholder="Email"
                                onChange={({ target: { value } }) => setemail(value)}
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                style={{ marginTop: 10 }}
                                className="form-field"
                                placeholder="Password"
                                onChange={({ target: { value } }) => setpassword(value)}
                            />
                        </div>

                        <div className="login-div">
                            <div className="login-text" onClick={() => redirectFn()}>
                                Log In
                            </div>
                        </div>

                        <div className="forgot-password" style={{ cursor: 'pointer' }} onClick={() => history.push('/customer/forgotPassword')}>
                            I forgot my password
                        </div>

                        <div className="no-account">
                            Don't have an account? <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => history.push('/customer/signup')}>&nbsp;Sign Up</span>
                        </div>
                    </div>
                </div>
                :
                <div className="sign-in">
                    <div className="content-div">
                        <div className="welcome-title">Welcome!</div>

                        <div className="sub-title">Sign up or log in to continue</div>

                        <div className="facebook-div" style={{ padding: 11 }}>
                            <div>
                                <img className="fb-logo" src={fb} />
                            </div>

                            <div className="facebook-text" style={{ margin: 'auto' }}>
                                CONTINUE WITH FACEBOOK
                            </div>
                        </div>

                        <div className="or">or</div>

                        <div className="email-div" onClick={() => setIsEmailSignIn(!isEmailSignIn)}>
                            <div className="email-text">
                                CONTINUE WITH EMAIL
                            </div>
                        </div>

                        <div className="sub-text">
                            By signing up, you agree to our <span className="terms">Terms and Conditions</span> and <span className="terms">Privacy Policy.</span>
                        </div>
                    </div>
                </div>}
        </>
    )
    }

    export default SignIn