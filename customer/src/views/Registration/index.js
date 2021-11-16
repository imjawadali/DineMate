import React from 'react'
import './styles.css';
import logo from '../../assets/pizza_with_green_circle.png';
import { useState } from 'react';
import { customisedAction } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_RESTURENT } from '../../constants';

function Registration(props) {

  const questions = [
    {
      question: "How long does it take to become a restaurant partner?",
      answer: "I don't know."
    },
    {
      question: "How does pricing work?",
      answer: "I don't know."
    },
    {
      question: "What kinds of DineMate's tools do restaurant partners receive?",
      answer: `A tablet with Restaurant Dashboard helps restaurant partners keep track of new orders and
      helps manage them. Restaurant Manager software gives deeper access to menus, payment
      information, sales data, and customer insights. We’ve got a tech team making sure both
      tools are up to speed and running smoothly every day`
    }
  ];

  const [restuarantName, setRestuarantName] = useState("")
  const [restuarantAddress, setRestuarantAddress] = useState("")
  const [firstame, setFirstame] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [ContactNumber, setContactNumber] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const genericData = useSelector(({ serviceReducer }) => serviceReducer.genericData)
  let dispatch = useDispatch()


  const submit = () => {
    let obj = {
      "restaurantName": restuarantName,
      "address": restuarantAddress,
      "city": city,
      "country": country,
      "firstName": firstame,
      "lastName": lastName,
      "email": email,
      "phoneNumber": ContactNumber,
      "businessType": businessType
    }
    console.log(obj)
    dispatch(customisedAction(REGISTER_RESTURENT, {
      data: obj, reset: () => {
        setRestuarantName("")
        setRestuarantAddress("")
        setCity("")
        setCountry("")
        setFirstame("")
        setLastName("")
        setEmail("")
        setContactNumber("")
        setBusinessType("")
      }
    }))

  }
  return (
    <div>
      <div className="main-form-div">
        <div className="abstrat-content">
          <div className="abstract-header">
            PARTNER WITH US
          </div>

          <div className="abstract-text">
            DineMate's platform gives you the flexibility,
            visibility and customer insights you need to
            connect with more customers.
          </div>
        </div>

        <div className="form-div">
          <div className="form">
            <div className="form-title">Get Started</div>

            <div className="restaurant-info-fields">
              <input value={restuarantName} onChange={(ev) => setRestuarantName(ev.target.value)} className="form-input" placeholder="Tim hortins" type="text" />
              <input value={restuarantAddress} onChange={(ev) => setRestuarantAddress(ev.target.value)} className="form-input" placeholder="Store Address" type="text" />
              {/* <input className="form-input" placeholder="Floor / Suite (Optional)" type="text" /> */}
              <div className="names-div">
                <input value={city} onChange={(ev) => setCity(ev.target.value)} className="form-input" placeholder="City" type="text" />
                <input value={country} onChange={(ev) => setCountry(ev.target.value)} className="form-input" placeholder="Country" type="text" />
              </div>
            </div>

            <div className="persoanl-info-fields">
              <div className="names-div">
                <input value={firstame} onChange={(ev) => setFirstame(ev.target.value)} className="form-input" placeholder="First Name" type="text" />
                <input value={lastName} onChange={(ev) => setLastName(ev.target.value)} className="form-input" placeholder="Last Name" type="text" />
              </div>
              <input value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-input" placeholder="Email Address" type="text" />
              <input value={ContactNumber} onChange={(ev) => setContactNumber(ev.target.value)} className="form-input mobile-number" placeholder="Mobile Phone Number" type="tel" />

              <select className="country-select">
                <option>PK</option>
                <option>IN</option>
                <option>SA</option>
              </select>

              <div className="selected-country">+1</div>
            </div>

            <div className="persoanl-info-fields" style={{ marginTop: -14 }}>
              <select value={businessType} onChange={(ev) => setBusinessType(ev.target.value)} className="form-input" placeholder="Business type">
                <option>Business Type</option>
                <option>No Business</option>
              </select>
            </div>

            <div className="policy-text">
              By clicking “Submit,” you agree to <span className="highlighted">DineMate's General Terms and Conditions</span> and acknowledge you
              have read the <span className="highlighted">Privacy Policy.</span>
            </div>

            <div className="submit-div" onClick={submit}>
              <div className="submit-button">
                Submit
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="why-dine-mate-div">
        <div className="why-dine-mate-title">
          Why DineMate?
        </div>

        <img className="dine-mate-logo" src={logo} />
      </div>

      <div className="reasons">
        <div className="reason-div">
          <div className="reason-title">Boost your visibility</div>

          <div className="reason">Stand out with in-app marketing to reach even more customers and increase sales.</div>
        </div>

        <div className="reason-div">
          <div className="reason-title">Pick up</div>

          <div className="reason">Our offerings are flexible so you can customize them to your needs. Get started with pick up feature.</div>
        </div>

        <div className="reason-div">
          <div className="reason-title">Connect with customers</div>

          <div className="reason">Turn customers into regulars with actionable data insights, respond to reviews or offer a loyalty program.</div>
        </div>
      </div>

      <div className="video-div">
        <iframe src={genericData && genericData.youtubeLink}
          className="video"
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='video'
        />
      </div>

      <div className="questions-div">
        <div className="questions-title">Questions? We’ve got answers.</div>

        {
          genericData && genericData.faqs.map((question, i) => {
            return (
              <div className="question-section" key={i}>
                <div className="question-toggle-div">
                  <div className="question">{question.question}</div>

                  <div className="toggle-answer" onClick={() => {
                    let answer = document.getElementById("answer_" + i);
                    if (answer.style.display != 'block') {
                      answer.style.display = 'block';
                    } else {
                      answer.style.display = 'none';
                    }
                  }}>
                    +
                  </div>
                </div>

                <div className="answer" id={"answer_" + i}>
                  <p>{question.answer}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Registration