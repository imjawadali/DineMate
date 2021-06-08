import React, { useState } from 'react';
import './styles.css';
import signup_icon from '../../../assets/signup_icon.png';

function ForgotPassword() {

    const [email, setEmail] = useState('');

    return (
        <div className="sign-up">
            <div className="content-div">
                <div>
                    <img src={signup_icon} className="enter-logo" />
                </div>

                <div className="welcome-title">Whats your email?</div>

                <div className="sub-title">We'll check if you have an account</div>

                <div>
                    <input type="email" className="form-field" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                </div>

                <div className={email ? "signup-div" : "signup-div signup-div-disabled"}>
                    <div className="signup-text">
                        CONTINUE
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword