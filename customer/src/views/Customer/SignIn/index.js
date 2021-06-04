import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import './styles.css';
import fb from '../../../assets/fb.png';
import enter from '../../../assets/enter.png';
import { customisedAction } from '../../../redux/actions';
import { SIGN_IN } from '../../../constants';

function SignIn(props) {

    const [isEmailSignIn, setIsEmailSignIn] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const dispatch = useDispatch()

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
                            onChange={({ target: { value }}) => setemail(value)}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            style={{ marginTop: 10 }}
                            className="form-field"
                            placeholder="Password"
                            onChange={({ target: { value }}) => setpassword(value)}
                        />
                    </div>

                    <div className="login-div">
                        <div className="login-text" onClick={() => dispatch(customisedAction(SIGN_IN, { email, password, history }))}>
                            Log In
                        </div>
                    </div>

                    <div className="forgot-password">
                        I forgot my password
                    </div>

                    <div className="no-account">
                        Don't have an account? <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>&nbsp;Sign Up</span>
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