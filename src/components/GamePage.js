import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserCard from './UserCard'
import GameCard from './GameCard'
import { Grid, Typography, Box, Button } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Popover from '@material-ui/core/Popover';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    gamePage: {
        position: 'relative',
    },
    gameBanner: {
        // position: 'absolute',
        height: "40vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: '0 20%',
        zIndex: 0
    },
    users: {
        // position: 'absolute',
        marginTop: -140,
    },
    bannerGrid: {
        height: "100%"
    },
    box: {
        height: "60%",
        // position: "fixed",
        // marginLeft: "calc(100% - 1600px)",
        // right: "20%",
        // marginLeft: "100px",
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    gameRec: {
        height: "600px",
        width: "1500px",
        // overflow: "auto",
    },
    bannerBtn: {
        background: 'linear-gradient(45deg, #2b5876 0%, #4e4376  51%, #2b5876  100%)',
        backgroundSize: '200% auto',
        border: 0,
        marginRight: theme.spacing(1),
        transition: '0.8s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        color: 'white',
        height: 63.9,
        // padding: '0 0px',
        '&:hover': {
            transform: 'scale(1.1)',
            backgroundPosition: 'right center',
        },
        borderRadius: 50,
    },
    load: {
        height: "100vh",
        width: "100%"
    },
        loadBox: {
        width: "100%"
    }
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(2),
      },
    },
    input: {
      borderRadius: 26,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      opacity: 0.6,
    //   border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
  }))(InputBase);

function GamePage({ games }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [game, setGame] = useState(null)
    const [userGames, setUserGames] = useState([])
    const [sort, setSort] = useState("recommended")
    const [anchorEl, setAnchorEl] = useState(null)
    const params = useParams()
    const classes = useStyles()

    let sortedUserGames = [...userGames]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event) => {
        setSort(event.target.value)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/games/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                setGame(data)
                setIsLoaded(true)
            })
    }, [params.id])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games/`)
            .then(resp => resp.json())
            .then(data => {
                const filteredUserGames = data.filter(ug => ug.game_id === parseInt(params.id)).filter(ug => ug.user.lfg === true)
                setUserGames(filteredUserGames)
            })
    }, [params.id])

    if (sort !== "general") {
        if (sort === "recommended") {
            let userGamesCopy = [...userGames]
            sortedUserGames = userGamesCopy.sort((ugA, ugB) => {
                return ugB.user.recommends - ugA.user.recommends
            })

            console.log(sortedUserGames)
        }
        if (sort === "rating") {
            let userGamesCopy = [...userGames]
            sortedUserGames = userGamesCopy.sort((ugA, ugB) => {
                return ugB.user.avg - ugA.user.avg
            })

            console.log(sortedUserGames)
        }
    }


    if (!isLoaded) return (
        <Grid container className={classes.load}>
            <Box display="flex" justifyContent="center" alignItems="center" className={classes.loadBox}>
                <CircularProgress color="secondary" />
            </Box>
        </Grid>
    )
    return (

        <Grid container item className={classes.gamePage} xs={"auto"}>
            <Grid 
                item xs={12} 
                className={classes.gameBanner} 
                component={"div"}
                style={{
                    backgroundImage: 
                    `linear-gradient(
                        rgba(38, 38, 38, 0.35),
                        rgba(38, 38, 38, 0.35),
                        rgba(38, 38, 38, 0.45),
                        rgba(38, 38, 38, 0.55), 
                        rgba(38, 38, 38, 0.75),
                        rgba(38, 38, 38, 0.85),
                        rgba(38, 38, 38, 0.95),   
                        rgba(38, 38, 38, 1)
                    ),
                    url("${game.splash}")`,
                }}
            >
                <Grid container className={classes.bannerGrid}>
                    <Grid item xs={false} sm={1} />
                        <Grid item xs={10} className={classes.bannerGrid}>
                            <Box 
                                className={classes.box}
                                display="flex"
                                alignItems="center"
                            >
                                <Button
                                aria-describedby={id}
                                onClick={handleClick}
                                className={classes.bannerBtn}
                                >
                                    <SportsEsportsIcon />
                                </Button>
                                <Typography variant={"h3"}> {game.name} </Typography>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                >
                                    <Box p={6} mx="auto" justifyContent="center" alignItems="center" className={classes.gameRec}>
                                        {/* <Paper className={classes.gameRec}> */}
                                        <Typography variant={"h3"} paragraph> Recommended Games </Typography>
                                            <Grid container spacing={4}>
                                                {games.slice(0,9).map(game => <GameCard key={game.id} game={game} handleClose={handleClose}/> )} 
                                            </Grid>
                                        {/* </Paper> */}
                                    </Box>
                                </Popover>
                            </Box>
                        </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>
                
            </Grid>
            <Grid item xs={false} sm={1} />
                <Grid container item xs={10} className={classes.users}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" mr={3} mb={1}>
                        <FormControl className={classes.margin}>
                            <InputLabel id="sort-users">Sort</InputLabel>
                            <Select
                            labelId="sort-users"
                            id="sort-select"
                            value={sort}
                            onChange={handleChange}
                            input={<BootstrapInput />}
                            >
                            <MenuItem value={"recommended"}>Recommended</MenuItem>
                            <MenuItem value={"rating"}>Rating</MenuItem>
                            <MenuItem value={"general"}>General</MenuItem>
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid container item xs={12} container spacing={3} >
                        
                        {sortedUserGames.map(userGame => 
                            <UserCard key={userGame.id} user={userGame.user} userGameId={userGame.id} userGame={userGame}/>    
                        )}
                    </Grid>
                </Grid>
            <Grid item xs={false} sm={1} />
            
        </Grid>
    )
}

export default GamePage
