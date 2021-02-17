import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import { makeStyles } from '@material-ui/styles'
import { Typography, Grid, Box } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    star: {
        color: "#ffd939",
        marginRight: theme.spacing(0.2)
    },
    text: {
        marginLeft: theme.spacing(0.2)
    },
    load: {
        height: "30vh",
        width: "100%"
    },
    loadBox: {
        width: "100%"
    },
    box: {
        borderRadius: 10,
        height: "102%",
    }
  }));

function UserCard({ user, userGameId, userGame }) {
    const {avatar, username} = user
    const [userGameReviews, setUserGameReviews] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${user.id}`)
            .then(resp => resp.json())
            .then(userObj => {
                const reviews = userObj.reviews_as_reviewee.filter(review => review.game === userGame.game.name)
                setUserGameReviews(reviews)
                setIsLoaded(true)
            })
    }, [])
    

    
    const avgGameScore = () => {
        const avg = userGameReviews.reduce((sum, review) => sum + review.rating, 0) / userGameReviews.length
        return userGameReviews.length > 0 ?  avg.toFixed(1) :  "0"
    }
    
    if (!isLoaded) return (
        <Grid item xs={3}>
            {/* <Card className={classes.load} >
                <Box className={classes.load}>
                    <CircularProgress color="secondary" />
                </Box>   
            </Card> */}
            <Grid item className={classes.load}>
                <Box display="flex" justifyContent="center" alignItems="center" className={classes.loadBox}>
                    <CircularProgress color="secondary" />
                </Box>
            </Grid>
        </Grid>
    )
    return (
        <Grid item xs={3}>
            <Card className={classes.box}>
                <CardActionArea>
                    <Link to={`/user_games/${userGameId}`}>
                        <CardMedia 
                            component={"div"} 
                            style={{ height: "250px" }} 
                            // width="100%" 
                            // image={avatar} 
                            title={username}
                            className="user-card-img"
                        >
                            <img src={avatar} alt={username}/>
                        </CardMedia>
                    </Link>
                </CardActionArea>
                <CardContent>
                    <Box display="flex" >
                        <Box flexGrow={1}>                   
                            <Typography variant={"h5"} > {username} </Typography>
                        </Box> 
                        <Box display="flex" >
                            <StarIcon className={classes.star}/> 
                            <Typography variant={"body1"} className={classes.text}> {avgGameScore()} </Typography>
                            <Typography className={classes.text} color="textSecondary">({userGameReviews.length})</Typography>
                        </Box> 
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )    
}

export default UserCard
