import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './styles.css';
import fb from '../../../assets/fb.png';
import enter from '../../../assets/enter.png';
import { customisedAction } from '../../../redux/actions';
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { SIGN_IN } from '../../../constants';

function SignIn(props) {

    const [isEmailSignIn, setIsEmailSignIn] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [redirect, setRedirect] = useState(null);
    const dispatch = useDispatch()

    const fbAuthprovider = new FacebookAuthProvider();
    fbAuthprovider.setCustomParameters({ display: 'popup' })

    const googleAuthprovider = new GoogleAuthProvider();
    googleAuthprovider.addScope('https://www.googleapis.com/auth/contacts.readonly')
    googleAuthprovider.setCustomParameters({ login_hint: 'user@example.com' })

    const { history } = props

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setRedirect(urlParams.get("redirect"))
    }, [window.location.search])

    const fbLogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, fbAuthprovider)
            .then((result) => {
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                console.log("user", user)
                console.log("credential", credential)
                console.log("accessToken", accessToken)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.log("errorCode", errorCode)
                console.log("errorMessage", errorMessage)
                console.log("email", email)
                console.log("credential", credential)
            });
    }

    const googleLogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthprovider)
            .then((result) => {
                const user = result.user;
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                console.log("user", user)
                console.log("credential", credential)
                console.log("accessToken", accessToken)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log("errorCode", errorCode)
                console.log("errorMessage", errorMessage)
                console.log("email", email)
                console.log("credential", credential)
            });
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
                            <div className="login-text" onClick={() => dispatch(customisedAction(SIGN_IN, { email, password }, { history, redirect }))}>
                                Log In
                            </div>
                        </div>

                        <div className="forgot-password" style={{ cursor: 'pointer' }} onClick={() => history.push('/customer/forgotPassword')}>
                            I forgot my password
                        </div>

                        <div className="no-account">
                            Don't have an account? <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { redirect ? history.push(`/customer/signup/?redirect=${redirect}`) : history.push(`/customer/signup`) }}>&nbsp;Sign Up</span>
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

                            <div className="facebook-text" style={{ margin: 'auto' }}
                                onClick={() => fbLogin()}>
                                CONTINUE WITH FACEBOOK
                            </div>
                        </div>

                        <div className="or">or</div>

                        <div className="email-div" onClick={() => googleLogin()}>
                            <div className="email-text">
                                CONTINUE WITH GOOGLE
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