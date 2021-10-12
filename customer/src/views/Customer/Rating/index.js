import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarRatings from 'react-rating-stars-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import { Modal } from '../../../components';

import { customisedAction } from '../../../redux/actions';
import { HIDE_RATING_DIALOG, SUBMIT_RATING } from '../../../constants'

function Rating() {
    const [rating, setrating] = useState(5);

    const showRating = useSelector(({ ratingReducer }) => ratingReducer.showRating)
    const orderDetails = useSelector(({ getOrderDetail }) => getOrderDetail.orderDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        return dispatch(customisedAction(HIDE_RATING_DIALOG))
    }, [])

    const submitRating = () => {
        const { restaurantId, orderNumber } = orderDetails
        dispatch(customisedAction(SUBMIT_RATING, { restaurantId, orderNumber, rating }))
    }

    const cancelModal = () => {
        dispatch(customisedAction(HIDE_RATING_DIALOG))
    }

    return (
        <Modal width={window.innerWidth < 480 ? '80%' : '40%'} display={showRating}>
            <div style={{ padding: '20px' }}>
                <div style={{ width: '100%', textAlign: 'end' }}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        size={"2x"}
                        className="icon-star"
                        onClick={cancelModal}
                    />
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ margin: '10px 0px'}}>Rate Us Please</h1>
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