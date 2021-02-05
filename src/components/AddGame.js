import React from 'react'
import GameCard from './GameCard'
import { Grid } from '@material-ui/core'

function AddGame({ games, newUserGame }) {

    const gameArray = games.map(game => 
        <GameCard key={game.id} game={game} newUserGame={newUserGame}/>    
    )
    return (
        <Grid container spacing={2} className="games-container">
                {gameArray}
        </Grid>
    )
}

export default AddGame
