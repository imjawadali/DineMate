import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ResturantListComponent from '../../components/ResturantListComponent'
import { Title } from '../../components/Title'
import { GET_ALL_RESTAURANTS } from '../../constants'
import { customisedAction } from '../../redux/actions'

const ResturantDATA = [{
  title: "Tim Hortons",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
  imageUrl: require("../../assets/listingbg.png")
},
{
  title: "secondR esturatn",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
  imageUrl: require("../../assets/bgimage.png")
}, {
  title: "secondRe Hortons",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
  imageUrl: require("../../assets/listingbg.png")
}, {
  title: "Tim  turatn",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
  imageUrl: require("../../assets/bgimage.png")
}, {
  title: "secondRes  Hortons",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
  imageUrl: require("../../assets/listingbg.png")
}
]

function Restaurants(props) {

  const fetchingRestaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.fetchingRestaurants)
  const restaurants = useSelector(({ restaurantsReducer }) => restaurantsReducer.restaurants)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(customisedAction(GET_ALL_RESTAURANTS))
  }, [])

  return (
    <div>
      <div className="resturant-searchbar">
        {/* <div className="resturant-searchbar-container"> */}
          {/* <SearchBar iconName={faSearch} text="Missigua, Ontario" /> */}
        {/* </div> */}
      </div>

      <div className="image_holder">
        <img src={require("../../assets/bgimage.png").default} style={{ width: '100%',marginTop:-60 }} />
      </div>



      <div className="heading-container">
        <Title text="All Resturants" />
      </div>
      <div className="resturant-list-container">
        {restaurants && restaurants.length ?
          restaurants.map((restaurant, index) => {
            const { restaurantId, imageUrl, restaurantName: name, categories, rating } = restaurant
            const imagesArray = [require("../../assets/listingbg.png"), require("../../assets/bgimage.png")]
            return (
              <div key={index} className="resturant-list-component">
                <ResturantListComponent
                  title={name}
                  price={"$$"}
                  cuisines={categories ? categories.replaceAll(',', ' • ') : 'Breakfast and Brunch • American • Sandwiches'}
                  stars={rating}
                  image={imageUrl || imagesArray[index%2].default}
                  onClick={() => props.history.push(`/customer/${restaurantId}/menu`)}
                />
              </div>)
          })
          : null
        }
      </div>




      <div style={{ display: 'flex', justifyContent: 'center',  }} className="button-container-resturant">
        <button className="resturant-button">Show More</button>
      </div>
    </div>
  )
}

export default Restaurants
