import React, { useState } from 'react'

import { HeaderButton, Logo, MenuIcon, SideNav } from '../../components'
import './styles.css'

export default function Home(props) {

  const [showSidenav, setShowSideNav] = useState(false);

  return (
    <div className="HomeContainer">
      <div className="HomeTopContainer">
        <>
          <img className="HomeTopImage" src={require('../../assets/home_top_bg.png').default} />
          <img className="HomeTopImage2" src={require('../../assets/home_top_bg2.png').default} />
        </>

        <div className="HomeHeaderContainer">
          <MenuIcon onClick={() => setShowSideNav(!showSidenav)} />
          {
            showSidenav ?
              <SideNav setShowSideNav={setShowSideNav} />
              : null
          }
          <div className="HeaderLogoContainer">
            <Logo src={require('../../assets/logo2.png').default} />
          </div>
          <HeaderButton
            src={require('../../assets/signin_icon.png').default}
            text="Sign In"
          />
        </div>

        <div className="HomeTopContentContainer">
          <p className="HomeTopText">You prepare the food, we handle the rest</p>
          <div className="HomeTopContentInnerContainer">
            <p className="HomeTopInnerTextTitle">List your restaurant on Dine Mate</p>
            <p className="HomeTopInnerText">Would you like thousands of new customers to taste your amazing food? So would we!</p>
            <p className="HomeTopInnerText">It's simple: we list your menu online, help you process orders so that you deliver them to your mates!</p>
            <p className="HomeTopInnerText">Interested? Let's start today!</p>
            <div className="HomeTopInnerButtonContainer">
              <div className="HomeTopInnerButton" onClick={() => props.history.push('/registration')}>
                <p className="HomeTopInnerButtonText">GET STARTED</p>
              </div>
            </div>
            <img className="HomeTopImageBottom" src={require('../../assets/burger_with_red_circle.png').default} />
          </div>
        </div>
      </div>

      <div className="HomeMiddleContainer">
        <div className="HomeMiddleTopContainer">
          <img className="HomeMiddleTopBgImage" src={require('../../assets/middle_transparent_bd.png').default} />
          <img className="HomeMiddleTopImage" src={require('../../assets/pizza_with_green_circle.png').default} />
        </div>

        <div className="HomeMiddleMiddleContainer">
          <img className="HomeMiddleBgImage" src={require('../../assets/home_middle_bg.png').default} />
          <div className="HomeMiddleContentContainer">
            <p className="HomeMiddleText">Hungry? You're in the right place</p>
            <div className="HomeMiddleInnerContainer">
              <div className="HomeInputContainer">
                <img className="HomeInputLocationMarker" src={require('../../assets/marker.png').default} />
                <input
                  className="HomeInput"
                  placeholder="Enter Delivery Address"
                />
              </div>
              <div className="HomeMiddleButton">
                <p className="HomeMiddleButtonText">Find Food</p>
              </div>
            </div>
          </div>
        </div>

        <div className="HomeMiddleTopContainer">
          <img className="HomeMiddleTopBgImage" src={require('../../assets/footerTransparent.png').default} />
          <img className="HomeMiddleBottomImage" src={require('../../assets/fries_with_green_circle.png').default} />
        </div>
      </div>

      <div className="HomeBottomContainer">
        <img className="HomeBottomBgImage" src={require('../../assets/home_bottom_bg.png').default} />

        <img className="HomeBottomCenterImage" src={require('../../assets/home_phone.png').default} />

        <div className="HomeBottomContentContainer">
          <div className="HomeBottomContentInnerContainer">
            <p className="HomeBottomText">Download the food you love</p>
            <img className="HomeBottomHeartImage" src={require('../../assets/home_heart.png').default} />
          </div>

          <div className="HomeDownloadButtonsContainer">
            <img className="HomeDownloadButtons" src={require('../../assets/home_apple_download.png').default} />
            <img className="HomeDownloadButtons" src={require('../../assets/home_google_download.png').default} />
          </div>
        </div>

        <img className="HomeBottomBottomImage" src={require('../../assets/burger_with_circle.png').default} />
      </div>

      <div className="HomeBlankDiv" />
    </div>
  )
}