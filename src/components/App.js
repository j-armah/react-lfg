import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Nav from './Nav'
import UserShow from './UserShow'
import GamePage from './GamePage'
import Login from './Login'
import AddGame from './AddGame'
import UserGameDetail from './UserGameDetail'
import SignUp from './SignUp'
import Dashboard from './Dashboard'
import ReviewForm from './ReviewForm'
import { Grid, Box } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import InboxComponent from './InboxComponent'
import Inbox from './Inbox'
import Fab from '@material-ui/core/Fab';
import CommentIcon from '@material-ui/icons/Comment';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Popover from '@material-ui/core/Popover';


const useStyles = makeStyles((theme) => ({
  // load: {
  //   display: 'flex',
  //   '& > * + *': {
  //     marginLeft: theme.spacing(2),
  //   },
  // },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    background: 'linear-gradient(45deg, #2b5876 0%, #4e4376  51%, #2b5876  100%)',
    backgroundSize: '200% auto',
    border: 0,
    marginRight: theme.spacing(1),
    transition: '0.8s',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    color: 'white',
    // height: 63.9,
    // padding: '0 0px',
    '&:hover': {
        transform: 'scale(1.1)',
        backgroundPosition: 'right center',
    },
    borderRadius: 50,
  },
  root: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(3),
  },
  chatBox: {
    width: '1310px',
    height: '600px',
    overflow: 'hidden',
    color: "",
  },
  load: {
    height: "100vh",
    width: "100%"
  },
  loadBox: {
    width: "100%"
  }
}));

 
function App() {
  const [users, setUsers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [games, setGames] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [userGames, setUserGames] = useState([])
  const [reviewee, setReviewee] = useState(null)
  const [sessionId, setSessionId] = useState(null)
  const [otherUser, setOtherUser] = useState(null)
  const [lastGame, setLastGame] = useState(null)
  const [anchorElChat, setAnchorElChat] = useState(null)
  

  const history = useHistory()
  const location = useLocation()
  // const params = useParams()
  const classes = useStyles()

  // console.log(location.pathname.split('/games/'))

  useEffect(() => {
    if (location.pathname.includes('/games/')) {
      setLastGame(location.pathname)
      // console.log(lastGame)
    }
  }, [location.pathname])
  

  const handleClickChat = (event) => {
    setAnchorElChat(event.currentTarget);
  };

  const handleStartChat = (fab) => {
    setAnchorElChat(fab);
  };

  const handleCloseChat = () => {
    setAnchorElChat(null);
  };

  const open = Boolean(anchorElChat);
  const id = open ? 'chat' : undefined;

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
  };

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
    setUsers([...users, user])
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
          setCurrentUser(user);
          setIsLoaded(true)
        });
    } else {
      setIsLoaded(true)
    }
    
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/games`)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        setGames(data)
        // setIsLoaded(true)

      })
  }, [])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users`)
      .then(resp => resp.json())
      .then(data => {
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


  // console.log(currentUser)

  // if (!isLoaded) return <h1>Loading</h1>
  if (!isLoaded) return (
    <Grid container className={classes.load}>
      <Box display="flex" justifyContent="center" alignItems="center" className={classes.loadBox}>
        <CircularProgress color="secondary" />
      </Box>
    </Grid>
    
  ) 
  return (
    <>
    <Grid className="app" container direction="column">

      <Grid item>
        <Route>
          <Nav currentUser={currentUser} handleLogout={handleLogout} games={games} users={users} lastGame={lastGame} game={games[0]}/>
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
                <UserGameDetail currentUser={currentUser} games={games} handleStartChat={handleStartChat} setOtherUser={setOtherUser}/>
              </Route>
              <Route exact path="/games/:id">
                  <GamePage games={games}/>
              </Route>
              <Route exact path="/inbox">
                <Inbox user={currentUser} otherUser={otherUser}/>
              </Route>
              <Route exact path="/dashboard">
                <Dashboard currentUser={currentUser}/>
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

    {location.pathname === '/' || location.pathname === '/signup'? null :
    <div>
      {!currentUser ? null : 
      <Fab color="primary" className={classes.fab} onClick={handleClickChat}>
        <CommentIcon />
      </Fab>}
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          <Fab id="fab" onClick={handleClick} color="secondary" size="small" >
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      </Zoom>
      </div>}

      <Popover
        id={id}
        open={open}
        anchorEl={anchorElChat}
        onClose={handleCloseChat}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box 
          p={1} 
          bgcolor="transparent" 
          mx="auto" 
          justifyContent="center" 
          alignItems="center" 
          className={classes.chatBox}
        >
          <InboxComponent user={currentUser} otherUser={otherUser}/>
        </Box>
      </Popover>
    </>
  );
}



export default App;
