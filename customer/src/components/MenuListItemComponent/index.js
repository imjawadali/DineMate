import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_ORDER_ITEMS } from '../../constants';
import { getItem } from '../../helpers';
import { customisedAction } from '../../redux/actions';
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
        </>
    )
}


export default MenuListItemComponent