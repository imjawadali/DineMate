import React, { useEffect, useState } from 'react';
import './styles.css';
import signup_icon from '../../../assets/signup_icon.png';
import { useDispatch } from 'react-redux';
import { customisedAction } from '../../../redux/actions';
import { FORGOT_PASSWORD, SET_NEW_PASSWORD } from '../../../constants';
import { withRouter } from 'react-router-dom';

function SetPassword(props) {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [hashString, setHashString] = useState('');
    let dispatch = useDispatch()

    useEffect(() => {
        let params = props.match.params
        if (params) {
            setEmail(params.email)
            setHashString(params.hashString)
        }
    }, [props])

    const setNewPassword = () => {
        let obj = {
            "email": email,
            "password": password,
            "hashString": hashString
        }

        dispatch(customisedAction(SET_NEW_PASSWORD, obj))
    }

    return (
        <div className="sign-up">
            <div className="content-div">
                <div>
                    <img src={signup_icon} className="enter-logo" />
                </div>

                <div className="welcome-title">Reset Your Password</div>

                <div className="sub-title"></div>

                <div>
                    <input type="password" className="form-field" placeholder="password" onChange={e => setPassword(e.target.value)} />
                </div>

                <div className={password ? "signup-div" : "signup-div signup-div-disabled"} onClick={setNewPassword}>
                    <div className="signup-text">
                        CONTINUE
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(SetPassword)