import React from 'react'
import brand from '../assets/brand.png'
import hamburger from '../assets/hamburger.png'
import pizza from '../assets/pizza.png'
import phone from '../assets/phone.png'
import Apple from '../assets/Apple.png'
import Playstore from '../assets/Playstore.png'
import instagram from '../assets/instagram.png'
import facebook from '../assets/facebook.png'
import footerBrand from '../assets/footerBrand.png'
import footerTransparent from '../assets/footerTransparent.png'
// import '../../node_modules/bootstrap/dist/js/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import './stylesold.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'
function HomeOLD() {

  return (
    <>

      <header className="home_header">
        <div className="container-fluid ">
          <div className="row ">
            <div className="col-10 mx-auto "  >
              {/* <nav class="navbar navbar-expand-lg navbar-light bg-black">
                          <div className="d-flex justify-content-space-between">
                          <div >
                            <ul class="navbar-nav ">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <img src={hamburger} className="hamburger"/>
                                     </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </li>
                            </ul>
                            </div>
                            <div >
                            <a class="navbar-brand" href="#"><img src={brand} className=" headerbrand"/></a>
                            </div>
                            <div>
                             <button class="btn btn-outline-success " type="submit" className="button_signin ">Sign In</button>
                             </div>    
                             </div>
                        </nav> */}

              {/* <a class="navbar-brand" href="#"><img src={brand} className=" headerbrand"/></a>
                <nav >
                  <ul class="navbar-nav ">
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
        </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </li>
                  </ul>
                </nav>
                            <button class="btn btn-outline-success " type="submit" className="button_signin ">Sign In</button> */}
              <nav class="navbar navbar-expand-lg navbar-expand-sm  ">


                <div id="navbarNavDropdown">
                  <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={hamburger} className="hamburger" />
                      </a>
                      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </li>
                  </ul>
                </div>
                <a class="navbar-brand" href="#"><img src={brand} className=" headerbrand" /></a>
                <form class="form-inline my-2 my-lg-0">
                  <button class="btn btn-outline-success " type="submit" className="button_signin ">Sign In</button>
                </form>
              </nav>
            </div>

          </div>
          <div className="row">
            <div className="col-md-10 col-11 mx-auto d-flex justify-content-start">

              <h1 className="heading">Hungry? You're in the right place</h1>

            </div>

          </div>
          <div className="row">
            <div className="col-md-10 col-11 mx-auto ">

              <form class="example" action="/action_page.php" >

                <input type="text" placeholder="Enter delivery address" name="search2" />
                <button type="submit" className="ml-2">Find Food</button>
              </form>

            </div>

          </div>
        </div>
      </header>


      <section>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-10 mx-auto ">
              <div className="row">
                <div className="col-12">
                  <figure className="justify-content-end d-flex ">
                    <img src={pizza} className="pizza" />
                  </figure>
                  <h1 className="section_heading">You prepare the food, we handle the rest</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section_2">
        <div className="container-fluid ">
          <div className="row mb-2">
            <div className="col-10 mx-auto ">
              <div className="row">
                <div className="col-md-12 text-left">
                  <div className="para_head">
                    <h2 className="thirdHeading">List your restaurant on Dine Mate</h2>
                    <p className="para">Would you like thousands of new customers to taste your amazing food?<br></br>So would we!<br></br></p>
                    <p className="para">It's simple: we list your menu online, help you process orders so that you<br></br>deliver them to your mates!<br></br> </p>
                    <p className="para">Interested? Let's start today!</p>
                    <button className="buttonsetion_2">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section_3">
        <div className="container-fluid cont">
          <div className="row section_3_row">
            <div className="col-10 mx-auto ">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center align-item-center">
                  <img src={phone} className="phone" />
                </div>
              </div>
            </div>
          </div>
          <div className="row section_3_1">
            <div className="col-md-10 mx-auto">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-start">
                  <h2 className="section_heading">Download the food you love</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row section_3_2 ">
            <div className="col-md-10 mx-auto">
              <div className="d-flex justify-content-start ">

                <a class="app-btn blu flex vert " href="http:google.com">
                  <img src={Apple} className="Apple" />
                  <p className="apple_Playstore">Download on the<br></br><span class="big-txt">Apple Store</span></p>
                </a>

                <a class="app-btn blu flex vert play" href="http:google.com m1-2">
                  <img src={Playstore} className="playstore" />
                  <p className="apple_Playstore">Download on the<br></br><span class="big-txt">Play Store</span></p>
                </a>

              </div>
            </div>
          </div>
        </div>

      </section>
      <div>
        <img src={footerTransparent} className="footerTransparent" />
      </div>
      <footer className="footer ">
        <div className="container-fluid ">
          <div className="row ">
            <div className="col-md-10 mx-auto d-flex justify-content-start align-items-start">
              <div className="row">
                <div className="col-6">
                  <img src={footerBrand} className="footerBrand" />
                </div>
                <div className="col-3">
                  <ul className="footer_ul">
                    <li ><a href="">About Dine Mate</a></li>
                    <li ><a href="">Read our blog</a></li>
                    <li ><a href="">Sign up to deliver</a></li>
                    <li ><a href="">Our Site Map</a></li>
                  </ul>
                </div>
                <div className="col-3">
                  <ul className="footer_ul">
                    <li ><a href="">Get Help</a></li>
                    <li ><a href="">View all cities</a></li>
                    <li ><a href="">Restaurants near me</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-10 mx-auto">
              <hr></hr>
              <div className="row">
                <div className="col-lg-6">
                  <p className="footer_para">© 2021 Dine Mate. All Rights Are Reserved.</p>
                </div>
                <div className="col-lg-6 ">
                  <a><img src={facebook} className="fb" /></a>
                  <a> <img src={instagram} className="insta" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}


const Home = props => {
  return (
    <div>
      <div className="header-container">
        <div className="header-new">
          <div className="header-new-left">
            <img src={hamburger} className="hamburger" />
            <img src={require("../assets/logo.png").default} className="logo" />
          </div>
          <div className="header-new-right">
            <button class="btn btn-outline-success header-btn" type="submit" className="button_signin ">Sign In</button>
          </div>
        </div>

        <div className="col-10 mx-auto ">
          <div className="row">
            <div className="col-12">
              {/* <figure className="justify-content-end d-flex ">
                <img src={pizza} className="pizza" />
              </figure> */}
              <h1 className="section_heading">You prepare the food, we handle the rest</h1>
            </div>
          </div>
        </div>

        <section className="header-box-bottom">
          <div className="container-fluid header-box-bottom">
            <div className="row mb-6 header-box-bottom">
              <div className="col-10 mx-auto ">
                <div className="row ">
                  <div className="col-md-12 text-left ">
                    <div className="para_head hbb-container">
                      <h2 className="thirdHeading">List your restaurant on Dine Mate</h2>
                      <p className="para">Would you like thousands of new customers to taste your amazing food?<br></br>So would we!<br></br></p>
                      <p className="para">It's simple: we list your menu online, help you process orders so that you<br></br>deliver them to your mates!<br></br> </p>
                      <p className="para">Interested? Let's start today!</p>
                      <button className="buttonsetion_2">Get Started</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



      </div>

      <div style={{ width: '100%', height: 200 }}>

      </div>

      <section className="section_2 inputFieldImageContainer">
        <div className="col-md-12 inputFieldContainer">
          <h1 className="section_heading inputFieldText">You prepare the food, we handle the rest</h1>
          <form class="example inputField" action="/action_page.php" >
            <input type="text" placeholder="Enter delivery address" name="search2" />
            <button type="submit" className="ml-2">Find Food</button>
          </form>
        </div>
      </section>




      <section className="section_3">
        <div className="container-fluid cont">
          <div className="row section_3_row">
            <div className="col-10 mx-auto ">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center align-item-center">
                  <img src={phone} className="phone" />
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row section_3_1">
            <div className="col-md-10 mx-auto">
              <div className="row">
                <div className="col-md-12 d-flex justify-content-start">
                  <h2 className="section_heading">Download the food you love</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row section_3_2 ">
            <div className="col-md-10 mx-auto">
              <div className="d-flex justify-content-start ">

                <a class="app-btn blu flex vert " href="http:google.com">
                  <img src={Apple} className="Apple" />
                  <p className="apple_Playstore">Download on the<br></br><span class="big-txt">Apple Store</span></p>
                </a>

                <a class="app-btn blu flex vert play" href="http:google.com m1-2">
                  <img src={Playstore} className="playstore" />
                  <p className="apple_Playstore">Download on the<br></br><span class="big-txt">Play Store</span></p>
                </a>

              </div>
            </div>
          </div>
         */}
         <div className=" col-md-12 d-flex justify-content-start">
                  <h2 className="section_heading">Download the food you love</h2>
                </div>
                <div className="row section-logos" >
<div className="col-md-12 section-logos-images-container">
{/* <img src={require("../assets/")}/> */}
</div>

                </div>
        </div>

      </section>
    

    </div >
  )
}


export default Home
