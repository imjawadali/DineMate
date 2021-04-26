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
                {data.map(({ title, subTitle, price, id }) => {
                    return (
                        <div className={"MenuListingContainerItem ".concat(cart.find(item=>item.id==id)?"selectedItemContainer":"")}>
                        <MenuListItemComponent
                            heading={title}
                            subHeading={subTitle}
                            cartValue={cart.find(item=>item.id==id)?"1":""}
                            price={price}
                            onClick={()=>onClick(id)}
                            addToCart={cart.find(item=>item.id==id)}
                            image={require("../../assets/bgimage.png").default} />
                            </div>
                    )
                })}
            </div>
          

        </div>
    )
}
export default MenuListingContainer