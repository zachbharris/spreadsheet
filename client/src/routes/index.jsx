import React from 'react'
import { Switch, Route } from 'react-router-dom'

// pages
import HomePage from './Home'
import SheetPage from './Sheet'

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:sheetId" component={SheetPage} />
      </Switch>
    </>
  )
}

export default Routes
