import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import { makeStyles } from '@material-ui/styles'
import { Button, Grid} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

function GameCard({ game, newUserGame, currentUser, handleClose }) {
    const {id, name, image} =  game
    const location = useLocation()
    // console.log(location.pathname === "/games")

    // console.log(name)
    
    function handleClick() {
        newUserGame(game)
    }

    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Card className="card" component={"div"}>
            <CardActionArea component={"div"} onClick={handleClose}>

                <Link to={`/games/${id}`}>
                    <CardMedia
                        component={"div"}
                        className="game-card-img"
                        style={{height: "200px"}} 
                        // image={image} 
                        title={name}>
                            <img src={image} alt={name}/>
                            
                    </CardMedia>
                </Link>
                {!currentUser ? null :
                location.pathname !== "/games" ? null :
                    <Button onClick={handleClick}> Add Game </Button>
                }
            </CardActionArea>
            {/* <Button onClick={handleClick} className="add-game-btn"> Add Game </Button> */}
            </Card>
        </Grid>
    )
}

export default GameCard
