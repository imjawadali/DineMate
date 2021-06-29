import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

import SearchBar from '../../../components/SeachBar'
import MenuListingContainer from './MenuListingContainer'

import { customisedAction } from '../../../redux/actions';
import { GET_MENU, GET_RESTAURANT_DETAILS, INITIALIZE_ORDER } from '../../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './styles.css'

const Menu = props => {

    const [cart, setCart] = useState([])

    const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
    // const [menu, setMenu] = useState([])
    const menu = useSelector(({ menuReducer }) => menuReducer.menu)
    const [selectedCategory, setSelectedCategory] = useState(menu)
    const fetchingRestaurantDetails = useSelector(({ menuReducer }) => menuReducer.fetchingRestaurantDetails)
    const restaurant = useSelector(({ menuReducer }) => menuReducer.restaurant)
    const dispatch = useDispatch()
    const [openCall, setOpenCall] = useState(false);
    const [selectedServices, setSelectedServices] = useState(['WATER']);
    const [categorie, setCategorie] = useState('All')

    let { restaurantId } = useParams();

    useEffect(() => {
        dispatch(customisedAction(GET_RESTAURANT_DETAILS, { restaurantId }))
        dispatch(customisedAction(GET_MENU, { restaurantId }))
    }, [])

    useEffect(() => {
        if (categorie === 'All') {
            setSelectedCategory(menu)
        } else if (categorie != 'All') {
            setSelectedCategory(menu.filter((a, i) => a.categoryName === categorie))
        }
    }, [categorie,menu])


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
                                <span className="divider">
                                    <h3>$$$:
                                        {restaurant.categories.map((category, index) =>
                                            ` ${category.name}${index !== restaurant.categories.length - 1 ? ' • ' : ''}`
                                        )}
                                    </h3>

                                    <div className="my-dinemate-div" onClick={() => setOpenCall(true)}>
                                        <div className="my-dinemate">
                                            My DineMate
                                        </div>

                                        <div className="dinemate-logo">
                                            <img src={require("../../../assets/cart.png").default} className="searchbar-image-cart" />
                                        </div>
                                    </div>
                                </span>
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
                            <div onClick={() => setCategorie('All')} className={categorie === "All" ? "menuListingFeaturedContainerItem selectedItem" :"menuListingFeaturedContainerItem"}>
                                <h3>
                                    All
                                </h3>
                            </div>
                            {restaurant.categories.map(category =>
                                <div onClick={() => setCategorie(category.name)} className={categorie === category.name ? "menuListingFeaturedContainerItem selectedItem" :"menuListingFeaturedContainerItem"}>
                                    <h3>
                                        {category.name}
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                    : null}




                {selectedCategory && selectedCategory.length ?
                    <div className="menulistingcontainer">
                        <MenuListingContainer heading="Picked for you" data={selectedCategory} onClick={(id) => addToCart(id)} cart={cart} />
                    </div>
                    : null}

                {
                    openCall ?
                        <div className="call-service-div">
                            <div className="call-service-dialog">
                                <div className="close-dialog-div">
                                    <div className="icon-title-div">
                                        <span className="dialog-icon">
                                            <img src={require("../../../assets/Group 6409.png").default} className="searchbar-image-cart" />
                                        </span>

                                        <span className="call-for-service">Call For Services</span>
                                    </div>

                                    <div>
                                        <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={() => setOpenCall(false)} />
                                    </div>
                                </div>

                                <div className="services-div">
                                    <div
                                        className={selectedServices.includes("WATER") ? "service" : "service warn-service"}
                                        onClick={() => {
                                            selectedServices.includes("WATER") ?
                                                setSelectedServices(selectedServices.filter(service => service !== 'WATER')) :
                                                setSelectedServices([...selectedServices, "WATER"])
                                        }}
                                    >
                                        <div>
                                            <img src={require("../../../assets/Group 6410.png").default} className="service-icon" />
                                        </div>
                                        Water
                                    </div>

                                    <div
                                        className={selectedServices.includes("HELP") ? "service" : "service warn-service"}
                                        onClick={() => {
                                            selectedServices.includes("HELP") ?
                                                setSelectedServices(selectedServices.filter(service => service !== 'HELP')) :
                                                setSelectedServices([...selectedServices, "HELP"])
                                        }}
                                        style={{ position: 'relative' }}
                                    >
                                        <div>
                                            <img src={require("../../../assets/Path 7705.png").default} className="service-icon" />
                                        </div>
                                        <div style={{ position: 'absolute', bottom: 8 }}>Help</div>
                                    </div>

                                    <div
                                        className={selectedServices.includes("DISTURB") ? "service" : "service warn-service"}
                                        onClick={() => {
                                            selectedServices.includes("DISTURB") ?
                                                setSelectedServices(selectedServices.filter(service => service !== 'DISTURB')) :
                                                setSelectedServices([...selectedServices, "DISTURB"])
                                        }}
                                    >
                                        <div>
                                            <img src={require("../../../assets/Group 4691.png").default} className="service-icon" />
                                        </div>
                                        Do not Disturb
                                    </div>

                                    <div
                                        className={selectedServices.includes("BILL") ? "service" : "service warn-service"}
                                        onClick={() => {
                                            selectedServices.includes("BILL") ?
                                                setSelectedServices(selectedServices.filter(service => service !== 'BILL')) :
                                                setSelectedServices([...selectedServices, "BILL"])
                                        }}
                                    >
                                        <div>
                                            <img src={require("../../../assets/Group 6412.png").default} className="service-icon" />
                                        </div>
                                        Bill
                                    </div>
                                </div>

                                <div className="description-div">
                                    <textarea type="text" placeholder="Description" className="text-area" />
                                </div>

                                <div className="send-button-div">
                                    <div className={selectedServices.length > 0 ? "send-button" : "send-button disabled-send-button"}>
                                        <div>Send Message</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }

            </div>
        </>
    )
}
export default Menu