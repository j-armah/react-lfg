import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import EditUserInfo from './EditUserInfo'
import ReviewForm from './ReviewForm'
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
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { format } from 'date-fns'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



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
    userGamesPlayed: {
        // margin: "0px"
    },
    gameCards: {
        margin: "10px",
        // height: "100%",
        overflow: "auto",
    },
    // otherGames: {
    //     height: "20vh",
    // },
    card: {
        width: "70%",
        height: "100%"
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
    root: {
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
    userShow: {
        marginTop: 10,
    },
    border: {
        borderRadius: 10,
        marginTop: theme.spacing(2)
    },
    chip: {
        margin: theme.spacing(0.5),
    },
  }));
//   , setReviewee 
function UserShow({ currentUser, setSessionId, setCurrentUser}) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState(null)
    const [playSessions, setPlaySessions] = useState([])
    const [open, setOpen] = useState(false)
    const [openReview, setOpenReview] = useState(false)
    const [showMore, setShowMore] = useState(3)
    const [moreGame, setMoreGame] = useState(9)
    const [tab, setTab] = useState(0)
    const [session, setSession] = useState(null)
    const [reviewee, setReviewee] = useState(null)
    // const [reviews, setReviews] = useState([])
    // const [lfg, setLfg] = useState(currentUser)


    const params = useParams()
    const classes = useStyles()
    const history = useHistory()

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenReview = () => {
        setOpenReview(true);
    };
    
    const handleCloseReview = () => {
        setOpenReview(false);
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
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

    function handleReview(reviewee, session) {
        setReviewee(reviewee)
        // setSessionId(id)
        setSession(session)
        handleOpenReview()

        // history.push("/reviews/new")
    }

    const updateSession = (newSession, review) => {
        const updatedSessions = playSessions.map(session => {
            if (session.id === newSession.id) {
                return {...session, reviews: [...session.reviews, review] }
            } else {
                return session
            }
        })
        setPlaySessions(updatedSessions)
    } 

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${params.id}`)
            .then(resp => resp.json())
            .then(data => {
                // console.log(data)
                setUser(data)
                // setReviews(data.reviews_as_reviewee.reverse())
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
        // const calendar = time.split(/[\D.]/).slice(0, 5)
        // const event = new Date(calendar[0], calendar[1]-1, calendar[2], calendar[3], calendar[4])
        // // Date(year, month, day, hours, minutes, seconds, milliseconds)
        // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
        // // console.log(calendar)
        // // console.log(event.toLocaleDateString(undefined, options))
        // return event.toLocaleDateString(undefined, options)
        const date = new Date(time)
        return format(date, "EEEE, MM/dd/yyyy h:mm aa")
    }

    const handleToggleLfg = () => {
        // console.log(!lfg)
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lfg: !currentUser.lfg
            })
        })
        .then(resp => resp.json())
        .then(updObj => {
            // console.log(updObj)
            // setLfg(updObj.lfg)
            setCurrentUser({
                ...currentUser,
                lfg: updObj.lfg
            })
        })
    }

    const reviewed = (session) => {
        // console.log(session)
        const foundSession = session.reviews.find(review => {
            return review.reviewer.username === currentUser.username
        })
        // console.log(foundSession)
        return foundSession
    }

    const countTags = () => {
        const hash = {}
        const array = []
        const tags = user.reviews_as_reviewee.map(review => review.tags)

        for (const tagArray of tags) {
            for (let j=0; j < tagArray.length; j++) {
                if(hash[tagArray[j].name]){
                    hash[tagArray[j].name] += 1
                } else {
                    hash[tagArray[j].name] = 1
                }
            }
        }


        for(const prop in hash) {
            array.push({[prop]: hash[prop]})
        }

        console.log(hash)
        console.log(array)
        return array
    }


    if (!isLoaded) return <h2>Loading...</h2>
    
    return (
        <Grid container spacing={2} className={classes.userShow}>
            {/* SideBar */}
            {/* <Grid item xs={false} sm={1} /> */}
            <Grid container item xs={6} spacing={2} className="user-info" component={"div"}>
                <Grid item xs={12}>
                    <Grid item xs={12} component={"div"} >
                        <Box display="flex" justifyContent="center">
                        <Card className={classes.card}>
                        
                            <CardMedia
                                component={"div"} 
                                style={{ height: "400px" }} 
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
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={currentUser.lfg}
                                            onChange={handleToggleLfg}
                                            name="lfg"
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        />
                                    }
                                    label="Toggle LFG"
                                />
                                <br/>
                                <Button className={classes.section2} color="secondary" variant="contained" type="button" size="small" onClick={handleOpen}>
                                    Edit Profile
                                </Button>
                                </div>
                                }   
                                <Typography variant={"body2"} className={classes.section2}>{user.name}</Typography>
                                <Typography variant={"body2"} className={classes.section2}>{user.bio}</Typography>
                            </CardContent>
                        </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={12} className="user-show-reviews">
                        <Grid container className="review-head" justify="space-between">
                            <Typography variant={"h4"}>
                                Comments <Typography display="inline" color="textSecondary">({user.reviews_as_reviewee.length})</Typography>
                            </Typography>
                            <Typography variant={"h6"} display="inline">
                                {user.avg} Score
                            </Typography>
                        </Grid>
                        <Box>
                            {countTags().map(tagObj => <Chip color="secondary" clickable size="small"label={`${Object.keys(tagObj)} (${Object.values(tagObj)})`} className={classes.chip}/>)}
                        </Box>
                        {/* <Typography variant={"h4"} paragraph>Reviews</Typography> */}
                        {user.reviews_as_reviewee.slice(0,showMore).map(review => {
                            return (
                                <Box mt={2} key={review.id}>
                                    <Card className={classes.root} >
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
                                                <Typography variant={"subtitle2"} className={classes.section2} color="textSecondary">{review.game}</Typography>
                                                {review.tags.map(tag => <Chip color="secondary" clickable size="small"label={tag.name} className={classes.chip}/>)}
                                            </CardContent>
                                        </div>
                                    </Card>
                                </Box>
                            )
                        })}
                    </Grid>
                    {user.reviews_as_reviewee.length <= 3 ? null :
                    <Grid>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Button size="small" color="secondary" onClick={() => setShowMore(showMore + 3)}> + See More </Button>
                        </Box>
                    </Grid>}
                </Grid>     
            </Grid>
            <Grid container spacing={4} item xs={6} direction="column" className={classes.userGamesPlayed}>
                <Grid item xs={12} height={"10px"} component={"div"} className={classes.otherGames}>
                    <Typography variant={"h4"}>Other Games</Typography>
                    <Grid container item xs={12} spacing={2} className={classes.gameCards} >
                        {user.user_games.slice(0, moreGame).map(userGame => <UserGameCard key={userGame.id} userGame={userGame} />)}
                    </Grid>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        {moreGame < user.user_games.length ? <Button size="small" color="secondary" onClick={() => setMoreGame(moreGame + 9)}> + See More </Button> : <Typography color="secondary">No More Games</Typography>}
                    </Box>
{/* REQUEST AREA */}
                    {!currentUser ? 
                    null
                    : currentUser.id !== parseInt(params.id) ? null : 
                    <Grid item xs={12} className="request-feed">
                        <Typography variant={"h4"} paragraph>Request Feed</Typography>
                        <Tabs value={tab} onChange={handleTabChange} >
                            <Tab label="Sent Request"  />
                            <Tab label="Received Request"  />
                            <Tab label="Accepted Request"  />
                            <Tab label="Rejected Request"  />
                        </Tabs>

                        {tab === 0 ? 
                        <div className="sent-pending">
                        <Typography variant={"h5"} paragraph> Sent </Typography>
                            {playSessions.filter(session => {
                                return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                            }).filter(session => {
                                return session.sender_id === currentUser.id && session.is_accepted === false && session.rejected === false
                            }).map(session => {
                                return <Paper key={session.id} className={classes.border}>
                                    <Box p={2} m={1} >
                                        <Typography variant={"body1"}>
                                            {session.game.name} with <Link to={`/users/${session.receiver.id}`}>{session.receiver.username}</Link> - Pending
                                        </Typography>
                                        <Typography variant={"subtitle2"}>
                                            {session.time === null ? "No Time atm" : handleTime(session.time)}
                                        </Typography>
                                        <Button size="small" variant={"contained"} color="secondary" onClick={() => handleDelete(session.id)} className={classes.margin}> Cancel Request </Button>
                                    </Box>
                                </Paper>
                            })
                            }
                        </div> : null}
                        {tab === 1 ? 
                        <div className="received-pending">
                        <Typography variant={"h5"} paragraph> Received Request</Typography>
                            {playSessions.filter(session => {
                                return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                            }).filter(session => {
                                return session.receiver_id === currentUser.id && session.is_accepted === false && session.rejected === false
                            }).map(session => {
                                return <Paper key={session.id} className={classes.border}>
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
                        </div> : null}
                        
                        {/* <div className="actioned-request-div"> */}
                        {tab === 2 ? 
                        <div className="accepted-sent">
                        <Typography variant={"h5"} paragraph> Accepted Request </Typography>
                            {playSessions.filter(session => {
                                return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                            }).filter(session => {
                                return session.sender_id === currentUser.id && session.is_accepted === true && reviewed(session) === undefined
                            }).map(session => {
                                return <Paper key={session.id} className={classes.border} >
                                        <Box p={2} m={1}>
                                            <Typography variant={"body1"}>
                                                <Link to={`/users/${session.receiver.id}`}>{session.receiver.username}</Link> accepted your request to play {session.game.name} 
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
                                            { reviewed(session) !== undefined ? null : 
                                            // <Button variant="outlined" onClick={() => handleReview()}>Review</Button>
                                            
                                            <Button variant="outlined" onClick={() => handleReview(session.receiver, session)}>Review</Button>
                                            }
                                            {/* <Button size="small" variant={"contained"} color="secondary" onClick={() => handleDelete(session.id)} className={classes.margin}> Remove </Button> */}
                                        </Box>
                                    </Paper>
                                })
                            }
                            {playSessions.filter(session => {
                                return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                            }).filter(session => {
                                return session.receiver_id === currentUser.id && session.is_accepted === true && reviewed(session) === undefined
                            }).map(session => {
                                return <Paper key={session.id} className={classes.border}>
                                        <Box p={2} m={1}>
                                        <Typography>
                                            You accepted to play {session.game.name} - with <Link to={`/users/${session.sender.id}`}>{session.sender.username}</Link> 
                                        </Typography>
                                        <Typography>
                                            {session.time ? handleTime(session.time) : "No Time ATM"}
                                        </Typography>
                                        <Typography >
                                            Add on discord to start playing! - {session.sender.discord}
                                        </Typography>
                                        {/* <div className="reviewer-div">
                                            <ReviewForm currentUser={currentUser} user={session.sender}/>
                                        </div> */}
                                        { reviewed(session) !== undefined ? null :
                                        // <Button variant="outlined" onClick={() => handleOpenReview()}>Review</Button>
                                        <Button variant="outlined" onClick={() => handleReview(session.sender, session)}>Review</Button>
                                        }
                                        {/* <Button size="small" variant={"contained"} color="secondary" onClick={() => handleDelete(session.id)} className={classes.margin}> Remove </Button> */}
                                        </Box>
                                    </Paper>
                                })
                            }
                        </div> : null }
                        
                        {tab === 3 ? 
                        <div className="rejected-req">
                        <Typography variant={"h5"}> Rejected Request </Typography>
                            {playSessions.filter(session => {
                                return session.sender_id === currentUser.id || session.receiver_id === currentUser.id 
                            }).filter(session => {
                                return session.sender_id === currentUser.id && session.rejected === true
                            }).map(session => {
                                return <Paper key={session.id} className={classes.border}>
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
                        </div> : null}
                        {/* </div> */}        
                    </Grid>}
                </Grid>
            </Grid>
            {/* SideBar */}
            {/* <Grid item xs={false} sm={1} />            */}
            {/* {!currentUser ? 
                null
                : currentUser.id !== parseInt(params.id) ? null :
                <div className="edit-user-info">
                    <EditUserInfo user={currentUser} setUser={setUser}/>
            </div>} */}
            <Modal
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
                    <EditUserInfo user={currentUser} setUser={setUser} setOpen={setOpen} setCurrentUser={setCurrentUser}/>
                </div>
                </Fade>
            </Modal>
            <Modal
                className={classes.modal}
                open={openReview}
                onClose={handleCloseReview}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={openReview}>
                    <Box>
                        <ReviewForm currentUser={currentUser} session={session} reviewee={reviewee} handleCloseReview={handleCloseReview} updateSession={updateSession}/>
                    </Box>    
                </Fade>
            </Modal>

        </Grid>
        
    )
}

export default UserShow
