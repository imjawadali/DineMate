import React from 'react'
import './styles.css'

const ResturantListComponent = props => {
    const { title, price, cuisines, stars, image } = props
    return (
        <div>
            <div className="resturantListComponent-image">
                <img src={image} style={{ width: '100%', height: '100%' }} />
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
                            {stars}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResturantListComponent