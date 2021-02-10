import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserCard from './UserCard'
import GameCard from './GameCard'
import { Grid, Typography, Box, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Popover from '@material-ui/core/Popover';





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
        positin: "fixed",
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
    }
}));


function GamePage({ games }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [game, setGame] = useState(null)
    const [userGames, setUserGames] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const params = useParams()
    const classes = useStyles()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/games/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                //console.log(data)
                setGame(data)
                setIsLoaded(true)
            })
    }, [params.id])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games/`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                const filteredUserGames = data.filter(ug => ug.game_id === parseInt(params.id)).filter(ug => ug.user.lfg === true)
                setUserGames(filteredUserGames)
                
            })
    }, [params.id])

    console.log(userGames)

    if (!isLoaded) return <h2>Loading...</h2>
    
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
                                            <Grid container xs={12} spacing={4}>
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
                <Grid container item xs={10} container spacing={3} className={classes.users}>
                    
                    {userGames.map(userGame => 
                        <UserCard key={userGame.id} user={userGame.user} userGameId={userGame.id}/>    
                    )}
                </Grid>
            <Grid item xs={false} sm={1} />
            
        </Grid>
    )
}

export default GamePage
