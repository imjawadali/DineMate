import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './styles.css'

const SearchBar = props => {
    const { iconName, iconSize, text, NOW, cart, quantity, fontSizeText, fontSizeQuantity } = props
    return (
        <div className="SearchBar" >
            {cart && <FontAwesomeIcon icon={faShoppingCart} className="header-icon-style" />}
            {iconName && <FontAwesomeIcon icon={iconName} className="header-icon-style" />}
            {text && <h3> {text}</h3>}
            { NOW && <h3>NOW</h3>}
            { quantity && <h3>{quantity}</h3>}

        </div >
    )
}

export default SearchBar