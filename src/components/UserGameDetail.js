import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
// import Modal from 'react-modal';
import PlaySessionForm from './PlaySessionForm';
import EditUserGameDetail from './EditUserGameDetail';
import GameCard from './GameCard'
import { Grid, Typography, Button, Box, Divider, Card } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Popover from '@material-ui/core/Popover';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 10,
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(1),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%"
    },
    content: {
        // flex: '1 0 auto',
        width: "100%",
        paddingLeft: "0px"
    },
    rootCard: {
        display: 'flex',
        borderRadius: 10,
    },
    cover: {
        width: 150,
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    box: {
        height: "100%",
        width: "100%"
    },
    userGamePage: {
        position: 'relative',
    },
    gameBanner: {
        height: "40vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: '0 20%',
        zIndex: 0
    },
    userGameDetail: {
        // position: 'absolute',
        marginTop: -130,
        zIndex: 1,
        height: "60%"
    },
    bannerGrid: {
        height: "100%"
    },
    boxBanner: {
        height: "60%",
        positin: "fixed",
        // marginLeft: "calc(100% - 1600px)",
        // right: "20%",
        // marginLeft: "100px",
    },
    popover: {
        pointerEvents: 'none',
    },
    gameRec: {
        height: "600px",
        width: "1500px",
        // overflow: "auto",
    },
    image: {
        borderRadius: 10,
    }
}));

function UserGameDetail({ currentUser, games }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [userGame, setUserGame] = useState(null)
    const [user, setUser] = useState(null)
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    // const [modalIsOpen, setIsOpen] = React.useState(false);
    //var subtitle;
    const params = useParams()
    const classes = useStyles()
    const history = useHistory()

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const openPop = Boolean(anchorEl);
    const id = openPop ? 'simple-popover' : undefined;

    function handleDelete() {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games/${params.id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json)
        .then(history.push(`/users/${user.id}`))
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/user_games/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                setUserGame(data)
                //setUser(data.user)
                
                fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${data.user.id}`)
                    .then(resp => resp.json())
                    .then(userr => {
                        console.log(userr)
                        setUser(userr)
                        
                        setIsLoaded(true)
                    })
            })
    }, [params.id])


    if (!isLoaded) return <h2>Loading...</h2>
    return (
        <Grid container spacing={4} className={classes.userGamePage} component={"div"}>
            <Grid 
                item xs={12} 
                className={classes.gameBanner} 
                component={"div"}
                style={{
                    backgroundImage: 
                    `linear-gradient(
                        rgba(38, 38, 38, 0.45),
                        rgba(38, 38, 38, 0.55), 
                        rgba(38, 38, 38, 0.75),
                        rgba(38, 38, 38, 0.85),
                        rgba(38, 38, 38, 0.95),   
                        rgba(38, 38, 38, 1)
                    ),
                    url("${userGame.game.splash}")`,
                }}
            >
                <Grid container className={classes.bannerGrid}>
                    <Grid item xs={false} sm={1} />
                        <Grid item xs={10} className={classes.bannerGrid}>
                            <Box 
                                className={classes.boxBanner}
                                display="flex"
                                alignItems="center"
                            >
                                <Button
                                    aria-describedby={id}
                                    onClick={handleClick}
                                    ><SportsEsportsIcon />
                                </Button>
                                <Typography variant={"h3"}> {userGame.game.name} </Typography>
                                <Popover
                                    id={id}
                                    open={openPop}
                                    anchorEl={anchorEl}
                                    onClose={handleClosePopover}
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
                                                {games.slice(0,9).map(game => <GameCard key={game.id} game={game}/> )} 
                                            </Grid>
                                        {/* </Paper> */}
                                    </Box>
                                </Popover>
                            </Box>
                        </Grid>
                    <Grid item xs={false} sm={1} />
                </Grid>
            </Grid>
            {/* SideBar */}
            <Grid item xs={false} sm={1} />
            <Grid item xs={7} container spacing={2} className={classes.userGameDetail}>
                <Grid item xs={12} >
                    <div className="user-game-img-div">
                        <img height="100%" width="100%" className={classes.image} src={userGame.image} alt="placeholder" />
                    </div>
                </Grid>
                <Grid item xs={12} className="user-game-detail" component={"div"}>
                    <Typography paragraph variant={"h4"}> Details </Typography>
                    <Paper >
                        <Box p={2} m={1} className={classes.image}>
                            <Typography className={classes.section2}> Level: {userGame.level} </Typography>
                            <Typography className={classes.section2}> Platform: {userGame.platform} </Typography>
                            <Typography className={classes.section2}> Server: {userGame.server} </Typography>
                            <Divider variant="middle"/>
                            <Typography paragraph className={classes.section2} > {userGame.details} </Typography>
                        </Box>
                    </Paper>
                </Grid>
                
                <Grid item xs={12} className="user-reviews" component={"div"}>
                    <Grid container className="review-head" justify="space-between">
                        <Typography variant={"h4"}>
                            Comments <Typography display="inline" color="textSecondary">({user.reviews_as_reviewee.length})</Typography>
                        </Typography>
                        <Typography variant={"h6"}>
                            {user.avg} Score
                            {/* {user.reviews_as_reviewee.length === 0 ? "0" :
                                
                                (user.reviews_as_reviewee.map(review => review.rating)
                                .reduce((a, b) => a + b, 0) / user.reviews_as_reviewee.length).toFixed(2)
                            } Score */}
                        </Typography>
                    </Grid>
                    {user.reviews_as_reviewee.map(review => {
                        return (
                            <Box mt={2} key={review.id} >
                                <Card className={classes.rootCard} >
                                    <CardMedia
                                        className={classes.cover}
                                    >
                                        <Box display="flex" alignItems="center" justifyContent="center" className={classes.box}>
                                            <Avatar src={review.reviewer.avatar} className={classes.large}/>
                                        </Box>     
                                    </CardMedia>
                                    <div className={classes.details}>
                                        <CardContent className={classes.content}>
                                            <Typography className={classes.section2} variant={"h6"}>
                                                {review.reviewer.username}
                                            </Typography>
                                            <Rating className={classes.section2} name="read-only" precision={0.5} value={review.rating} size="small" readOnly />
                                            <Divider variant="middle"/>
                                            <Typography paragraph className={classes.section2}>{review.contents}</Typography>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Box>
                        )
                    })}
                </Grid>
            </Grid>
            <Grid item xs={3} component={"div"} className={classes.userGameDetail}>
                    <img height="100%" width="100%" className={classes.image} src={user.avatar} alt={user.username}/>
                     
                        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
                            <Typography paragraph variant={"h3"}>{user.username}</Typography>
                        </Link>

                    {!currentUser ? 
                    null  
                    : currentUser.id === userGame.user.id ? 
                    <div>
                        <Button onClick={handleDelete} className={classes.section2} color="secondary" variant="contained"> Remove this game</Button>
                        <EditUserGameDetail userGame={userGame} setUserGame={setUserGame}/>
                    </div>
                    :
                    <div className="modal-button">
                        {/* Needs to be logged in to open this modal , or needs to open login modal if clicked on */}
                        <Button color="secondary" variant="contained" type="button" size="small" onClick={handleOpen}>
                            Let's Game
                        </Button>
                    </div>}
            </Grid>
            {/* SideBar */}
            <Grid item xs={false} sm={1} /> {}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <PlaySessionForm currentUser={currentUser} userGame={userGame} setOpen={setOpen}/>
                </div>
                </Fade>
            </Modal>
            
        </Grid>
    )
}

export default UserGameDetail
