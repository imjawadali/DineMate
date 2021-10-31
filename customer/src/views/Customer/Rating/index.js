import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarRatings from 'react-rating-stars-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { Modal } from '../../../components';

import { customisedAction } from '../../../redux/actions';
import { HIDE_RATING_DIALOG, SUBMIT_RATING } from '../../../constants'

import badge from '../../../assets/badge.png';

function Rating() {
    const [rating, setrating] = useState(5);

    const latitude = useSelector(({ restaurantsReducer }) => restaurantsReducer.latitude)
    const longitude = useSelector(({ restaurantsReducer }) => restaurantsReducer.longitude)
    const city = useSelector(({ restaurantsReducer }) => restaurantsReducer.city)
    const showRatingDialog = useSelector(({ ratingAndRewardReducer }) => ratingAndRewardReducer.showRatingDialog)
    const reward = useSelector(({ ratingAndRewardReducer }) => ratingAndRewardReducer.reward)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(customisedAction(HIDE_RATING_DIALOG))
    }, [])

    const submitRating = () => {
        const { restaurantId, orderNumber } = reward
        dispatch(customisedAction(SUBMIT_RATING, { restaurantId, orderNumber, rating }, { latitude, longitude, city }))
    }

    return (
        <Modal width={window.innerWidth < 480 ? '80%' : '40%'} display={showRatingDialog}>
            <div style={{ padding: '20px' }}>
                <div style={{ width: '100%', textAlign: 'end' }}>
                    <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        icon={faTimes}
                        size={"2x"}
                        className="icon-star"
                        onClick={() => dispatch(customisedAction(HIDE_RATING_DIALOG))}
                    />
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    {reward && reward.pointsEarned ?
                        <>
                            <h1 style={{ margin: '10px 0px' }}><img style={{ width: 23, marginRight: 8 }} src={badge} />Congragulations!</h1>
                            <h2 style={{ marginBottom: '20px' }}>
                                You have earned
                                <span style={{ margin: '0 10px', color: 'red' }}>{reward.pointsEarned}</span>
                                Reward Points
                            </h2>
                        </>
                        : null}
                    <h1 style={{ margin: '10px 0px' }}>Rate Us Please</h1>
                    <StarRatings
                        value={rating}
                        isHalf={true}
                        count={5}
                        size={24}
                        starRatedColor='orange'
                        onChange={rating => setrating(rating)}
                    />
                    <button className="payBtn" onClick={submitRating}>Submit</button>
                </div>
            </div>
        </Modal>
    )
}

export default Rating