import React from 'react'
import brand from '../assets/brand.png'
import hamburger from '../assets/hamburger.png'
import pizza from '../assets/pizza.png'
import phone from '../assets/phone.png'
// import '../../node_modules/bootstrap/dist/js/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'
function Home() {

    return (
        <>
        
        <header className="home_header">
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-10 mx-auto " >
                        <nav class="navbar navbar-expand-lg navbar-light bg-black">
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
                            <a class="navbar-brand" href="#"><img src={brand} className=" headerbrand"/></a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">

                                
                                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" className="button_signin ml-auto">Sign In</button>
                                
                            </div>
                        </nav>

                    </div>
                   
                </div>
                <div className="row">
                        <div className="col-md-10 col-11 mx-auto d-flex justify-content-start">
                        
                            <h1 className="heading">Hungry? You're in the right place</h1>
                        
                        </div>

                    </div>
            </div>
        </header>
         
        
        <section>
        <div className="container-fluid ">    
          <div className="row">
            <div className="col-10 mx-auto ">
                 <figure className="justify-content-end d-flex ">
                     <img src={pizza} className="pizza"/>
                 </figure>
                 <h1 className="section_heading">You prepare the food, we handle the rest</h1>
            </div>
          </div>
        </div>      
        </section>

        <section className="section_2">
        <div className="container-fluid ">    
          <div className="row">
            <div className="col-10 mx-auto ">
               <div className="col-md-8 text-left">
                   <div className="para_head">
                       <h2 className="thirdHeading">List your restaurant on Dine Mate</h2>
                       <p>Would you like thousands of new customers to taste your amazing food?<br></br>So would we!<br></br></p> 
                        <p>It's simple: we list your menu online, help you process orders so that you<br></br>deliver them to your mates!<br></br> </p>      
                        <p>Interested? Let's start today!</p> 
                        <button className="buttonsetion_2">Get Started</button>
                   </div>
                   </div>  
            </div>
          </div>
        </div>      
        </section>

        <section className="section_3 ">
        <div className="container-fluid ">    
          <div className="row section_3_row">
            <div className="col-10 mx-auto ">
                  <div className="col-md-12 d-flex justify-content-center align-item-center">
                   <img src={phone} className="phone"/>
                   </div>     
            </div>
          </div>
          <div className="row section_3_2">
              <div className="col-md-10 mx-auto">
                     <div className="col-md-12 d-flex justify-content-start">
                      <h2 className="section_heading">Download the food you love</h2>
                      </div>
              </div>
          </div>
         </div>
         </section>   
       


    </>
    )
}

export default Home
