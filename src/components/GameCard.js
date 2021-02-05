import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles'
import {Typography, Button, Grid} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

function GameCard({ game, newUserGame }) {
    const {id, name, genre, image} =  game

    function handleClick() {
        newUserGame(game)
    }

    return (
        <Grid item xs={3}>
            <Card className="card">
            <CardActionArea>
                <Link to={`/games/${id}`}>
                    <CardMedia style={{height: "200px"}} image={image} title={name}>
                        <Button onClick={handleClick} className="add-game-btn"> Add Game </Button>
                    </CardMedia>
                </Link>
            </CardActionArea>
            </Card>
        </Grid>
    )
}

export default GameCard
