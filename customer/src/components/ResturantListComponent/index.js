import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import './styles.css'

const ResturantListComponent = props => {
    const { title, price, cuisines, stars, image, favourite, onClick } = props
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
                    <h4>{price} {cuisines}</h4>
                </div>
                <div className="resturantListComponent-info-right">
                    <div className="resturantListComponent-info-right-star">
                        <h3>
                            {stars }
                        </h3>
                        <FontAwesomeIcon icon={faStar} className="icon-star"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResturantListComponent