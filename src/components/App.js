import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import UserShow from './UserShow'
import GamePage from './GamePage'
import Login from './Login'
 
function App() {
  return (
    <div className="app">
      <Route>
        <Nav />
      </Route>
      <Switch>
        <Route exact path="users/:id">
          <UserShow /> 
        </Route>
        <Route exact path="/games/:id">
          <div className="users-library">
            <GamePage />
          </div>
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
