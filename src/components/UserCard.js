import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import { makeStyles } from '@material-ui/styles'
import {Typography, Grid} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

function UserCard({ user, userGameId }) {
    const {avatar, username} = user
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
                    <Typography component={"span"}> {username} </Typography> 
                </CardContent>
            </Card>
        </Grid>
    )    
}

export default UserCard
