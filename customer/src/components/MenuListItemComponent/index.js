import React from 'react'
import { useDispatch } from 'react-redux';
import "./styles.css"


const MenuListItemComponent = props => {
    const { heading, subHeading, onClick, image, menuItem, price, addToCart, cartValue, items } = props;
    let dispatch = useDispatch()

    const quantity = () => {
        let quantity = 0
        items.length && items.map((a, i) => {
            if (a.id === menuItem.id) {
                quantity += a.quantity
            }
        }
        )
        return quantity

    }

    return (
        <>
            {quantity() > 0 ?
                <div className="quantity">{quantity()}</div>
                : null}
            <a className="MLIComponent" onClick={onClick}>
                <div className="MLIComponent-Left">
                    <div className="MLIComponent-Left-top">
                        <h2>{heading}</h2>
                        <h3>{subHeading}</h3>
                    </div>
                    <div className="MLIComponent-Left-bottom">
                        <h2>${(price || 0).toFixed(2)}</h2>

                    </div>
                </div>
                <div className="MLIComponent-Right">
                    <div className="MLIComponent-Right-img">
                        <img src={menuItem.imageUrl} />
                    </div>
                    <div className="MLIComponent-Right-cart">
                        {addToCart && <div className="MLIComponent-Right-cart-added">
                            <p>{cartValue}</p>
                        </div>
                        }

                    </div>

                </div>
            </a>
        </>
    )
}


export default MenuListItemComponent