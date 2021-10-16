import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { Modal } from '../../../components';

import { customisedAction } from '../../../redux/actions';
import { HIDE_REWARD_DIALOG, APPLY_REWARD_POINTS } from '../../../constants'

import badge from '../../../assets/badge.png';

function RewardPoints() {
    const [pointsToRedeem, setpointsToRedeem] = useState(10);

    const showRewardDialog = useSelector(({ ratingAndRewardReducer }) => ratingAndRewardReducer.showRewardDialog)
    const reward = useSelector(({ ratingAndRewardReducer }) => ratingAndRewardReducer.reward)
    const profile = useSelector(({ profileReducer }) => profileReducer.profile)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => dispatch(customisedAction(HIDE_REWARD_DIALOG))
    }, [])

    const applyRewardPoints = () => {
        const { restaurantId, orderNumber, billAmount } = reward
        dispatch(customisedAction(APPLY_REWARD_POINTS, { restaurantId, orderNumber, pointsToRedeem, billAmount }))
    }

    return (
        <Modal width={window.innerWidth < 480 ? '80%' : '40%'} display={showRewardDialog}>
            <div style={{ padding: '20px' }}>
                <div style={{ width: '100%', textAlign: 'end' }}>
                    <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        icon={faTimes}
                        size={"2x"}
                        className="icon-star"
                        onClick={() => dispatch(customisedAction(HIDE_REWARD_DIALOG))}
                    />
                </div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
                    <h1 style={{ margin: '10px 0px' }}><img style={{ width: 23, marginRight: 8 }} src={badge} />You have <span style={{ margin: '0 10px', color: 'red' }}>{`${profile ? profile.rewardPoints : 0}`}</span>Reward Points!</h1>
                    <h3 style={{ margin: '10px 0px' }}>Set points to Redeem</h3>
                    <div style={{ width: '100%', margin: '10px 0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <h3 style={{ marginRight: '10px' }}>0</h3>
                        <Slider
                            style={{ width: '90%' }}
                            value={pointsToRedeem}
                            max={profile ? profile.rewardPoints : 0}
                            step={10}
                            dots={true}
                            dotStyle={{ background: '#2ec3b3', border: 'none' }}
                            handleStyle={{ borderWidth: 5, borderColor: 'red', padding: '5px', marginTop: '-7px' }}
                            trackStyle={{ background: '#2ec3b3' }}
                            onChange={value => setpointsToRedeem(value)}
                        />
                        <h3 style={{ marginLeft: '10px' }}>{profile ? profile.rewardPoints : 0}</h3>
                    </div>
                    <h3 style={{ margin: '10px 0px', color: 'red' }}>{pointsToRedeem} Points = ${((pointsToRedeem * 2) / 100).toFixed(2)}</h3>
                    <button className="payBtn" onClick={applyRewardPoints}>Submit</button>
                </div>
            </div>
        </Modal>
    )
}

export default RewardPoints