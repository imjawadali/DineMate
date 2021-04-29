import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";

import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

import SearchBar from '../../components/SeachBar'
import MenuListingContainer from '../MenuListingContainer'

import { customisedAction } from '../../redux/actions';
import { GET_MENU } from '../../constants';
import Footer from '../Footer'
import Header from '../Header'

const DATA = [{
    id:1,
    title:"Labs Secret",
    subTitle:"Loaded with Cheese, with mayo",
    price:"223"

},{
    id:2,
    title:"Labs Secret",
    subTitle:"Loaded with Cheese, with mayo",
    price:"223"

},{
    id:3,
    title:"Labs Secret",
    subTitle:"Loaded with Cheese, with mayo",
    price:"223"

}]

const MenuListing = props => {

    const [cart, setCart] = useState([])

    const fetchingMenu = useSelector(({ menuReducer }) => menuReducer.fetchingMenu)
    const menu = useSelector(({ menuReducer }) => menuReducer.menu)
    const dispatch = useDispatch()

    let { restaurantId, tableId } = useParams();
  
    useEffect(() => {
      dispatch(customisedAction(GET_MENU, { restaurantId }))
    }, [])

    const addToCart = id =>{
        if (cart.find((item)=>item.id===id))
            return  setCart(cart.filter((item)=>item.id!==id))
        setCart([...cart,{id:id}])
    }

    return (
        <>
            <Header />
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
                        <img src={require("../../assets/listingbg.png").default} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="menuListingImagewithTextContainer" style={{ zIndex: 999,position:'absolute',width:'90%',left:'5%',right:'5%',height:'20vh'}}>
                        <h2>Tim Hortons</h2>
                        <h3>$$$ • Bakery • Cafe • Donuts • 3.9 (106)</h3>
                    </div>
                </div>


                <div className="menuListingLocation">
                    <div className="menuListingLocationConatiner">
                        <SearchBar iconName={faMapMarkerAlt} text="Missigua, Ontario" color="rgb(103, 103, 103)"/>
                    </div>
                </div>



                <div className="menuListingFeatured">
                    <div className="menuListingFeaturedContainer">
                        <div className="menuListingFeaturedContainerItem selectedItem">
                            <h3>
                                Picked for you
                            </h3>
                        </div>
                        <div className="menuListingFeaturedContainerItem">
                            <h3>
                                Picked for you
                            </h3>
                        </div>
                        <div className="menuListingFeaturedContainerItem">
                            <h3>
                                Picked for you
                            </h3>
                        </div>
                        <div className="menuListingFeaturedContainerItem">
                            <h3>
                                Picked for you
                            </h3>
                        </div>
                        <div className="menuListingFeaturedContainerItem">
                            <h3>
                                Picked for you
                            </h3>
                        </div>
                    </div>
                </div>

              
              
              
            {menu && menu.length ?
                <div className="menulistingcontainer">
                    <MenuListingContainer heading="Picked for you" data={menu} onClick={(id)=>addToCart(id)} cart={cart}/>
                </div>
            : null}


                {/* <div className="menulistingcontainer">
                    <MenuListingContainer heading="Picked for you" />
                </div>
                <div className="menulistingcontainer">
                    <MenuListingContainer heading="Picked for you" />
                </div>
                <div className="menulistingcontainer">
                    <MenuListingContainer heading="Picked for you" />
                </div>
                <div className="menulistingcontainer">
                    <MenuListingContainer heading="Picked for you" />
                </div>
                <div className="menulistingcontainer">
                    <MenuListingContainer heading="Picked for you" />
                </div>

 */}


            </div>

            <Footer />
        </>
    )
}
export default MenuListing