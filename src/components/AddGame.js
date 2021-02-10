import React, { useState } from 'react'
import GameCard from './GameCard'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

function AddGame({ games, newUserGame, currentUser }) {
    const [search, setSearch] =  useState("")

    const sortedGames = games.sort((gameA, gameB) => {
        if (gameA.user_games.length > gameB.user_games.length) {
            return -1
        }
        if (gameA.user_games.length < gameB.user_games.length) {
            return 1
        } 
        return 0
    }).filter(game => game.name.toLowerCase().includes(search.toLowerCase()))
    
     const gameArray = sortedGames.map(game => 
        <GameCard key={game.id} game={game} newUserGame={newUserGame} currentUser={currentUser}/>    
    )
    
    return (
        <div>
            <Typography variant={"h2"}>All Games</Typography>
            <TextField
                id="game-search"
                style={{ margin: 8 }}
                placeholder="Search Games..."
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Grid container item spacing={2} xs={"auto"} className="games-container">
                    {gameArray}
            </Grid>

        </div>
    )
}

export default AddGame
