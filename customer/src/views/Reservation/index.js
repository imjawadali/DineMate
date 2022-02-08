import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { DropDown, Input, Modal, Title } from '../../components';

import { customisedAction } from '../../redux/actions';
import { GET_ALL_RESTAURANTS, RESERVATION } from '../../constants'

function Reservation({ isReservationModalVisible, closeReservationModal }) {

    const [restaurantId, setrestaurantId] = useState(null)
    const [name, setname] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [email, setemail] = useState("")
    const [seats, setseats] = useState("")
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const [comments, setcomments] = useState("")

    const latitude = useSelector(({ restaurantsReducer }) => restaurantsReducer.latitude)
    const longitude = useSelector(({ restaurantsReducer }) => restaurantsReducer.longitude)
    const city = useSelector(({ restaurantsReducer }) => restaurantsReducer.city)
    const fetchingRestaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.fetchingRestaurants)
    const restaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.restaurants)
    const dispatch = useDispatch()

    useEffect(() => {
        if (city)
            dispatch(customisedAction(GET_ALL_RESTAURANTS, { limit: 100, noToast: true }, { latitude, longitude, city }))
    }, [city])

    const submit = () => {
        console.log(RESERVATION)
        dispatch(customisedAction(RESERVATION, {
            restaurantId,
            name,
            phoneNumber,
            email,
            seats,
            date,
            time,
            comments
        }))
    }

    return (
        <Modal width={window.innerWidth < 480 ? '80%' : '40%'} display={isReservationModalVisible}>
            <div style={{ padding: '20px' }}>
                <div style={{ width: '100%', textAlign: 'end' }}>
                    <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        icon={faTimes}
                        size={"2x"}
                        className="icon-star"
                        onClick={() => closeReservationModal()}
                    />
                </div>
                {restaurants && restaurants.length
                    ? <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                        <Title text="Reservation Details" />
                        <DropDown
                            style={{ width: '70%', marginTop: '20px' }}
                            placeholder="Select Restaurant"
                            options={restaurants.map(restaurant => {
                                return {
                                    label: restaurant.restaurantName,
                                    value: restaurant.restaurantId
                                }
                            })}
                            value={restaurantId}
                            onChange={({ target: { value } }) => setrestaurantId(value)}
                        />
                        <Input
                            style={{ width: '70%' }}
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={({ target: { value } }) => setname(value)}
                        />
                        <Input
                            style={{ width: '70%' }}
                            placeholder="Enter Your Number"
                            value={phoneNumber}
                            onChange={({ target: { value } }) => setphoneNumber(value)}
                        />
                        <Input
                            style={{ width: '70%' }}
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={({ target: { value } }) => setemail(value)}
                        />
                        <Input
                            style={{ width: '70%' }}
                            placeholder="Enter No. Of Seats (4)"
                            type="number"
                            value={seats}
                            onChange={({ target: { value } }) => setseats(value)}
                        />
                        <Input
                            style={{ width: '70%' }}
                            placeholder="Enter Arriving Date (12-12-2021)"
                            value={date}
                            onChange={({ target: { value } }) => setdate(value)}
                        />
                        <Input
                            style={{ width: '70%' }}
                            placeholder="Enter Arriving Time (07:30 PM)"
                            value={time}
                            onChange={({ target: { value } }) => settime(value)}
                        />
                        <Input
                            style={{ width: '70%' }}
                            placeholder="Enter Your Comments (Optional)"
                            value={comments}
                            onChange={({ target: { value } }) => setcomments(value)}
                        />
                        <button className="payBtn" onClick={submit}>Submit</button>
                    </div>
                    : <div className="notFound">
                        <p>
                            {fetchingRestaurants ? 'Fetching Restaurants . . .' : !city ? 'Trying to get location to fetch restaurants' : 'No result found'}
                        </p>
                    </div>
                }
            </div>
        </Modal>
    )
}

export default Reservation