import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles'
import {Typography, Button, Grid} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

function UserCard({ user, userGameId }) {
    const {id, avatar, username, name} = user
    return (
        <Grid item xs={3}>
            <Card className="card">
                <CardActionArea>
                    <Link to={`/user_games/${userGameId}`}>
                        <CardMedia 
                            
                            component={"img"} 
                            style={{ height: "200px" }} 
                            width="100%" image={avatar} 
                            title={username}>
                               
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
