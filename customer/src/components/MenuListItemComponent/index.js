import React from 'react'
import "./styles.css"


const MenuListItemComponent = props => {
    const { heading, subHeading,onClick, image, price, addToCart, cartValue } = props;
    return (
        <a className="MLIComponent" onClick={onClick}>
            <div className="MLIComponent-Left">
                <div className="MLIComponent-Left-top">
                    <h2>{heading}</h2>
                    <h3>{subHeading}</h3>
                </div>
                <div className="MLIComponent-Left-bottom">
                    <h2>${price}</h2>

                </div>
            </div>
            <div className="MLIComponent-Right">
                <div className="MLIComponent-Right-img">
                    <img src={require("../../assets/bgimage.png").default} />
                </div>
                <div className="MLIComponent-Right-cart">
                    {addToCart && <div className="MLIComponent-Right-cart-added">
                        <p>{cartValue}</p>
                    </div>
                    }

                </div>

            </div>
        </a>
    )
}


export default MenuListItemComponent