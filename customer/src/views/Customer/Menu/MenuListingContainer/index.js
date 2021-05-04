import React, { useState } from 'react'
import MenuListItemComponent from '../../../../components/MenuListItemComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import '../../styles.css';

const MenuListingContainer = props => {
    const { heading, cart, data, onClick } = props
    const [viewAddons, setViewAddons] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});

    return (
        <div className="MenuListingContainer">
            <h1>
                {heading}
            </h1>

            <div className="MenuListingContainerItemContainer">
                {data.map(menuItem => {
                    return (
                        <div className={"MenuListingContainerItem ".concat(cart.find(item => item.id == menuItem.id) ? "selectedItemContainer" : "")}>
                            <MenuListItemComponent
                                heading={menuItem.name}
                                subHeading={menuItem.shortDescription || 'Loaded with Cheese, with mayo'}
                                cartValue={cart.find(item => item.id == menuItem.id) ? "1" : ""}
                                price={menuItem.price}
                                onClick={() => {
                                    setSelectedItem(menuItem);
                                    setViewAddons(true);
                                    console.clear();
                                    // onClick(id)
                                }}
                                addToCart={cart.find(item => item.id == menuItem.id)}
                                image={menuItem.imageUrl} />
                        </div>
                    )
                })}
            </div>

            {
                viewAddons ?
                    <ViewAddon
                        setViewAddons={setViewAddons}
                        selectedItem={selectedItem}
                    />
                    :
                    null
            }
        </div>
    )
}

const ViewAddon = ({ setViewAddons, selectedItem }) => {
    console.log("selectedItem", selectedItem);

    const [itemCount, setItemCount] = useState(0);

    return (
        <div className="add-on-dialog">
            <div className="dialog">

                <div style={{ display: 'flex', padding: '10px 20px' }}>
                    <FontAwesomeIcon icon={faTimes} className="icon-starz" onClick={() => setViewAddons(false)} />
                </div>

                <div className="item-iamge" >
                    <img
                        width='90px'
                        height='90px'
                        src={selectedItem.imageUrl}
                        alt="image"
                    />
                </div>

                <div className="ice-cap">
                    <h3 className="ice-cap">{selectedItem.name}</h3>
                </div>

                {
                    selectedItem.addOns.map(addOn => {
                        return (
                            addOn.mandatory ?
                                <React.Fragment key={addOn.id}>
                                    <div className="acrdn-hdng" >
                                        <h3 className='acrdn-title'>{addOn.name}</h3>
                                        <small className='req'>{addOn.mandatory ? 'Required' : 'Optional'}</small>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                                        {
                                            addOn.addOnOptions.map(addOnOption => {
                                                return (
                                                    <React.Fragment key={addOnOption.id}>

                                                        <div className="addon-radio" >
                                                            <div className="addon-check">
                                                                <input type="radio" name="size" className="check" />
                                                                <small className='radio-txt'>{addOnOption.name}</small>
                                                            </div>

                                                            <div className="addon-info">
                                                                <span className="addon-price">+${addOnOption.price}</span>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment key={addOn.id}>
                                    <div className="acrdn-hdng" >
                                        <h3 className='acrdn-title'>{addOn.name}</h3>
                                        <small className='req'>{addOn.mandatory ? 'Required' : 'Optional'}</small>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                                        <div className="addon-check" >
                                            <input type="checkbox" className="check" />
                                            <small className='radio-txt'>Choclate Syrup</small>
                                        </div>
                                        <div className="addon-check">
                                            <input type="checkbox" className="check" />
                                            <small className='radio-txt'>Vanilla Syrup</small>
                                        </div>
                                        <div className="addon-check">
                                            <input type="checkbox" className="check" />
                                            <small className='radio-txt'>Caramel Syrup</small>
                                        </div>
                                    </div>
                                </React.Fragment>
                        )
                    })
                }

                <div className="acrdn-hdng" >
                    <h3 className='acrdn-title'>Special Instructions</h3>
                </div>

                <small className="special-instruction">Please let us know if your are allergic to anything or if we need to avoid anything.</small>

                <div className="instrct-layout">
                    <textarea className='instrctn-txt' placeholder="eg . No mayo" name="w3review" rows="4" cols="40" />
                </div>

                <div className="addon-dialog-footer">
                    <div className="mrgn-tp">

                        <FontAwesomeIcon icon={faMinus} className="icon-add" onClick={() => setItemCount(itemCount > 0 ? itemCount - 1 : 0)} />
                        <span className='quntty'>{itemCount}</span>
                        <FontAwesomeIcon icon={faPlus} className="icon-add" onClick={() => setItemCount(itemCount + 1)} />
                    </div>

                    <div className="Add-to-Order">
                        Add to Order
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuListingContainer