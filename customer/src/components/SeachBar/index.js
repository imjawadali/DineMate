import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './styles.css'

const SearchBar = props => {
    const { iconName, iconSize,white, text, NOW, cart, quantity, fontSizeText, fontSizeQuantity, style } = props
    return (
        <div className="SearchBar" style={style} >
            <div  className="SearchBarLeft">
            {cart && <FontAwesomeIcon icon={faShoppingCart} className="header-icon-style" />}
            {iconName && <FontAwesomeIcon icon={iconName} className="header-icon-style" />}
            {text && <h3 style={white&&{color:"white"}}> {text}</h3>}
            </div>
            <div  className="SearchBarRight">
            { NOW && <h3 style={white&&{color:"white",margin:0}}>NOW</h3>}
            { quantity && <h3 style={white&&{color:"white"}}>{quantity}</h3>}
            </div>
         
        </div >
    )
}

export default SearchBar