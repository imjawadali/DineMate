import React from 'react'
import './profile.css'
import profilePicture from './../../assets/logo2.png'
import badge from './../../assets/badge.png'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { customisedAction } from '../../redux/actions'
import { GET_RPOFILE, UPDATE_RPOFILE } from '../../constants'
import { useEffect } from 'react'
import { getItem } from '../../helpers'

function Profile() {
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState('sdaddsd')
    const [address, setAddress] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [imgUrl, setImgUrl] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const profile = useSelector(({ profileReducer }) => profileReducer.profile)
    const dispatch = useDispatch()

    useEffect(() => {
        if(getItem('customer')){
            dispatch(customisedAction(GET_RPOFILE))
        }
    }, [])

    useEffect(() => {
        if (profile) {
            setEmail(profile.email)
            setPhoneNumber(profile.phoneNumber)
            setAddress(profile.address)
            setFirstName(profile.firstName)
            setLastName(profile.lastName)
            setImgUrl(profile.imageUrl)
        }
    }, [profile])

    async function fileSelected(img) {
        const file = img;
        setImgUrl(await toBase64(file));
        setSelectedImage(img)

        const params = {
            fileName: img.name,
            fileType: img.type
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const edit = () => {
        let obj = {
            "updatedData": {
                "address": address,
                "email": email,
                "firstName": "test",
                "imageUrl": null,
                "lastName": "test",
                "phoneNumber": phoneNumber
            }
        }
        dispatch(customisedAction(UPDATE_RPOFILE, obj))
    }

    return (
        <div className="profile">
            <h1>Profile Details</h1>
            <div className="profileImageDiv">
                <h2>Profile Picture</h2>
                <div className="profileImage centerAb">
                    <img src={imgUrl ? imgUrl : profilePicture} />
                    <label className="editImage">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                        <input className="fileUploadInput" type="file" onChange={(ev) => fileSelected(ev.target.files[0])} />
                    </label>
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
