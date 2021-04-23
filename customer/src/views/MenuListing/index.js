import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import SearchBar from '../../components/SeachBar'
import MenuListingContainer from '../MenuListingContainer'
import Footer from '../Footer'
import Header from '../Header'











const MenuListing = props => {
    return (
        <>
            <Header />

            <div className="menuListing">
                {/* searchbar */}
                <div className="resturant-searchbar menuListingSearch">
                    <div className="resturant-searchbar-container">
                        <SearchBar iconName={faSearch} text="Missigua, Ontario" />
                    </div>
                </div>


                {/* image background with text */}
                <div className="menuListingImagewithText">
                    <div className="menuListingImagewithTextContainer">
                        <h2>Tim Hortons</h2>
                        <h3>$$$ • Bakery • Cafe • Donuts • 3.9 (106)</h3>
                    </div>
                </div>


                <div className="menuListingLocation">
                    <div className="menuListingLocationConatiner">
                        <SearchBar iconName={faMapMarkerAlt} text="Missigua, Ontario" />
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
                <div className="menulistingcontainer">
                    <MenuListingContainer heading="Picked for you" />
                </div>




            </div>

            <Footer />
        </>
    )
}
export default MenuListing