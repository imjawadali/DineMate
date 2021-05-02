import React, { useState, useEffect } from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom'

import Landing from './Landing'
import NoRoute from '../NoRoute'
import Footer from '../Footer'

import './styles.css'

export default function Home(props) {

  useEffect(() => {
    console.log("Home", props)
  }, [])

  let { path } = useRouteMatch()

  return (
    <div>
      <Switch>
        <Route exact path={path} component={Landing} />
        <Route component={NoRoute} />
      </Switch>
      <Footer />
    </div>
  )
}