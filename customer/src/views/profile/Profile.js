import React from 'react'
import './profile.css'
import profilePicture from './../../assets/logo2.png'
import badge from './../../assets/badge.png'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { customisedAction } from '../../redux/actions'
import { GET_RPOFILE, UPDATE_RPOFILE } from '../../constants'
import { useEffect } from 'react'

function Profile() {
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState('sdaddsd')
    const [address, setAddress] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const profile = useSelector(({ profileReducer }) => profileReducer.profile)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(customisedAction(GET_RPOFILE))
    }, [])
    // useEffect(()=>{
    // },[profile])

    console.log(profile)

    useEffect(() => {
        if (profile) {
            setEmail(profile.email)
            setPhoneNumber(profile.phoneNumber)
            // setPassword(profile.password)
            setAddress(profile.address)
            setFirstName(profile.firstName)
            setLastName(profile.lastName)
        }
    }, [profile])


    const edit = () => {
        let obj = {
            "updatedData": {
                "address": address,
                "email": email,
                "firstName": "test",
                "imageUrl": null,
                "lastName": "test",
                "phoneNumber": null
            }
        }
        dispatch(customisedAction(UPDATE_RPOFILE,obj))
    }

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
                    <h1>{firstName} {lastName}</h1>
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
                    <input value={email} onChange={(ev) => setEmail(ev.target.value)} />
                </div>
            </div>

            <div className="profileImageDiv profileInputDIv">
                <h2>Phone Number</h2>
                <div className=" inputDiv centerAb">
                    <input value={phoneNumber} onChange={(ev) => setPhoneNumber(ev.target.value)} />
                </div>
            </div>

            <div className="profileImageDiv profileInputDIv">
                <h2>Address</h2>
                <div className="inputDiv centerAb">
                    <input value={address} onChange={(ev) => setAddress(ev.target.value)} />
                </div>
            </div>

            <div className="profileImageDiv profileSaveBtn ">
                <div className="saveBtn centerAb">
                    <button onClick={edit}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
