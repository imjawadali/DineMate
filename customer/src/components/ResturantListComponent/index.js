import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import './styles.css'

const ResturantListComponent = props => {
    const { title, cuisines, stars, ratingCounts, image, favourite, onClick } = props
    return (
        <div onClick={onClick}>
            <div className="resturantListComponent-image">
                <img src={image} style={{ height: '100%' }} />
            </div>
            <div className="resturantListComponent-info">
                <div className="resturantListComponent-info-left">
                    <h3>
                        {title}
                    </h3>
                    <h4>$$ {cuisines}</h4>
                </div>
                <div className="resturantListComponent-info-right">
                    <div className="resturantListComponent-info-right-star">
                        {ratingCounts ?
                            <>
                                <FontAwesomeIcon icon={faStar} className="icon-star" />
                                <h3 style={{ marginLeft: '2px' }}>{stars}/5</h3>
                                <h3 style={{ marginLeft: '5px' }}>({ratingCounts})    </h3>
                            </>
                            : <h3 style={{ whiteSpace: 'nowrap' }}>No Rating</h3>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResturantListComponent