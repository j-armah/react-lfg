import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import Modal from 'react-modal';
import PlaySessionForm from './PlaySessionForm';
import EditUserGameDetail from './EditUserGameDetail';
import { Grid, Typography, Button, Box, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Modal.setAppElement('#root')

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
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
}));

function UserGameDetail({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [userGame, setUserGame] = useState(null)
    const [user, setUser] = useState(null)
    const [open, setOpen] = useState(false)
    // const [modalIsOpen, setIsOpen] = React.useState(false);
    //var subtitle;
    const params = useParams()
    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    // function handleClick() {
    //     console.log("clicked")
    // }

    // function openModal() {
    //     setIsOpen(true);
    // }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     // subtitle.style.color = '#f00';
    // }

    // function closeModal(){
    //     setIsOpen(false);
    // }

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
        <Grid container spacing={4} className="user-game-page" component={"div"}>
            <Grid item xs={8} container spacing={2} className="user-game-detail">
                <Grid item xs={12} >
                    <div className="user-game-img-div">
                        <img height="100%" width="100%" className="user-game-img" src={userGame.image} alt="placeholder" />
                    </div>
                </Grid>
                <Grid item xs={12} className="user-game-detail" component={"div"}>
                    <Typography paragraph variant={"h4"}> Details </Typography>
                    <Paper>
                        <Box p={2} m={1} >
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
                            {user.reviews_as_reviewee.length === 0 ? "0" :
                                
                                (user.reviews_as_reviewee.map(review => review.rating)
                                .reduce((a, b) => a + b, 0) / user.reviews_as_reviewee.length).toFixed(2)
                            } Score
                        </Typography>
                    </Grid>
                    {user.reviews_as_reviewee.map(review => {
                        return <Paper key={review.id}>
                            <Box p={2} m={1}>
                                <Typography paragraph className={classes.section2} variant={"h6"}>{review.rating} | {review.reviewer.username}</Typography>
                                <Divider variant="middle"/>
                                <Typography paragraph className={classes.section2}>{review.contents}</Typography>
                            </Box>
                        </Paper>
                    })}
                </Grid>
            </Grid>
            <Grid item xs={4} component={"div"} className="user-detail">
                    <img height="50%" width="100%" src={user.avatar} alt={user.username}/>
                     
                        <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
                            <Typography variant={"h3"}>{user.username}</Typography>
                        </Link>

                    {!currentUser ? 
                    null  
                    : currentUser.id === userGame.user.id ? 
                    <div>
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
                    <PlaySessionForm currentUser={currentUser} userGame={userGame} />
                </div>
                </Fade>
            </Modal>
            
        </Grid>
    )
}

export default UserGameDetail
