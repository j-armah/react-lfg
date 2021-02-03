import React from 'react'
import GameCard from './GameCard'

function AddGame({ games }) {

    const gameArray = games.map(game => 
        <GameCard key={game.id} game={game}/>    
    )
    return (
        <div className="games-container">
            {gameArray}
        </div>
    )
}

export default AddGame
