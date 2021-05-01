import React from 'react'
import './styles.css'

// const Footer = props => {

//     return (
//         <div className="footer">
//             <div className="footer-top">
//                 <div className="footer-top-left">
//                     <div className="footer-top-left-top">
//                         <img src={require("../../../assets/logo.png").default} />
//                     </div>
//                     <div className="footer-top-left-bottom">
//                         <div className="footer-top-left-bottom-img">
//                             <img src={require("../../../assets/apple.png").default} />
//                         </div>
//                         <div className="footer-top-left-bottom-img">
//                             <img src={require("../../../assets/google.png").default} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer-top-right">
//                     <div className="ftr-left">
//                         <p>
//                             About Dine Mate
//                         </p>
//                         <p>
//                             Read our blog
//                         </p>
//                         <p>
//                             Add your restaurant
//                         </p>
//                         <p>
//                             Sign up to deliver
//                         </p>
//                     </div>
//                     <div className="ftr-right">
//                         <p>
//                             Get Help
//                         </p>
//                         <p>
//                             View all cities
//                         </p>
//                         <p>
//                             Restaurants near me
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <div className="footer-bottom">
//                 <div className="footer-bottom-left">
//                     <p> © 2021 Dine Mate. All Rights Are Reserved.</p>
//                 </div>
//                 <div className="footer-bottom-right">
//                     <div className="footer-bottom-right-logo">
//                         <img src={require("../../../assets/fblogo.png").default} />
//                     </div>
//                     <div className="footer-bottom-right-logo">
//                         <img src={require("../../../assets/instagramlogo.png").default} />
//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }






const Footer = props => {
    return (
        <div className="global-footer">
            <div className="global-footer-inner">

                <div className="global-footer-top">
                    <div className="footer-top-left">
                        <div className="footer-top-left-top">
                            <img src={require("../../../assets/logo.png").default} />
                        </div>
                        <div className="footer-top-left-bottom">
                            <div className="footer-top-left-bottom-img">
                                <img src={require("../../../assets/apple.png").default} />
                            </div>
                            <div className="footer-top-left-bottom-img">
                                <img src={require("../../../assets/google.png").default} />
                            </div>
                        </div>
                    </div>
                    <div className="footer-top-right">
                        <div className="ftr-left">
                            <p>
                                About Dine Mate
                         </p>
                            <p>
                                Read our blog
                         </p>
                            <p>
                                Add your restaurant
                         </p>
                            <p>
                                Sign up to deliver
                         </p>
                        </div>
                        <div className="ftr-right">
                            <p>
                                Get Help
                         </p>
                            <p>
                                View all cities
                         </p>
                            <p>
                                Restaurants near me
                         </p>
                        </div>
                    </div>
                </div>
                <div className="global-footer-bottom">
                    <div className="footer-bottom-left">
                        <p> © 2021 Dine Mate. All Rights Are Reserved.</p>
                    </div>
                    <div className="footer-bottom-right">
                        <div className="footer-bottom-right-logo">
                            <img src={require("../../../assets/fblogo.png").default} />
                        </div>
                        <div className="footer-bottom-right-logo">
                            <img src={require("../../../assets/instagramlogo.png").default} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}





export default Footer