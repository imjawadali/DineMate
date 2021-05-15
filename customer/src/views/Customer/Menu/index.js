import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

import SearchBar from '../../../components/SeachBar'
import MenuListingContainer from './MenuListingContainer'

import { customisedAction } from '../../../redux/actions';
import { GET_MENU, GET_RESTAURANT_DETAILS } from '../../../constants';
import './styles.css'

const Menu = props => {

    const [cart, setCart] = useState([])

    const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
    const menu = useSelector(({ menuReducer }) => menuReducer.menu)
    const fetchingRestaurantDetails = useSelector(({ menuReducer }) => menuReducer.fetchingRestaurantDetails)
    const restaurant = useSelector(({ menuReducer }) => menuReducer.restaurant)
    const dispatch = useDispatch()

    let { restaurantId, tableId } = useParams();

    useEffect(() => {
        dispatch(customisedAction(GET_RESTAURANT_DETAILS, { restaurantId }))
        dispatch(customisedAction(GET_MENU, { restaurantId }))
    }, [])

    const addToCart = id => {
        if (cart.find((item) => item.id === id))
            return setCart(cart.filter((item) => item.id !== id))
        setCart([...cart, { id: id }])
    }

    const imagesArray = [require("../../../assets/listingbg.png")]
    return (
        <>
            <div className="menuListing">
                {/* searchbar */}
                <div className="menu-searchbar menuListingSearch">
                    <div className="menu-searchbar-container">
                        <SearchBar iconName={faSearch} text="Missigua, Ontario" />
                    </div>
                </div>


                {/* image background with text */}
                <div className="menuListingImagewithText"  >

                    <div style={{ width: '100%' }}>
                        {restaurant ?
                            <img src={restaurant.imageUrl || imagesArray[0].default} style={{ width: '100%', height: '100%' }} />
                            : null}
                    </div>
                    <div className="menuListingImagewithTextContainer" style={{ position: 'absolute', width: '90%', left: '5%', right: '5%', height: '20vh' }}>
                        <h2>{restaurant && restaurant.restaurantName}</h2>
                        {restaurant ?
                            restaurant.categories && restaurant.categories.length ?
                                <h3>$$$: 
                                    {restaurant.categories.map((category, index) => 
                                        ` ${category.name}${index !== restaurant.categories.length - 1 ? ' • ' : ''}`
                                    )}
                                </h3>
                            : <h3>$$$: Bakery • Cafe • Donuts</h3>
                        : <h3>$$$: Loading data . . .</h3>}
                    </div>
                </div>

                {restaurant ?
                    <div className="menuListingLocation">
                        <div className="menuListingLocationConatiner">
                            <SearchBar iconName={faMapMarkerAlt} text={restaurant ? `${restaurant.address}, ${restaurant.city}` : ''} color="rgb(103, 103, 103)" />
                        </div>
                    </div>
                    : null}


                {restaurant && restaurant.categories && restaurant.categories.length ?
                    <div className="menuListingFeatured">
                        <div className="menuListingFeaturedContainer">
                            <div className="menuListingFeaturedContainerItem selectedItem">
                                <h3>
                                    All
                                </h3>
                            </div>
                            {restaurant.categories.map(category =>
                                <div className="menuListingFeaturedContainerItem">
                                    <h3>
                                        {category.name}
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                    : null}




                {menu && menu.length ?
                    <div className="menulistingcontainer">
                        <MenuListingContainer heading="Picked for you" data={menu} onClick={(id) => addToCart(id)} cart={cart} />
                    </div>
                    : null}

            </div>
        </>
    )
}
export default Menu