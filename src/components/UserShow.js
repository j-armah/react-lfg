import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditUserInfo from './EditUserInfo'
import ReviewForm from './ReviewForm'
import GameCard from './GameCard'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Box, Card } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

function UserShow({ currentUser }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [user, setUser] = useState(null)
    const [playSessions, setPlaySessions] = useState([])

    const params = useParams()
    const classes = useStyles()


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

    if (!isLoaded) return <h2>Loading...</h2>
    
    return (
        <Grid container spacing={2} className="user-show">
            <Grid container item xs={6}  className="user-info" component={"div"}>
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
                            <Typography>{user.username}</Typography>
                            <Typography>{user.bio}</Typography>
                            {!currentUser ? 
                            null
                            : currentUser.id !== parseInt(params.id) ? null : 
                            <Typography>{user.discord}</Typography>}
                        </CardContent>
                    </Card>
                    <Grid item xs={12} className="user-show-reviews">
                        <Typography variant={"h4"} paragraph>Reviews</Typography>
                        {user.reviews_as_reviewee.map(review => {
                            return <Paper key={review.id}>
                                <Box p={2} m={1}>
                                    <Typography paragraph>{review.rating} | {review.reviewer.username}</Typography>
                                    <Typography paragraph>{review.contents}</Typography>
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
                        {user.games.map(game => <GameCard key={game.id} game={game}/>)}
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
                                            {session.game.name} with {session.receiver.username} - Pending
                                        </Typography>
                                        <Typography variant={"subtitle2"}>
                                            {session.time}
                                        </Typography>
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
                                            {session.sender.username} requested to play {session.game.name}
                                        </Typography>
                                        <Typography paragraph variant={"subtitle2"}>
                                            {session.time}
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
                                                    {session.receiver.username} accepted your request to play{session.game.name} 
                                                </Typography>
                                                <Typography>
                                                    {session.time}
                                                </Typography>
                                                    
                                                <Typography>  
                                                    Add on discord to start playing! - {session.receiver.discord}
                                                </Typography>
                                                
                                                <div className="reviewer-div">
                                                    <ReviewForm currentUser={currentUser} user={session.receiver}/>
                                                </div>
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
                                                You accepted to play {session.game.name} - with {session.sender.username} at {session.time}
                                                Add on discord to start playing! - {session.sender.discord}
                                            </Typography>
                                            <div className="reviewer-div">
                                                <ReviewForm currentUser={currentUser} user={session.sender}/>
                                            </div>
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
                                                {session.receiver.username} rejected your request to play {session.game.name}
                                            </Typography>
                                            <Typography variant={"subtitle2"}>
                                                {session.time}
                                            </Typography>
                                        </Box>
                                    </Paper>
                                })
                                }
                            </div>
                        </div>
                    </Grid>}
                </Grid>
            </Grid>
                        
            {!currentUser ? 
                null
                : currentUser.id !== parseInt(params.id) ? null :
                <div className="edit-user-info">
                    <EditUserInfo user={currentUser} setUser={setUser}/>
            </div>}
            

        </Grid>
    )
}

export default UserShow
