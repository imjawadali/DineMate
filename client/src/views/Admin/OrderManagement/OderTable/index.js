import React from 'react'
import {SmallButton } from '../../../../components'

function OrderTable(props) {
    const { history, restaurantId, tables } = props
    return(
        <div className="HorizontalScrollContainer">
<table >
<thead>
<tr>
    <th>Table No</th>
    <th>Type</th>
    <th>Check No</th>
    <th>Status</th>
    <th>Actions</th>
    
</tr>
</thead>
<tbody>
    {props. order && props.order.length?
    props.order.map((val,ind)=>{
        const tableNumber = val.tableId.replace(`${restaurantId}/`, '')
    return(<>
    
        <tr>
        
        <td>{tableNumber.length === 1 ? '0' : null}{tableNumber}</td>    
        <td>{val.type}</td>
        <td>{val.orderNumber}</td>
        <td>{val.status ? "Open" : "Close"}</td>
        <td> 
            <p style={{display:'flex'}}>
        <SmallButton
        style={{ width: '100%', marginRight: '20px' }}
        text="Details"
        iconLeft={<i className="fa fa-info" />}
         />
         <SmallButton
        style={{ width: '100%', marginLeft: '20px' }}
        text="Close"
        iconLeft={<i className="fa fa-info" />}
         />
         </p>        
        </td>
        </tr>
        
        </>
    )})
    :
     <tr>
         <td colSpan="6" style={{textAlign:'center'}}>No Data Found!! </td>
     </tr>
     }
    
    </tbody>
</table>
</div>
    )

    }
    export default OrderTable;