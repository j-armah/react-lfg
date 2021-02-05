import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Nav from './Nav'
import UserShow from './UserShow'
import GamePage from './GamePage'
import Login from './Login'
import AddGame from './AddGame'
import UserGameDetail from './UserGameDetail'
import { Grid } from '@material-ui/core'


 
function App() {
  // const [users, setUsers] = useState([])
  // const [isLoaded, setIsLoaded] = useState(false)
  const [games, setGames] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [userGames, setUserGames] = useState([])
  const history = useHistory()
  // const location = useLocation()

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

  function handleLogin(user) {
    console.log(user)
    setCurrentUser(user)
    history.push("/games")
  }

  function handleLogout() {
    setCurrentUser(null)
    localStorage.removeItem("token")
    history.push("/")
  }

  // Auth to keep user logged in after refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((r) => r.json())
        .then((user) => {
          // console.log(user)
          setCurrentUser(user);
          // setIsLoaded(true)
        });
    }
  }, []);

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


  // console.log(currentUser)
  // console.log(localStorage.getItem("token"))
  // if (!isLoaded) return <h1>Loading</h1>
  return (
    <Grid className="app" container direction="column">
      <Grid item>
        <Route>
          <Nav currentUser={currentUser} handleLogout={handleLogout} />
        </Route>
      </Grid>
      
      <Switch>
        <Grid item container>
          <Grid item xs={false} sm={1} />
            <Grid item xs={12} sm={10}>
              <Route exact path="/users/:id">
                <UserShow currentUser={currentUser} /> 
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
                <Login setCurrentUser={setCurrentUser} firstGame={games[0]} handleLogin={handleLogin}/>
              </Route>
            </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>

      </Switch>
    </Grid>
  );
}

export default App;
