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
  const [currentUser, setCurrentUser] = useState({id: 9})
  const [userGames, setUserGames] = useState([])

  function addUserGame(game) {
    console.log(game)
    const newUserGameObj = {
      user_id: currentUser.id,
      game_id: parseInt(game.id),
      details: ""
    } 

    fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUserGameObj)
    })
    .then(resp => resp.json())
    .then(newObj => {
      setUserGames([...userGames, newObj])
    })
  }

  function handleLogin() {
    console.log("login")
  }

  function handleLogout() {
    console.log("logout")
  }

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games`)
      .then(resp => resp.json())
      .then(data => {
        setUserGames(data)
      })
  }, [])


  console.log(currentUser)
  return (
    <div className="app">
      <Route>
        <Nav currentUser={currentUser} handleLogout={handleLogout} />
      </Route>
      <Switch>
        <Route exact path="/users/:id">
          <UserShow currentUser={currentUser}/> 
        </Route>
        <Route exact path="/games/:id">
            <GamePage />
        </Route>
        <Route exact path="/games">
          <AddGame games={games} newUserGame={addUserGame}/>
        </Route>
        <Route exact path="/user_games/:id">
          <UserGameDetail currentUser={currentUser}/>
        </Route>
        <Route exact path="/">
          <Login setCurrentUser={setCurrentUser} firstGame={games[0]}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
