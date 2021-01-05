import React from 'react'
import { useParams } from "react-router-dom";

function Restaurants(props) {

  let { restaurantId, tableId } = useParams();
  
  return (
    <div>
      <p>Restaurant ID: {restaurantId}</p>
      <p>Table ID: {tableId}</p>
    </div>
  )
}

export default Restaurants
