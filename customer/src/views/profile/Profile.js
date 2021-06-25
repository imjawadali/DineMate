import React from 'react'
import './profile.css'
import profilePicture from './../../assets/logo2.png'
import badge from './../../assets/badge.png'
import { useState } from 'react'

function Profile() {
    const [email, setEmail] = useState("rayan@email.com")
    const [phoneNumber, setPhoneNumber] = useState("+1 343 2541 254")
    const [address, setAddress] = useState("xyz street area abc")
    return (
        <div className="profile">
            <h1>Profile Details</h1>
            <div className="profileImageDiv">
                <h2>Profile Picture</h2>
                <div className="profileImage centerAb">
                    <img src={profilePicture} />
                </div>
            </div>

            <div className="profileImageDiv">
                <h2>Name</h2>
                <div className="profileName centerAb">
                    <h1>Rayan Levin</h1>
                    <p><span className="pointBadge"><img src={badge} /></span> Reward Point: <span className="point">297</span></p>
                </div>
            </div>

            <div className="profileImageDiv profileInputDIv">
                <h2>Email Address</h2>
                <div className=" inputDiv centerAb">
                    <input value={email} />
                </div>
            </div>

            <div className="profileImageDiv profileInputDIv">
                <h2>Phone Number</h2>
                <div className=" inputDiv centerAb">
                    <input value={phoneNumber} />
                </div>
            </div>

            <div className="profileImageDiv profileInputDIv">
                <h2>Address</h2>
                <div className="inputDiv centerAb">
                    <input value={address} />
                </div>
            </div>
            
            <div className="profileImageDiv profileSaveBtn ">
                <div className="saveBtn centerAb">
                   <button>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
