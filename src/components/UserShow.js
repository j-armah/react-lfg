import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import EditUserInfo from './EditUserInfo'
// import ReviewForm from './ReviewForm'
import UserGameCard from './UserGameCard'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Box, Card, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Rating from '@material-ui/lab/Rating';



const useStyles = makeStyles((theme) => ({
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
    section2: {
        margin: theme.spacing(1),
    },
  }));

function UserShow({ currentUser, setReviewee, setSessionId }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState(null)
    const [playSessions, setPlaySessions] = useState([])
    const [open, setOpen] = useState(false)

    const params = useParams()
    const classes = useStyles()
    const history = useHistory()

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    function handleAccept(id) {
        console.log(id)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/play_sessions/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                is_accepted: true
            })
        })
        .then(resp => resp.json())
        .then(updObj => {
            const updatedPSessions = playSessions.map(session => {
                if (session.id === updObj.id) {
                    return {...session, is_accepted: updObj.is_accepted}
                } else {
                    return session
                }
            })
            setPlaySessions(updatedPSessions)
        })
    }

    function handleReject(id) {
        console.log("rejected")
        console.log(id)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/play_sessions/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rejected: true
            })
        })
        .then(resp => resp.json())
        .then(updObj => {
            console.log(updObj)
            const updatedPSessions = playSessions.map(session => {
                if (session.id === updObj.id) {
                    return {...session, rejected: updObj.rejected}
                } else {
                    return session
                }
            })
            setPlaySessions(updatedPSessions)
        })
    }

    function handleDelete(id) {
        console.log(id)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/play_sessions/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(data => {
            const newPlaySessions = playSessions.filter(playSession => {
                return playSession.id !== id
            })
            setPlaySessions(newPlaySessions)
        })
    }

    function handleReview(reviewee, id) {
        setReviewee(reviewee)
        setSessionId(id)
        history.push("/reviews/new")
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setUser(data)
                setIsLoaded(true)
            })
    }, [params.id])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/play_sessions/`)
            .then(resp => resp.json())
            .then(data => {

                // const filteredSessions = data.filter(session => {
                //     return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                
                // })  
                setPlaySessions(data)
                // setIsLoaded(true)
            })
    }, [])

    // console.log(user)
    function handleTime(time) {
        // console.log(time)
        const calendar = time.split(/[\D.]/).slice(0, 5)
        const event = new Date(calendar[0], calendar[1]-1, calendar[2], calendar[3], calendar[4])
        // Date(year, month, day, hours, minutes, seconds, milliseconds)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
        // console.log(calendar)
        // console.log(event.toLocaleDateString(undefined, options))
        return event.toLocaleDateString(undefined, options)

    }

    if (!isLoaded) return <h2>Loading...</h2>
    
    return (
        <Grid container spacing={2} className="user-show">
            <Grid container item xs={6} spacing={2} className="user-info" component={"div"}>
                <Grid item xs={12}>
                    <Grid item xs={12}>
                        <Card>
                            <CardMedia
                                component={"div"} 
                                style={{ height: "400px" }} 
                                // width="100%" image={user.avatar} 
                                title={user.username}
                                className="user-card-img"
                                >
                                    <img src={user.avatar} alt={user.username} />
                            </CardMedia>
                                
                            <CardContent>
                                <Typography variant={"h4"} className={classes.section2}>{user.username}</Typography>
                                <Divider />
                                {!currentUser ? 
                                null
                                : currentUser.id !== parseInt(params.id) ? null : 
                                <div>
                                <Typography variant={"body2"} className={classes.section2}>{user.discord}</Typography>
                                <Typography variant={"body2"} className={classes.section2}>{user.bio}</Typography>
                                <Button className={classes.section2} color="secondary" variant="contained" type="button" size="small" onClick={handleOpen}>
                                    Edit Profile
                                </Button>
                                </div>
                                }   
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} className="user-show-reviews">
                        <Grid container className="review-head" justify="space-between">
                            <Typography variant={"h4"}>
                                Comments <Typography display="inline" color="textSecondary">({user.reviews_as_reviewee.length})</Typography>
                            </Typography>
                            <Typography variant={"h6"} display="inline">

                                {user.reviews_as_reviewee.length === 0 ? "0 Score" :
                                
                                (user.reviews_as_reviewee.map(review => review.rating)
                                .reduce((a, b) => a + b, 0) / user.reviews_as_reviewee.length).toFixed(2)
                                }
                            </Typography>
                        </Grid>
                        {/* <Typography variant={"h4"} paragraph>Reviews</Typography> */}
                        {user.reviews_as_reviewee.map(review => {
                            return <Paper key={review.id}>
                                <Box p={2} m={1}>
                                    <Typography className={classes.section2} variant={"h6"}>{review.reviewer.username}</Typography>
                                    <Rating className={classes.section2} name="read-only" precision={0.5} value={review.rating} size="small" readOnly />
                                    <Divider variant="middle"/>
                                    <Typography paragraph className={classes.section2}>{review.contents}</Typography>
                                </Box>
                            </Paper>
                        })}
                    </Grid>
                {/* <img width="50%" height="300px" className="avatar-pfp" src={user.avatar} alt={user.username}/> */}
                </Grid>     
            </Grid>
            <Grid container spacing={4} item xs={6} direction="column" className="user-games-played">
                <Grid item xs={12} height={"10px"} component={"div"} className="other-games">
                    <Typography variant={"h4"}>Other Games</Typography>
                    <Grid container item xs={12} spacing={2} className="other-game-cards">
                        {user.user_games.map(userGame => <UserGameCard key={userGame.id} userGame={userGame} />)}
                    </Grid>
                    {/* REQUEST AREA */}
                    {!currentUser ? 
                    null
                    : currentUser.id !== parseInt(params.id) ? null : 
                    <Grid item xs={12} className="request-feed">
                        <Typography variant={"h4"} paragraph>Request Feed</Typography>
                        <div className="sent-pending">
                        <Typography variant={"h5"} paragraph> Sent </Typography>
                            {playSessions.filter(session => {
                                return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                            }).filter(session => {
                                return session.sender_id === currentUser.id && session.is_accepted === false && session.rejected === false
                            }).map(session => {
                                return <Paper key={session.id}>
                                    <Box p={2} m={1}>
                                        <Typography variant={"body1"}>
                                            {session.game.name} with <Link to={`/users/${session.receiver.id}`}>{session.receiver.username}</Link> - Pending
                                        </Typography>
                                        <Typography variant={"subtitle2"}>
                                            {handleTime(session.time)}
                                        </Typography>
                                        <Button size="small" variant={"contained"} color="secondary" onClick={() => handleDelete(session.id)} className={classes.margin}> Cancel Request </Button>
                                    </Box>
                                </Paper>
                            })
                            }
                        </div>
                        <div className="received-pending">
                        <Typography variant={"h5"} paragraph> Recieved </Typography>
                            {playSessions.filter(session => {
                                return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                            }).filter(session => {
                                return session.receiver_id === currentUser.id && session.is_accepted === false && session.rejected === false
                            }).map(session => {
                                return <Paper key={session.id}>
                                    <Box p={2} m={1}>
                                        <Typography>
                                        <Link to={`/users/${session.sender.id}`}>{session.sender.username}</Link> requested to play {session.game.name}
                                        </Typography>
                                        <Typography paragraph variant={"subtitle2"}>
                                            {handleTime(session.time)}
                                        </Typography>
                                        <Button size="small" variant={"contained"} color="secondary" onClick={() => handleAccept(session.id)} className={classes.margin}> Accept Request </Button>
                                        <Button size="small" variant={"contained"} color="secondary" onClick={() => handleReject(session.id)} className={classes.margin}> Reject Request </Button>
                                    </Box>
                                </Paper>
                            })
                            }
                        </div>
                        <div className="actioned-request-div">
                        <Typography variant={"h5"} paragraph> Accepted Request </Typography>
                            <div className="accepted-sent">
                                {playSessions.filter(session => {
                                    return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                                }).filter(session => {
                                    return session.sender_id === currentUser.id && session.is_accepted === true
                                }).map(session => {
                                    return <Paper key={session.id}>
                                            <Box p={2} m={1}>
                                                <Typography variant={"body1"}>
                                                    <Link to={`/users/${session.receiver.id}`}>{session.receiver.username}</Link> accepted your request to play{session.game.name} 
                                                </Typography>
                                                <Typography>
                                                    {session.time ? handleTime(session.time) : "No Time ATM"}
                                                </Typography>
                                                    
                                                <Typography>  
                                                    Add on discord to start playing! - {session.receiver.discord}
                                                </Typography>
                                                
                                                {/* <div className="reviewer-div">
                                                    <ReviewForm currentUser={currentUser} user={session.receiver}/>
                                                </div> */}
                                                <Button onClick={() => handleReview(session.receiver, session.id)}>Review</Button>
                                            </Box>
                                        </Paper>
                                    })
                                }
                                {playSessions.filter(session => {
                                    return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                                }).filter(session => {
                                    return session.receiver_id === currentUser.id && session.is_accepted === true
                                }).map(session => {
                                    return <Paper key={session.id}>
                                            <Box p={2} m={1}>
                                            <Typography>
                                                You accepted to play {session.game.name} - with <Link to={`/users/${session.sender.id}`}>{session.sender.username}</Link> at {handleTime(session.time)}
                                                Add on discord to start playing! - {session.sender.discord}
                                            </Typography>
                                            {/* <div className="reviewer-div">
                                                <ReviewForm currentUser={currentUser} user={session.sender}/>
                                            </div> */}
                                            <Button onClick={() => handleReview(session.sender, session.id)}>Review</Button>
                                            </Box>
                                        </Paper>
                                    })
                                }
                            </div>
                            <Typography variant={"h5"}> Rejected Request </Typography>
                            <div className="rejected-req">
                                {playSessions.filter(session => {
                                    return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                                }).filter(session => {
                                    return session.sender_id === currentUser.id && session.rejected === true
                                }).map(session => {
                                    return <Paper key={session.id}>
                                        <Box p={2} m={1}>
                                            <Typography>
                                            <Link to={`/users/${session.receiver.id}`}>{session.receiver.username}</Link> rejected your request to play {session.game.name}
                                            </Typography>
                                            <Typography variant={"subtitle2"}>
                                                {handleTime(session.time)}
                                            </Typography>
                                            <Button size="small" variant={"contained"} color="secondary" onClick={() => handleDelete(session.id)} className={classes.margin}> Delete </Button>
                                        </Box>
                                    </Paper>
                                })
                                }
                            </div>
                        </div>
                    </Grid>}
                </Grid>
            </Grid>
                        
            {/* {!currentUser ? 
                null
                : currentUser.id !== parseInt(params.id) ? null :
                <div className="edit-user-info">
                    <EditUserInfo user={currentUser} setUser={setUser}/>
            </div>} */}
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
                    <EditUserInfo user={currentUser} setUser={setUser}/>
                </div>
                </Fade>
            </Modal>
        </Grid>
        
    )
}

export default UserShow
