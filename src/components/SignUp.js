import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { Button } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to={"/"}>
        LFG
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/images/wanella.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  load: {
    height: "100vh",
    width: "100%"
  },
    loadBox: {
    width: "100%"
  }
}))

function SignUp({ firstGame, handleSignUp }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [discord, setDiscord] = useState("")
    const [errors, setErrors] = useState("")
    const classes = useStyles()
    const defaultImg = "https://i.pinimg.com/originals/b1/92/4d/b1924dce177345b5485bb5490ab3441f.jpg"

    function handleSubmit(e) {
        e.preventDefault();
        const formData = { 
            avatar: defaultImg, 
            name: "",
            bio: "",
            lfg: true,
            username, 
            password, 
            discord 
        }
        //console.log(formData)
    
        fetch(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((r) => r.json())
          .then((data) => {
            // then set that user in state in our App component
            console.log(data.user)
            if (data.user) {
                handleSignUp(data.user)
                localStorage.setItem("token", data.token)
            } else {
                console.log(data)
                setErrors(data.error)
              // alert('Incorret username or password')
            }
          });
    }

    if (!firstGame) return (
      <Grid container className={classes.load}>
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.loadBox}>
          <CircularProgress color="secondary" />
        </Box>
    </Grid>
    )
    return (
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img height="80px" src='https://i.imgur.com/NoEHEH8.png' alt="lfg-logo"/>

          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              // autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="discord"
              label="Discord"
              type="discord"
              id="discord"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
            />
            <div className="errors">{errors}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={`/games/${firstGame.id}`} variant="body2">
                  Continue as Guest
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/"} variant="body2">
                  {"Have an account already? Sign in"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    )
}

export default SignUp
