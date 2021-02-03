import React from 'react'

function GameCard({ game }) {
    const {name, genre, image} =  game
    return (
        <div className="card">
            <img className="poster" src={image} alt={name} />
        </div>
    )
}

export default GameCard
