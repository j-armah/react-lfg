import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

function UserGameCard({ userGame }) {
    const { name, image} =  userGame.game
    const location = useLocation()
    // console.log(location.pathname === "/games")
    // console.log(userGame.game)

    return (
        <Grid item xs={4}>
            <Card className="card" component={"div"}>
            <CardActionArea component={"div"}>
                <Link to={`/user_games/${userGame.id}`}>
                    <CardMedia
                        component={"div"}
                        className="game-card-img"
                        style={{height: "180px"}} 
                        // image={image} 
                        title={name}>
                            <img  src={image} alt={name}/>
                    </CardMedia>
                </Link>
            </CardActionArea>
            </Card>
        </Grid>
    )
}

export default UserGameCard