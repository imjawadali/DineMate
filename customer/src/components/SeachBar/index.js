import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './styles.css'

const SearchBar = props => {
    const { iconName, iconSize, text, cart, quantity, fontSizeText, fontSizeQuantity } = props
    return (
        <div className="SearchBar" >
            {cart && <FontAwesomeIcon icon={faShoppingCart} size={iconSize || "2x"} />}
            {iconName && <FontAwesomeIcon icon={iconName} size={iconSize || "2x"} />}
            {text && <h3> {text}</h3>}
            { iconName && <h3>NOW</h3>}
            { quantity && <h3>{quantity}</h3>}

        </div >
    )
}

export default SearchBar