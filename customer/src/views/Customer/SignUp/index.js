import React, { useState } from 'react';
import './styles.css';
import signup_icon from '../../../assets/signup_icon.png';
import { useDispatch } from 'react-redux';
import { customisedAction } from '../../../redux/actions';
import { SIGN_IN, SIGN_UP } from '../../../constants';

function SignUp() {
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [phoneNumber, setPhoneNumber] = useState("")
    let dispatch = useDispatch()

    function singUp() {
        let obj = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
        }

        dispatch(customisedAction(SIGN_UP, obj))
    }
    return (
        <div className="sign-up">
            <div className="content-div">
                <div>
                    <img src={signup_icon} className="enter-logo" />
                </div>

                <div className="welcome-title">Lets get started!</div>


                <div>
                    <input onChange={(ev) => setFirstName(ev.target.value)} type="text" className="form-field" placeholder="First Name" />
                </div>

                <div>
                    <input onChange={(ev) => setLastName(ev.target.value)} type="text" className="form-field" placeholder="Last Name" />
                </div>

                <div>
                    <input onChange={(ev) => setEmail(ev.target.value)} type="text" className="form-field" placeholder="Email Address" />
                </div>
                <div>
                    <input onChange={(ev) => setPassword(ev.target.value)} type="password" className="form-field" placeholder="Password" />
                </div>

                <div>
                    <input onChange={(ev) => setPhoneNumber(ev.target.value)} type="text" className="form-field" placeholder="Phone Number" />
                </div>

                <div className="signup-div" onClick={singUp}>
                    <div className="signup-text">
                        SIGN UP
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp