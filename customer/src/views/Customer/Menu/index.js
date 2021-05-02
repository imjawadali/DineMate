import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

import SearchBar from '../../../components/SeachBar'
import MenuListingContainer from './MenuListingContainer'

import { customisedAction } from '../../../redux/actions';
import { GET_MENU, GET_RESTAURANT_DETAILS } from '../../../constants';

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

    const addToCart = id =>{
        if (cart.find((item)=>item.id===id))
            return  setCart(cart.filter((item)=>item.id!==id))
        setCart([...cart,{id:id}])
    }

    const imagesArray = [require("../../../assets/listingbg.png")]
    return (
        <>
            <div className="menuListing">
                {/* searchbar */}
                <div className="resturant-searchbar menuListingSearch" style={{ zIndex: 999 }}>
                    <div className="resturant-searchbar-container">
                        <SearchBar iconName={faSearch} text="Missigua, Ontario" />
                    </div>
                </div>


                {/* image background with text */}
                <div className="menuListingImagewithText"  >

                    <div style={{width:'100%'}}>
                        {restaurant ?
                            <img src={restaurant.imageUrl || imagesArray[0].default} style={{ width: '100%', height: '100%' }} />
                        : null}
                    </div>
                    <div className="menuListingImagewithTextContainer" style={{ zIndex: 999,position:'absolute',width:'90%',left:'5%',right:'5%',height:'20vh'}}>
                        <h2>{restaurant && restaurant.restaurantName}</h2>
                        <h3>$$$ {restaurant ? restaurant.categories ? restaurant.categories.replaceAll(',', ' • ') : 'Bakery • Cafe • Donuts' : null}</h3>
                    </div>
                </div>

                {restaurant ?
                    <div className="menuListingLocation">
                        <div className="menuListingLocationConatiner">
                            <SearchBar iconName={faMapMarkerAlt} text={restaurant ? `${restaurant.address}, ${restaurant.city}` : ''} color="rgb(103, 103, 103)"/>
                        </div>
                    </div>
                : null }


                {restaurant && restaurant.categories && restaurant.categories.split(',').length ? 
                    <div className="menuListingFeatured">
                        <div className="menuListingFeaturedContainer">
                            <div className="menuListingFeaturedContainerItem selectedItem">
                                <h3>
                                    Picked for you
                                </h3>
                            </div>
                            {restaurant.categories.split(',').map(category => 
                                <div className="menuListingFeaturedContainerItem">
                                    <h3>
                                        {category}
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                : null }

              
              
              
            {menu && menu.length ?
                <div className="menulistingcontainer">
                    <MenuListingContainer heading="Picked for you" data={menu} onClick={(id)=>addToCart(id)} cart={cart}/>
                </div>
            : null}

            </div>
        </>
    )
}
export default Menu