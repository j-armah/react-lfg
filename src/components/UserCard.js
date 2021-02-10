import React from 'react'
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

const useStyles = makeStyles((theme) => ({
    star: {
        color: "#ffd939",
        marginRight: theme.spacing(0.2)
    },
    text: {
        marginLeft: theme.spacing(0.2)
    }
  }));

function UserCard({ user, userGameId }) {
    const {avatar, username} = user
    const classes = useStyles()
    return (
        <Grid item xs={3}>
            <Card className="card">
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
                            <Typography variant={"body1"} className={classes.text}> {user.avg} </Typography>
                            <Typography className={classes.text} color="textSecondary">({user.reviews_as_reviewee.length})</Typography>
                        </Box> 
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )    
}

export default UserCard
