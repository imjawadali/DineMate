import React from 'react'
import MenuListItemComponent from '../../components/MenuListItemComponent'

const MenuListingContainer = props => {
    const { heading, cart, data,onClick } = props
    console.log(data)
    return (
        <div className="MenuListingContainer">
            <h1>
                {heading}
            </h1>

            <div className="MenuListingContainerItemContainer">
                {data.map(({ name, imageUrl, shortDescription, price, id }) => {
                    return (
                        <div className={"MenuListingContainerItem ".concat(cart.find(item=>item.id==id)?"selectedItemContainer":"")}>
                        <MenuListItemComponent
                            heading={name}
                            subHeading={shortDescription || 'Loaded with Cheese, with mayo'}
                            cartValue={cart.find(item=>item.id==id)?"1":""}
                            price={price}
                            onClick={()=>onClick(id)}
                            addToCart={cart.find(item=>item.id==id)}
                            image={imageUrl} />
                            </div>
                    )
                })}
            </div>
          

        </div>
    )
}
export default MenuListingContainer