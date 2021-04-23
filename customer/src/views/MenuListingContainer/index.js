import React from 'react'
import MenuListItemComponent from '../../components/MenuListItemComponent'

const MenuListingContainer = props => {
    const { heading } = props
    return (
        <div className="MenuListingContainer">
            <h1>
                {heading}
            </h1>
            <div className="MenuListingContainerItemContainer">
                <div className="MenuListingContainerItem ">
                    <MenuListItemComponent  heading="First Item" subHeading="Some indegriednt written here" cartValue="0" price="2.99" addToCart={false} image={require("../../assets/bgimage.png").default}/>
                </div>
                <div className="MenuListingContainerItem selectedItemContainer">
                <MenuListItemComponent  heading="Selected Item" subHeading="Some indegriednt written here"  cartValue="1"price="12.99" addToCart={true} image={require("../../assets/bgimage.png").default}/>

                </div>
                <div className="MenuListingContainerItem">
                <MenuListItemComponent   heading="Third Item" subHeading="Some indegriednt written here" cartValue="0" price="0.99" addToCart={false} image={require("../../assets/bgimage.png").default}/>

                </div>
               
            </div>
        </div>
    )
}
export default MenuListingContainer