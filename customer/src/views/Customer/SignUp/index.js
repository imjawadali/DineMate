import React, { useEffect, useState } from 'react';
import './styles.css';
import signup_icon from '../../../assets/signup_icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { customisedAction } from '../../../redux/actions';
import { SIGN_UP } from '../../../constants';

function SignUp(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [redirect, setRedirect] = useState('');
    const dispatch = useDispatch()

    const { history } = props

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setRedirect(urlParams.get("redirect"))
    }, [window.location.search])

    function singUp() {
        dispatch(customisedAction(SIGN_UP, {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            authType: 'email'
        }, { history, redirect }))
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
                    <input onChange={(ev) => setPhoneNumber(ev.target.value)} type="text" className="form-field" placeholder="+1 647 111 1111" />
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