import React from 'react'
import GameCard from './GameCard'

function AddGame({ games, newUserGame }) {

    const gameArray = games.map(game => 
        <GameCard key={game.id} game={game} newUserGame={newUserGame}/>    
    )
    return (
        <div className="games-container">
            {gameArray}
        </div>
    )
}

export default AddGame
