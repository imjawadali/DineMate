import React from 'react'
import './profile.css'
import profilePicture from './../../assets/logo2.png'
import badge from './../../assets/badge.png'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { customisedAction } from '../../redux/actions'
import { GET_RPOFILE } from '../../constants'
import { useEffect } from 'react'

function Profile() {
    const [email, setEmail] = useState("rayan@email.com")
    const [phoneNumber, setPhoneNumber] = useState("+1 343 2541 254")
    const [password, setPassword] = useState('sdaddsd')
    const [address, setAddress] = useState("xyz street area abc")
    const profile = useSelector(({ profileReducer }) => profileReducer.profile)
    console.log(profile)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(customisedAction(GET_RPOFILE))
    }, [])
    return (
        <div className="profile">
            <h1>Profile Details</h1>
            <div className="profileImageDiv">
                <h2>Profile Picture</h2>
                <div className="profileImage centerAb">
                    <img src={profile && profile.imageUrl ? profile.imageUrl : profilePicture} />
                </div>
            </div>

            <div className="profileImageDiv">
                <h2>Name</h2>
                <div className="profileName centerAb">
                    <h1>{profile && profile.firstName} {profile && profile.lastName}</h1>
                    <p><span className="pointBadge"><img src={badge} /></span> Reward Point: <span className="point">297</span></p>
                </div>
            </div>

            <div className="profileImageDiv profileInputDIv">
                <h2>Password</h2>
                <div className=" inputDiv centerAb">
                    <input value={password} type='password' />
                </div>
            </div>


            <div className="profileImageDiv profileInputDIv">
                <h2>Email Address</h2>
                <div className=" inputDiv centerAb">
                    <input value={profile && profile.email} />
                </div>
            </div>

            <div className="profileImageDiv profileInputDIv">
                <h2>Phone Number</h2>
                <div className=" inputDiv centerAb">
                    <input value={profile && profile.phoneNumber ? profile.phoneNumber : ''} />
                </div>
            </div>

            <div className="profileImageDiv profileInputDIv">
                <h2>Address</h2>
                <div className="inputDiv centerAb">
                    <input value={profile && profile.address ? profile.address : ''} />
                </div>
            </div>

            <div className="profileImageDiv profileSaveBtn ">
                <div className="saveBtn centerAb">
                    <button>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
