import React from 'react'

function Restaurants(props) {
  return (
    <div>
      <p>Restaurants</p>
      <button onClick={async () => props.history.push('/admin')}>Admin</button>
    </div>
  )
}

export default Restaurants
