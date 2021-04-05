import React, { useState, useEffect } from 'react'
import { Button,SmallButton,Separator ,Input} from '../../../components'
import OrderTable from './OderTable'
import {customisedAction} from '../../../redux/actions'
import {  GET_ORDER } from '../../../constants'
import { useSelector,useDispatch } from 'react-redux'
function OrderManagement ()
{   const[search,setSearch]=useState("");
const[type,setType]=useState('Dine-In');
const fetchingOrder = useSelector(({ orderReducer }) => orderReducer.fetchingOrder)
const order = useSelector(({ orderReducer }) => orderReducer.order)
const admin = useSelector(({ sessionReducer }) => sessionReducer.admin)
const dispatch = useDispatch()
const { restaurantId } = admin


const getFilteredList = () => {
 
    let filteredQrs = order
    if (search && search.length && order) {
      filteredQrs = order.filter(
        (ord) =>
          ord.tableId.toLowerCase().includes(search.toLowerCase())||
          ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||         
          ord.type.toLowerCase().includes(search.toLowerCase()
          ) 
      )}
  
    return filteredQrs
 
}
    return(
        <div className="Container">
            <div className="PageTitleContainer">
            <h2>Order Management</h2>
                <div className="PageTitleButtonContainer">
                    <Button
                        text="Add Table"
                        iconLeft={<i className="fa fa fa-plus-circle" />}
                         />
                </div>
                </div>
                <div className="TopOptionsContainer">
                <div className="TopInputContainer">
                    <Input
                        placeholder="Search Order (by Table No,Type)"
                        value={search}
                        onChange={({ target: { value } }) => setSearch(value)}
                    />
                </div>
            <div className="TopButtonContainer">
                    <Button
                        text={search ? "Clear" : "Search"}
                    // light={fetchingOrder}
                    // lightAction={() => null}
                    iconLeft={<i className={`fa fa-${search ? 'times-circle' : 'refresh'}`} />}
                    onClick={() => search ? setSearch('') :dispatch(customisedAction(GET_ORDER,{restaurantId,type}))} 
                    />
                </div>
      </div>
      {fetchingOrder && !order ?
        <div className="loadingContainer">
          <p><i className={`fa fa-refresh ${fetchingOrder ? 'fa-pulse' : ''}`} style={{ padding: '0px 5px' }} />Fetching / Syncing Food Items . . .</p>
        </div> : null
      }
      <OrderTable
        order={getFilteredList()}
        restaurantId={restaurantId} />
     </div>
    )
}
export default OrderManagement