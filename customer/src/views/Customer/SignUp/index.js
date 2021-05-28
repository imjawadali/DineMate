import React from 'react';
import './styles.css';
import signup_icon from '../../../assets/signup_icon.png';

function SignUp() {

    return (
        <div className="sign-up">
            <div className="content-div">
                <div>
                    <img src={signup_icon} className="enter-logo" />
                </div>

                <div className="welcome-title">Lets get started!</div>

                <div>
                    <input type="email" className="form-field" placeholder="Email" />
                </div>

                <div>
                    <input type="text" className="form-field" placeholder="First Name" />
                </div>

                <div>
                    <input type="text" className="form-field" placeholder="Last Name" />
                </div>

                <div>
                    <input type="text" className="form-field" placeholder="Email Address" />
                </div>

                <div>
                    <input type="text" className="form-field" placeholder="Phone Number" />
                </div>

                <div className="signup-div">
                    <div className="signup-text">
                        SIGN UP
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp