import React, { useEffect, useState } from 'react'
import MenuListItemComponent from '../../../../components/MenuListItemComponent'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus, faMinus, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
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
                                }}
                                updateCart={onClick}
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

const ViewAddon = ({ setViewAddons, selectedItem, updateCart }) => {

    const [itemCount, setItemCount] = useState(1);
    const [itemToAdd, setItemToAdd] = useState({ addOnOptions: [] });
    const [totalPrice, setTotalPrice] = useState(0);
    const [updateComponent, setUpdateComponent] = useState(true);

    useEffect(() => {
        let price = 0;
        for (let key in itemToAdd) {
            if (key == 'addOnOptions') {
                itemToAdd[key].forEach(item => price += item.price)
            } else {
                price += itemToAdd[key].price;
            }
        }
        setTotalPrice(price * itemCount)
    }, [itemToAdd, itemCount]);

    // FINAL CALL
    const addToCart = e => {
        e.preventDefault();
        console.log("itemToAdd", {
            ...itemToAdd,
            special_instructions: document.getElementById("special_instructions").value,
            totalPrice
        });
        // updateCart();
    }

    return (
        <div className="add-on-dialog">
            <form onSubmit={e => addToCart(e)}>
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

                    <div className="ice-cap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="ice-cap" style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedItem.name}</h3>
                        <span style={{ marginRight: 8 }}>${totalPrice}</span>
                    </div>

                    <div className="addon-selection-content">
                        {
                            selectedItem.addOns.filter(addOn => addOn.addOnOptions.length > 0).map(addOn => {
                                return (
                                    addOn.mandatory ?
                                        <React.Fragment key={addOn.id}>
                                            <div className="acrdn-hdng" >
                                                <h3 className='acrdn-title'>{addOn.name}</h3>
                                                <small className='req'>{addOn.mandatory ? 'Required' : 'Optional'}</small>
                                            </div>

                                            <div
                                                style={{ position: 'relative' }}>
                                                {
                                                    document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
                                                        ?
                                                        <FontAwesomeIcon
                                                            icon={faAngleUp}
                                                            className="toggle-accordion"
                                                            onClick={() => {
                                                                let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                                addonItemsList.style.display = 'flex';
                                                                setUpdateComponent(!updateComponent)
                                                            }}
                                                        />
                                                        :
                                                        <FontAwesomeIcon
                                                            icon={faAngleDown}
                                                            className="toggle-accordion"
                                                            onClick={() => {
                                                                let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                                addonItemsList.style.display = 'none';
                                                                setUpdateComponent(!updateComponent)
                                                            }}
                                                        />
                                                }
                                            </div>

                                            <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                                                {
                                                    addOn.addOnOptions.length > 0 && addOn.addOnOptions.map(addOnOption => {
                                                        return (
                                                            <React.Fragment key={addOnOption.id}>
                                                                <div className="addon-radio">
                                                                    <div className="addon-check">
                                                                        <input
                                                                            type="radio"
                                                                            required={!!addOn.mandatory}
                                                                            name={addOn.name}
                                                                            className="check"
                                                                            onChange={() => { setItemToAdd({ ...itemToAdd, [addOn.name]: addOnOption }) }}
                                                                        />
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

                                            <div
                                                style={{ position: 'relative' }}>
                                                {
                                                    document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
                                                        ?
                                                        <FontAwesomeIcon
                                                            icon={faAngleUp}
                                                            className="toggle-accordion"
                                                            onClick={() => {
                                                                let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                                addonItemsList.style.display = 'flex';
                                                                setUpdateComponent(!updateComponent)
                                                            }}
                                                        />
                                                        :
                                                        <FontAwesomeIcon
                                                            icon={faAngleDown}
                                                            className="toggle-accordion"
                                                            onClick={() => {
                                                                let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                                addonItemsList.style.display = 'none';
                                                                setUpdateComponent(!updateComponent)
                                                            }}
                                                        />
                                                }
                                            </div>

                                            <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                                                {
                                                    addOn.addOnOptions.map(addOnOption => {
                                                        return (
                                                            <React.Fragment key={addOnOption.id}>
                                                                <div className="addon-radio">
                                                                    <div className="addon-check" >
                                                                        <input
                                                                            type="checkbox"
                                                                            required={!!addOn.mandatory}
                                                                            onChange={() => {
                                                                                setItemToAdd({
                                                                                    ...itemToAdd,
                                                                                    addOnOptions: itemToAdd.addOnOptions.includes(addOnOption) ?
                                                                                        itemToAdd.addOnOptions.filter(_addOnOption => addOnOption.id != _addOnOption.id)
                                                                                        :
                                                                                        [...itemToAdd.addOnOptions, addOnOption]
                                                                                })
                                                                            }}
                                                                            name={addOnOption.name}
                                                                            className="check"
                                                                        />
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
                                )
                            })
                        }

                        {
                            selectedItem.addOns.filter(addOn => addOn.addOnOptions.length == 0).map(addOn => {
                                return (
                                    <React.Fragment key={addOn.id}>
                                        <div className="acrdn-hdng" style={{ padding: '10px 18px' }}>
                                            <h3 className='acrdn-title'>Optional</h3>
                                        </div>

                                        <div
                                            style={{ position: 'relative' }}>
                                            {
                                                document?.getElementById("addon_" + addOn.id)?.style?.display == 'none'
                                                    ?
                                                    <FontAwesomeIcon
                                                        icon={faAngleUp}
                                                        className="toggle-accordion"
                                                        onClick={() => {
                                                            let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                            addonItemsList.style.display = 'flex';
                                                            setUpdateComponent(!updateComponent)
                                                        }}
                                                    />
                                                    :
                                                    <FontAwesomeIcon
                                                        icon={faAngleDown}
                                                        className="toggle-accordion"
                                                        onClick={() => {
                                                            let addonItemsList = document.getElementById("addon_" + addOn.id);
                                                            addonItemsList.style.display = 'none';
                                                            setUpdateComponent(!updateComponent)
                                                        }}
                                                    />
                                            }
                                        </div>

                                        <div id={"addon_" + addOn.id} style={{ display: 'flex', flexDirection: 'column', padding: '10px 20px' }}>
                                            <div className="addon-radio">
                                                <div className="addon-check" >
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => {
                                                            setItemToAdd({
                                                                ...itemToAdd,
                                                                addOnOptions: itemToAdd.addOnOptions.includes(addOn) ?
                                                                    itemToAdd.addOnOptions.filter(_addOnOption => addOn.id != _addOnOption.id)
                                                                    :
                                                                    [...itemToAdd.addOnOptions, addOn]
                                                            })
                                                        }}
                                                        name={addOn.name}
                                                        className="check"
                                                    />
                                                    <small className='radio-txt'>{addOn.name}</small>
                                                </div>

                                                <div className="addon-info">
                                                    <span className="addon-price">+${addOn.price}</span>
                                                </div>
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
                            <textarea className='instrctn-txt' placeholder="eg . No mayo" id="special_instructions" name="special_notes" rows="4" cols="40" />
                        </div>
                    </div>

                    <div className="addon-dialog-footer">
                        <div className="mrgn-tp">

                            <FontAwesomeIcon icon={faMinus} className="icon-add" onClick={() => setItemCount(itemCount > 1 ? itemCount - 1 : 1)} />
                            <span className='quntty'>{itemCount}</span>
                            <FontAwesomeIcon icon={faPlus} className="icon-add" onClick={() => setItemCount(itemCount > 98 ? 99 : itemCount + 1)} />
                        </div>

                        <button className="Add-to-Order" type="submit">
                            Add to Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MenuListingContainer