import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import UserShow from './UserShow'
import GamePage from './GamePage'
import Login from './Login'
import AddGame from './AddGame'
import UserGameDetail from './UserGameDetail'

 
function App() {
  // const [users, setUsers] = useState([])
  const [games, setGames] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  // const [userGames, setUserGames] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/games`)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        setGames(data)
      })
  }, [])

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_BASE_URL}/users`)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       // console.log(data)
  //       setUsers(data)
  //     })
  // }, [])

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games`)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       // console.log(data)
  //     })
  // }, [])


  console.log(currentUser)
  return (
    <div className="app">
      <Route>
        <Nav />
      </Route>
      <Switch>
        <Route exact path="/users/:id">
          <UserShow /> 
        </Route>
        <Route exact path="/games/:id">
            <GamePage />
        </Route>
        <Route exact path="/games">
          <AddGame games={games}/>
        </Route>
        <Route exact path="/user_games/:id">
          <UserGameDetail />
        </Route>
        <Route exact path="/">
          <Login setCurrentUser={setCurrentUser} firstGame={games[0]}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
