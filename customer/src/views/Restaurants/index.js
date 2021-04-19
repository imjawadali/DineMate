import { faSearch } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import ResturantListComponent from '../../components/ResturantListComponent'
import SearchBar from '../../components/SeachBar'
import { Title } from '../../components/Title'
import Header from '../Header'

const ResturantDATA = [{
  title: "Tim Hortons",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
},
{
  title: "secondR esturatn",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
}, {
  title: "secondRe Hortons",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
}, {
  title: "Tim  turatn",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
}, {
  title: "secondRes  Hortons",
  price: "$$",
  cuisines: "• Breakfast and Brunch • American • Sandwiches",
  stars: "4.1",
}
]


function Restaurants() {
  return (
    <div>
      <Header />
      <div className="resturant-searchbar">
        <div className="resturant-searchbar-container">
          <SearchBar iconName={faSearch} text="Missigua, Ontario" />
        </div>
      </div>

      <div className="image_holder">
        <img src={require("../../assets/bgimage.png").default} style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="heading-container">
        <Title text="Resturant" />
      </div>


      <div className="resturant-list-container">
        {ResturantDATA.map(item => {
          return (
            <div className="resturant-list-component">
              <ResturantListComponent
                title={item.title}
                price={item.price}
                cuisines={item.cuisines}
                stars={item.stars}
                image={require("../../assets/bgimage.png").default}
              />
            </div>)
        })}


      </div>

    </div>
  )
}

export default Restaurants
