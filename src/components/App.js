import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useLocation, useParams} from 'react-router-dom'
import Nav from './Nav'
import UserShow from './UserShow'
import GamePage from './GamePage'
import Login from './Login'
import AddGame from './AddGame'
import UserGameDetail from './UserGameDetail'
import SignUp from './SignUp'
import { Grid, Box } from '@material-ui/core'
import ReviewForm from './ReviewForm'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  load: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

 
function App() {
  const [users, setUsers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [games, setGames] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [userGames, setUserGames] = useState([])
  const [reviewee, setReviewee] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const history = useHistory()
  // const location = useLocation()
  // const params = useParams()
  // const classes = useStyles()

  // console.log(location.pathname === '/users/')
  // console.log(history.location)

  function addUserGame(game) {
    const defaultImg = "https://wallpapercave.com/wp/wp2623648.jpg"
    console.log(game)
    const newUserGameObj = {
      user_id: currentUser.id,
      game_id: parseInt(game.id),
      details: "",
      platform: "",
      level: "",
      server: "",
      image: defaultImg
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
      if (newObj.id === null) {
        alert("Already added game")
      }
    })
  }

  function handleSignUp(user) {
    console.log(user)
    setCurrentUser(user)
    history.push("/games")
  }

  function handleLogin(user) {
    console.log(user)
    setCurrentUser(user)
    history.push(`/games/${games[0].id}`)
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
        setIsLoaded(true)

      })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users`)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        setUsers(data)
      })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games`)
      .then(resp => resp.json())
      .then(data => {
        setUserGames(data)
      })
  }, [])


  console.log(currentUser)
  // console.log(localStorage.getItem("token"))
  // if (!isLoaded) return <h1>Loading</h1>
  if (!isLoaded) return (
    <Box position="relative" display="inline-flex" justifyContent="center" alignItems="center">
      <CircularProgress color="secondary" />
    </Box>
  ) 
  return (
    <Grid className="app" container direction="column">
      <Grid item>
        <Route>
          <Nav currentUser={currentUser} handleLogout={handleLogout} games={games} users={users}/>
        </Route>
      </Grid>
      
      <Switch>
        <Grid item container>
          {/* <Grid item xs={false} sm={1} /> */}
          
          <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={10}>
                <Route exact path="/users/:id">
                  <UserShow setReviewee={setReviewee} currentUser={currentUser} setSessionId={setSessionId} setCurrentUser={setCurrentUser}/> 
                </Route>
                <Route exact path="/games">
                  <AddGame games={games} newUserGame={addUserGame} userGames={userGames} currentUser={currentUser}/>
                </Route>        
                <Route exact path="/reviews/new">
                  <ReviewForm currentUser={currentUser} reviewee={reviewee} sessionId={sessionId}/>
                </Route>
              </Grid>
            <Grid item xs={false} sm={1} />

            <Grid item xs={12} sm={12}>
              <Route exact path="/user_games/:id">
                <UserGameDetail currentUser={currentUser} games={games}/>
              </Route>
              <Route exact path="/games/:id">
                  <GamePage games={games}/>
              </Route>
            </Grid>
          {/* <Grid item xs={false} sm={1} /> */}
          <Route exact path="/">
              <Login setCurrentUser={setCurrentUser} firstGame={games[0]} handleLogin={handleLogin}/>
          </Route>
          <Route exact path="/signup">
              <SignUp setCurrentUser={setCurrentUser} firstGame={games[0]} handleSignUp={handleSignUp}/>
          </Route>
        </Grid>

      </Switch>
    </Grid>
  );
}

export default App;
